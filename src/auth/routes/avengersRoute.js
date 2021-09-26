"use strict";

const express = require("express");
const router = express.Router();
const permissions = require("../middleware/acl.js");
const bearerAuth = require("../middleware/bearerAuth");
const { userCollection,users, todoModel ,todoCollection} = require("../models/index");


// add routes
router.get("/avengers", bearerAuth, permissions("delete"), getAvengers);
router.get("/todo", bearerAuth, getAvengersById);
router.post("/todo", bearerAuth, createAvengers);
router.put("/todo", bearerAuth, updateAvengers);
router.delete("/todo", bearerAuth, deleteAvengers);

async function getAvengers(req, res) {
  let avengers = await userCollection.read();
  res.status(200).json(avengers);
}

async function getAvengersById(req, res) {
  const id = req.userId;
  console.log("userrrrrrrrrrrrrrrrrrrrrrr", req.userId);
  let avengers = await todoModel.findOne({ where: { userId: id } });
  res.status(200).json(avengers);
}

async function createAvengers(req, res) {
  let update = req.body;
  let data = await todoModel.findOne({ where: { userId: req.userId} });
  let id = data.dataValues.id;
  let item = data.dataValues.todo;
  let newArray = [...item, update];
  let toDo = await todoCollection.update(id, { todo: newArray });
  res.send(toDo);
}

async function updateAvengers(req, res) {
  let arrayIndex = Number(req.query.index);
  let update = req.body;
  let data = await todoModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.todo;
  let id = data.dataValues.id;
  if (item.length - 1 >= arrayIndex) {
    item[arrayIndex] = update;
    let toDo = await todoCollection.update(id, { todo: item });
    res.send(toDo);
  }
}

async function deleteAvengers(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await todoModel.findOne({ where: { userId: req.userId } });
  let item = data.dataValues.todo;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let toDo = await todoCollection.update(id, { todo: item });
  res.status(200).json(toDo);
}

module.exports = router;
