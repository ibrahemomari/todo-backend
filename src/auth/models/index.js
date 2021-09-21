"use strict";
require("dotenv").config();
const user = require("./users");
const { Sequelize, DataTypes } = require("sequelize");
const DATABASE_URL = process.env.DATABASE_URL;
const Collection=require('./dataCollection');

let sequelizeOptions = {
      dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          }
        }
  };

const sequelize = new Sequelize(DATABASE_URL,{});

const userModel=user(sequelize,DataTypes);

const userCollection=new Collection(userModel);



module.exports = {
  db: sequelize,
  users:userModel,
  userCollection:userCollection,
};