///--------------------------------------------
//Title: config.js
//Author: Kyle Hochdoerfer
//Date: 02/11/24
//Description: Configuration file for BCRS
//---------------------------------------------

"use strict"

const db = {
  username: "bcrs_user",
  password: "s3cret",
  name: "bcrsDB"
}

const config = {
  port: 3000,
  dbUrl: `mongodb+srv://${db.username}:${db.password}@cluster0.tydee4p.mongodb.net/${db.name}?retryWrites=true&w=majority`,
  dbname: db.name
}

module.exports = config;
