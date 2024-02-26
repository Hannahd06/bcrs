//--------------------------------------------
//Title: invoices.js
//Author: Jocelyn Dupuis, Kyle Hochdoerfer, and  Hannah Del Real
//Date: 02/26/24
//Description: Invoice routing for BCRS
//---------------------------------------------

//Enable strict mode
"use strict";

//Require statements
const express = require('express');
const router =  express.Router();
const { mongo } = require('../utils/mongo');
const { ObjectId } = require('mongodb');
const Ajv = require('ajv');

//Create a variable for ajv validation
const ajv = new Ajv()

//declares a invoiceSchema for all invoice properties
const invoiceSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    fullName: { type: 'string' },
    lineItems: lineItemsSchema,
    partsAmount: { type: 'number' },
    laborAmount: { type: 'number' },
    lineItemTotal: { type: 'number' },
    invoiceTotal: { type: 'number' }
  }
}

//declares lineItemsSchema for invoice items
const lineItemsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      price: { type: 'number' }
    }
  }
}


//createInvoice
router.post('/', (req, res, next) => {
  try {
    //invoice from request body
    const invoice = req.body;

    const validate = ajv.compile(invoiceSchema);
    const isValid = validate(invoice);

    if (!isValid) {
      //400 message if request isn't valid
      res.status(400).json({
        message: 'Bad Request',
        errors: validate.errors,
      });
      return;
    }

    //connect to database
    mongo(async (db) => {
      const result = await db.collection('invoices').insertOne(invoice);

      //displays 201 message if invoice is created successfully
      res.status(201).json({
        message: 'Invoice created successfully',
      });
    }, next);
    //catch any other error 
  } catch (err) {
    console.log('err', err);
    next(err);
  }
});





module.exports = router;