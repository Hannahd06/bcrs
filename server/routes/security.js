//--------------------------------------------
//Title: security.js
//Author: Kyle Hochdoerfer
//Date: 02/12/24
//Description: Security routing for BCRS
//---------------------------------------------

//Enable strict mode
"use strict";
//
//Require statements
const express = require('express');
const router =  express.Router();
const { mongo } = require('../utils/mongo');
const Ajv = require('ajv');
const { ObjectId } = require('mongodb');
const ajv = new Ajv();
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const signinSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

//signin
router.post('/signin', (req, res, next) => {
  try {
    let signinData = req.body;
    const validator = ajv.compile(signinSchema);
    const isValid = validator(signinData);
    console.log(signinData)

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
        let user = await db.collection("users").findOne({email: signinData.email});
        console.log(signinData.email);

        if(!user) {
          const err = new Error("Unauthorized user");
          err.status = 40;
          console.log("err", err);
          err.message = 'Username and/or password does not match our records'
          next(err);
          return;
        };

        let passwordIsValid = bcrypt.compareSync(signinData.password, user.password);
        if (!passwordIsValid) {
          const err = new Error("Unauthorized user");
          err.status = 401;
          console.log("err", err);
          err.message = 'Username and/or password does not match our records'
          next(err);
          return;
        };

        //If the password is valid
        if (passwordIsValid) {

          // Set time of last login
          const time = new Date();
          await db.collection('users').updateOne(
            { email: signinData.email },
            { $set: { lastSignin: time } }
          );
          user.lastSignin = time;
            //Output a message stating that the user has logged in and send it as a response
            console.log('User logged in at' + time);
            res.send(user);
            return;
          }
        }, (err) => {
          console.error(err);
          err.status = 500;
          next(err);
        }, next);

  } catch (err) {
    //If the server encounters an error, output the message and send it as a response
    console.log(err);
  }
})

module.exports = router;




