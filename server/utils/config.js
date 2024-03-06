///--------------------------------------------
//Title: config.js
//Author: Kyle Hochdoerfer
//Date: 02/11/24
//Description: Configuration file for BCRS
//---------------------------------------------

//Enable strict mode
"use strict"

//Create a db object with the database's username, password, and name
const db = {
  username: "bcrs_user",
  password: "s3cret",
  name: "bcrsDB"
}

//Create a config object with the port, connecting string, and db name
const config = {
  port: 3000,
  dbUrl: `mongodb+srv://${db.username}:${db.password}@cluster0.tydee4p.mongodb.net/${db.name}?retryWrites=true&w=majority`,
  dbname: db.name
}

//Export the module
module.exports = config;
