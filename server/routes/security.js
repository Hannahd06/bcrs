//--------------------------------------------
//Title: security.js
//Author: Kyle Hochdoerfer
//Date: 02/12/24
//Description: Security routing for BCRS
//---------------------------------------------

//Enable strict mode
"use strict";

//Require statements
const express = require('express');
const router =  express.Router();
const { mongo } = require('../utils/mongo');
const { ObjectId } = require('mongodb');

const Ajv = require('ajv')

const ajv = new Ajv()

const bcrypt = require('bcryptjs');
const saltRounds = 10

const signinSchema = {
  type: 'object',
  properties:{
    email: { type: 'string'},
    password: { type: 'string'}
  },
  required: ["email", "password"],
  additionalProperties: false
}

//signin
router.post('/signin', async(req, res) =>{
  try {
    //Get the signin data from the request
    let signinData = req.body;

    //Determine if the signinData matches the required schema
    const validator = ajv.compile(signinSchema);
    const isValid = validator(signinData);

    //If the provided signinData does not fit the required schema, trigger a 400 Bad Request error
    if(!isValid){
      const err = new Error("Bad Request")
      err.status = 400;
      err.errors = validator.errors;
      console.error("err", err)
      next(err)
      return
    }

    //Connect to the database and find a user with an email matching the user input
    mongo(async db => {
      let user = await db.collection("users").findOne({email: signinData.email});
      console.log(user)

      //If a valid email was found
      if (user) {
        //Determine if the request body password is valid and save the boolean result
        let passwordIsValid = bcrypt.compareSync(signinData.password, user.password);

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
        } else {
            //If the password is invalid, output an error message and send it as a response
            console.log('Invalid email and/or password');
            res.status(404).send({
                'message': `Valid email and/or password not found`
            })
        }
    } else {
        //If the username is invalid, output an error message and send it as a response
        console.log('Invalid email and/or password');
        res.status(404).send({
            'message': `Valid email and/or password not found`
        })
    }
    })

  } catch (err) {
      //If the server encounters an error, output the message and send it as a response
      console.log(err);
      res.status(500).send({
          'message': `Server Exception: ${err}`
      })
  }
})

module.exports = router;