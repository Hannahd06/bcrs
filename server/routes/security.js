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

const selectedSecurityQuestionsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      questionText: { type: 'string' },
      answerText: { type: 'string' }
    },
    required: ['questionText', 'answerText'],
    additionalProperties: false
  }
}

const resetPasswordSchema = {
  type: 'object',
  properties: {
    password: { type: 'string' }
  },
  required: ['password'],
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



//verifySecurityQuestions
router.post('/verify/users/:email/security-questions', (req, res, next) => {
  try {
    //gets user email and security questions
    const email = req.params.email
    const { securityQuestions } = req.body
    console.log(`Email: ${email}\nSecurityQuestions: ${securityQuestions}`)

    //validates user's security questions
    const validate = ajv.compile(selectedSecurityQuestionsSchema)
    const valid = validate(securityQuestions)

    //if there's validations errors with security questions
    if (!valid) {
      const err = new Error('Bad Request')
      err.status = 400
      err.errors = validate.errors
      console.log('Security questions validation errors', validate.errors)
      next(err)
      return
    }

    //connect to the database and find a user by email
    mongo (async db => {
      const user = await db.collection('users').findOne({ email: email })

      //404 error if not found
      if (!user) {
        const err = new Error('Not Found')
        err.status = 404
        console.log('User not found', err)
        next(err)
        return
      }

      console.log('Selected User', user)

      if (securityQuestions[0].answer !== user.selectedSecurityQuestions[0].answer ||
        securityQuestions[1].answer !== user.selectedSecurityQuestions[1].answer ||
        securityQuestions[2].answer !== user.selectedSecurityQuestions[2].answer) {
          const err = new Error ('Unauthorized')
          err.status = 401
          err.message = 'Unauthorized: Security questions do not match.'
          console.log('Unauthorized: Security questions do not match, err')
          next(err)
          return
        }
        res.send(user)
    }, next)

  } catch (err) {
    console.log('err', err)
    next(err)
  }

})



//resetPassword
router.delete('/users/:email/reset-password', (req, res, next) => {
  try {
    //gets user and their email
    const email = req.params.email
    const user = req.body
    console.log('Employee email', email)

    //validates user and password
    const validate = ajv.compile(resetPasswordSchema)
    const valid = validate(user)

    if (!valid) {
      const err = new Error('Bad Request')
      err.status = 400
      err.errors = validate.errors
      console.log('password validation errors', validate.errors)
      next(err)
      return
    }

    //connects to the database
    mongo (async db => {

      const trick = await db.collection('users').findOne({ email: email })

      if (!trick) {
        const err = new Error('Not Found')
        err.status = 404
        console.log('User not found', err)
        next(err)
        return
      }

      console.log('Selected User', user)

      const hashedPassword = bcrypt.hashSync(user.password, saltRounds)

      const result = await db.collection('users').updateOne(
        { email: email},
        {
          $set:{ password: hashedPassword }
        }
      )

      console.log('MongoDB update result', result)

      res.status(204).send()

    }, next)

  } catch (err) {
    console.log('err', err)
    next(err)
  }
})

module.exports = router;