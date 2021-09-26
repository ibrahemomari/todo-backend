

"use strict";
require("dotenv").config();
const user = require("./users");
const { Sequelize, DataTypes } = require("sequelize");
const DATABASE_URL = "postgres://localhost:5432/test45";
const todo=require('./todo');
const Collection=require('./dataCollection');
let sequelizeOptions = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
const sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);

const userModel=user(sequelize,DataTypes);
const todoModel=todo(sequelize,DataTypes);

userModel.hasMany(todoModel, { foreignKey: 'userId', sourceKey: 'id'});
todoModel.belongsTo(userModel, { foreignKey: 'userId', targetKey: 'id'});

const todoCollection=new Collection(todoModel);



module.exports = {
  db: sequelize,
  users:userModel,
  todoCollection:todoCollection,
  todoModel:todoModel
};