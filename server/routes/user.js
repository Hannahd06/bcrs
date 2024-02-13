"use strict";
const express = require('express');
const router =  express.Router();
const { mongo } = require('../utils/mongo');
const { ObjectId } = require('mongodb');
const Ajv = require('ajv');

const ajv = new Ajv();

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
      //Check if email user inputs is already in database
      const emailUnavailable = await db.collection("users").findOne({ email: user.email });

      //Check if empID user inputs is already in database
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

     // Return the user
      res.json(result);
    }, next);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
})

module.exports = router;
