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


// Update user API
router.put('/users/:userId', (req, res, next) => {
  try {
    let { userId } = req.params; // Destructure 'userId' from request parameters.
    empId = parseInt(userId, 10); // Parse userId to ensure it is an integer
    console.log('userId', userId); // Log userId to the console

    // Check if 'userId' is not a valid number; if not,
    // generate a 400 error response and pass it to the error handler.
    if (isNaN(userId)) {
      const err = new Error('input must be a number');
      err.status = 400;
      console.error('err', err);
      next(err);
      return;
    }

    // Create a validator function based on the defined 'userSchema'.
    const validator = ajv.compile(userSchema);
    // Use the validator to check if the request body adheres to the specified schema.
    const isValid = validator(req.body);

    // Check if the request body is not valid according to the specified schema.
    if (!isValid) {
      const err = new Error('Bad Request');
      err.status = 400;
      err.errors = validator.errors;
      console.error('err', err);
      next(err);
      return; // return to exit the function
    }

    mongo(async db => {
      // Find the user in the database based on 'userId'.
      const user = await db.collection('users').findOne({ userId });
      // if the user is not found, generate a 404 error response.
      if (!user) {
        const err = new Error('Unable to find user with userId ' + userId);
        err.status = 404;
        console.error('err', err);
        next(err);
        return;
      }
      console.log(user);

      console.log("UserId", userId);
      console.log("phonenumber", req.body.phonenumber);
      console.log("address", req.body.address);

      // Update the user in the database.
      const result = await db.collection('user').updateOne(
        { userId },
        { $set: { phonenumber: req.body.phonenumber, address: req.body.address }}
      )

      // If the user was not updated, return a 500 status code.
      if (!result.modifiedCount) {
        const err = new Error('Unable to update user with userId ' + userId);
        err.status = 500;
        console.error('err', err);
        next(err);
        return;
      }

      // Send a success response with a 204 status code.
      res.status(204).send();
    }, next);
  } catch (err) {
    console.log('err', err);
    next(err);
  }
});


module.exports = router;
