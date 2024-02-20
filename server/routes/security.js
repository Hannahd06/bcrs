//--------------------------------------------
//Title: security.js
//Author: Kyle Hochdoerfer, Jocelyn Dupuis, and Hannah Del Real
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
//Declare a securityQuestionSchema containing security questions/answers for registerSchema
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



//Declare a registerSchema containing all user properties
const registerSchema = {
  type: 'object',
  properties: {
    email: { type: 'string'} ,
    password: { type: 'string'},
    firstName: { type: 'string'},
    lastName: { type: 'string'},
    phoneNumber: { type: 'string'},
    address: { type: 'string'},
    selectedSecurityQuestions: selectedSecurityQuestionsSchema,
    isDisabled: {type: 'boolean'},
    role: {type: 'string'},
    empId: {type: 'number'}
  },
  required: [
    'email',
    'password',
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'selectedSecurityQuestions'
  ],
  additionalProperties: false
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


// registerUser
router.post('/register', (req, res, next) => {
  try {
    //grab input from user
    const { user } = req.body;

    // set data validation based on registerSchema
    const validator  = ajv.compile(registerSchema);
    // Validate user input against registerSchema
    const isValid = validator(user);

    // If user input does not pass validation, return 400 Error
    if(!isValid){
      const err = new Error("Bad Request")
      err.status = 400;
      err.errors = validator.errors;
      console.error("err", err)
      next(err)
      return
    }
    // Set password encryption
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
   mongo(async db => {
    // Search for all users in database and sort them in ascending order in an array
    const users = await db.collection('users').find().sort({empId: 1}).toArray();
    console.log('Current users:', users);

    // if email is already in use, return 400 error
    let emailInUse = users.find(employees => employees.email === user.email)
    if (emailInUse) {
      const err = new Error("Bad Request")
      err.status = 400;
      err.message = 'Email is already in use';
      console.error("err", err)
      next(err)
      return
     }
     // Get the user with last empId based on ascending order
     const latestuser = users[users.length - 1];
     // Set the newempId as the latest empId plus 1.
     const newEmpId = latestuser.empId + 1;

     // Create newUser to be added to database
     const newUser = {
      empId: newEmpId,
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      selectedSecurityQuestions: user.selectedSecurityQuestions,
      role: 'standard', // Registered users are defaulted to standard role
      isDisabled: false // Ensures all new registered users are active in database
     }

     console.log(newUser);

     // push newUser object to the users collection
     const result = await db.collection('users').insertOne(newUser);
     //returns _id to the console
     console.log("result", result._id);
     // send the inserted _id
     res.status(201).send({ id: result.insertedId });
   }, next);

  } catch (err) {
    console.error("Error:", err);
    next(err);
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


//verifyUser

router.post('/verify/users/:email', (req, res, next) => {
  try {
    //grab email value from the input value for email  from form.
    const  email  = req.params.email;

   mongo(async db => {
    // Search for all users in database and sort them in ascending order in an array
    const verifiedUser = await db.collection('users').findOne({email: email})
    console.log("Verifying email:", email);

    if (!verifiedUser) {
      const err = new Error("Bad Request")
      err.status = 404;
      err.message = 'There are no users associated with this email. Please try again';
      console.error("err", err)
      next(err)
      return
     }

     console.log(verifiedUser);

     res.status(200).send(verifiedUser);
   }, next);

  } catch (err) {
    console.error("Error:", err);
    next(err);
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
