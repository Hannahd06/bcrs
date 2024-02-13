"use strict";
const express = require('express');
const router =  express.Router();
const { mongo } = require('../utils/mongo');
const { ObjectId } = require('mongodb');
const { stringify } = require('ajv');

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
    // Check if user input matches empId in database
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

module.exports = router;