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


//createInvoice
router.post('/', (req, res, next) => {
  try {
    //invoice from request body
    const invoice = req.body;

    //Determine if the invoice data matches the required schema
    const validate = ajv.compile(invoiceSchema);
    const isValid = validate(invoice);

    //if provided invoice data doesn't match the required invoiceSchema
    if (!isValid) {
      //400 message
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

//findPurchasesByService
router.get('/purchases-graph', (req, res, next) => {
  try{
    //Access the database and find an aggregate of invoices based on title and price
    mongo(async (db) => {
      //Create a variable for aggregate search parameters
      const aggregate =
        [
          {
            $unwind: "$lineItems",
          },
          {
            $group: {
              _id: {
                'title': "$lineItems.title",
                'price': "$lineItems.price",
              },
              count: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              "_id.title": 1,
            },
          },
        ]

      //Access the database, and run an aggregate search based on the criteria and save the result as
      const invoices = await db.collection('invoices').aggregate(aggregate).toArray()

      //Determine if invoices could be found and send an error if they aren't
      if(!invoices){
        const err = new Error("Unable to find invoices: bad request")
        err.status = 400;
        console.log("err", err)
        next(err)
        return;
      }

      //Send the search result as a response
      res.status(200).json(invoices);
    });
  } catch {
    //Output an error statement and pass the error to the error handler
    console.error("Error " + err);
    next(err);
  }
})


//getInvoiceById
router.get('/:id/invoice', (req, res, next) => {
  try {
    //invoice from request body
    const id = req.params.id;

    //if id is not found, error message
    if (!id) {
      //400 message
      res.status(400).json({
        message: 'Bad Request',
      });
      return;
    }

    //connect to database
    mongo(async (db) => {
      const invoice = await db.collection('invoices').findOne({id: parseInt(id)});

      if(!invoice) {
        const err = new Error('Could not find an invoice for id:' + id);
        err.status = 404;
        console.log('err', err);
        next(err);
        return;
      }

      //displays 201 message if invoice is found
      res.status(201).json(invoice);
    }, next);
    //catch any other error
  } catch (err) {
    console.log('err', err);
    next(err);
  }
});

module.exports = router;