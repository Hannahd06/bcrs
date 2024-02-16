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

const bcrypt = require('bcryptjs');
const saltRounds = 10

//signin
router.post('/signin', async(req, res) =>{
  try {
    let signinData = req.body;

    //Determine if valid signin data was provided, and if not, output an error and send it as a response
    if(!signinData){
      console.log('Invalid username and/or password');
            res.status(400).send({
                'message': `Bad Request`
            })
    }

    //Connect to the database and find a user with an email matching the user input
    mongo(async db => {
      let user = await db.collection("users").findOne({email: signinData.email});

      //If a valid email was found
      if (user) {


        //Determine if the request body password is valid and save the boolean result
        //let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        //If the password is valid
        if (req.body.password == user.password) {
            //Output a message stating that the user has logged in and send it as a response
            console.log('User logged in');
            res.status(200).send({
                'message': 'User logged in as ' + user.firstName + " " + user.lastName
            })
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