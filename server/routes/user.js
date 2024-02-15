///--------------------------------------------
//Title: config.js
//Author: Kyle Hochdoerfer, Hannah Del Real, Jocelyn Dupuis
//Date: 02/12/24
//Description: User routing for BCRS
//---------------------------------------------

//Enable strict mode
"use strict";

//Require statements
const express = require('express');
const router =  express.Router();
const { mongo } = require('../utils/mongo');
const { ObjectId } = require('mongodb');
const Ajv = require('ajv');

const ajv = new Ajv();

//Declare a userSchema containing all user properties
const userSchema = {
  type: 'object',
  properties: {
    empId: { type: 'number'},
    email: { type: 'string'} ,
    password: { type: 'string'},
    firstName: { type: 'string'},
    lastName: { type: 'string'},
    phoneNumber: { type: 'number'},
    address: { type: 'string'},
    selectedSecurityQuestions: { type: 'array' },
    role: {type: 'string'},
    isDisabled: { type: 'boolean' }
  },
  required: [
    'empId',
    'email',
    'password',
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'role'
  ],
  additionalProperties: false
}

//findAllUsers
router.get("/", (req, res, next) => {
  try {
    // find all users in users collection of database
    mongo(async db => {
      const user = await db.collection("users").find().toArray();

      // If user input does not match database send error message
      if (!user) {
        const err = new Error("No users found");
        err.status = 404;
        console.log("err", err);
        next(err);
        return;
      }
     // If there are users in database, send user documents in json format
      res.json(user);
    }, next);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
})

//findbyId
router.get("/:empId", (req, res, next) => {
  try {
    //Hold the user ID from the request in a variable
    let { empId } = req.params;
    empId = parseInt(empId, 10);

    //If the given ID is not a number, return an error
    if(isNaN(empId)) {
      const err = new Error("User ID must be a number")
      err.status = 400
      console.log("err", err);
      next(err);
      return;
    }

    //Check the database to get the user document with the matching ID
    mongo(async db => {
      const user = await db.collection("users").findOne({empId});

      //If the user is not found, return an error statement saying so
      if (!user){
        const err = new Error("Unable to find user with id " + empId)
        err.status = 404;
        console.log("err", err)
        next(err)
        return;
      }

      //Send the matching user document as a response
      res.send(user)
    });

  } catch (err) {
    //Output an error statement and pass the error to the error handler
    console.error("Error " + err);
    next(err);
  }
})

// createUser
router.post("/", (req, res, next) => {
  try {
    const { user } =  req.body;
    const validator = ajv.compile(userSchema);
    const isValid = validator(user);

    // If the user input does not pass validation, return 400 error
    if (!isValid) {
      const err = new Error('Bad Request');
      err.status = 400;
      err.errors = validator.errors;
      console.log('req.body validation failed', err)
      next(err);
      return;
    }

    mongo(async db => {
      //Check if email user inputs is already in database to ensure that empId is unique
      const emailUnavailable = await db.collection("users").findOne({ email: user.email });

      //Check if empID user inputs is already in database to ensure that email is unique
      const empIdUnavailable = await db.collection("users").findOne({ empId: user.empId });


      // If user input for email is already in database send error message
      if (emailUnavailable) {
        const err = new Error("This email address is already in use");
        err.status = 409;
        console.log("err", err);
        next(err);
        return;
      }

      // If user input for empId is already in database send error message
      if (empIdUnavailable) {
        const err = new Error("This userId address is already in use");
        err.status = 409;
        console.log("err", err);
        next(err);
        return;
      }

      // push new user object to the users collection
      const result = await db.collection('users').insertOne(user);

      console.log("result", result);

     // Return  result insertedID
      res.status(201).send({ id: result.insertedId });
    }, next);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
})


// Update user API by Jocelyn Dupuis
router.put('/:empId', (req, res, next) => {
  try {
    const empId = Number(req.params.empId);
    const user = req.body;

    // validates request
    // generate a 400 error response and pass it to the error handler.
    if (!user || typeof user !== 'object') {
      const err = new Error('Invalid request');
      err.status = 400;
      console.error('err', err);
      next(err);
      return; //return to exit the function
    }

    // Create variable for required input fields
    const fieldsRequired = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'role', 'selectedSecurityQuestions'];
    // Create variable for missing input fields
    const fieldsMissing = requiredFields.filter(field => !user[field]);

    // Check if there are any input fields that are required are left blank
    if (fieldsMissing.length > 0) {
      const err = new Error(`You are missing these required fields: ${fieldsMissing.join(', ')}`);
      err.status = 400;
      console.error('err', err);
      next(err);
      return; // return to exit the function
    }

    mongo(async db => {
      // Update the user in the database.
      const result = await db.collection('users').updateOne({ empId: empId }, { $set: user });

      // If the user was not updated, return a 500 status code.
      if (!result.matchedCount) {
        const err = new Error('Unable to find user with empId ' + empId);
        err.status = 404;
        console.error('err', err);
        next(err);
        return; //return to exit the function
      }

      if (!result.matchedCount === 0) {
        const err = new Error('Failed to update user with empId ' + empId);
        err.status = 500;
        console.error('err', err);
        next(err);
        return; //return to exit the function
      }

      // Send a success response with a 204 status code.
      res.status(204).send();
    }, next);
  } catch (err) {
    console.log('err', err);
    next(err);
  }
});

// Delete / disable user
router.delete('/:empId', (req, res, next) => {
  try {
    // Destructure empId from request parameters
    let { empId } = req.params;
    // Parse 'empId' to ensure it is an integer
    empId = parseInt(empId, 10);

    // If the 'empId' is not a valid number, generate a 400 error response
    // and pass it to the error handler.
    if (isNaN(empId)) {
      const err = new Error('User ID input must be a number');
      err.status = 400;
      console.error('err', err);
      next(err);
      return; //return to exit function
    }

    mongo(async db => {
      // Find the user by empId.
      let user = await db.collection('users').findOne(
        { empId }
      );

      // If the user is not found, generate a 404 error response.
      if (!user) {
        const err = new Error('Unable to find user with empId ' + empId);
        err.status = 404;
        console.err('err', err);
        next(err);
        return; //return to exit function
      }

      // If user is already disabled will send message
      if (user.isDisabled === true) {
        res.send('User is disabled');
        return; //return to exit function
      }

      // Update user document
      // in the MongoDB 'users' collection.
      const result = await db.collection('users').updateOne(
        { empId },
        { $set: { isDisabled: true }}
      );

      // if unable to update user generate error 
      if (result.matchedCount === 0) {
        const err = new Error('Unable to find user with empId ' + empId);
        err.status = 404;
        console.log('err', err)
        next(err);
        return; //return to exit function
      }

      // Send a success response with a 204 status code.
      res.status(204).send('Successfully disabled user with empId ' + empId);
    }, next);
  } catch (err) {
    console.error('err', err);
    next(err);
  }
});


module.exports = router;
