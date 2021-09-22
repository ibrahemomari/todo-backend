"use strict";

const express = require("express");
const router = express.Router();
const permissions = require("../middleware/acl.js");
const bearerAuth = require("../middleware/bearerAuth");
const { userCollection,users } = require("../models/index");
const cors=require('cors');

router.use(cors());

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
  let avengers = await users.findOne({ where: { id: id } });
  res.status(200).json(avengers);
}

async function createAvengers(req, res) {
  let newAvengers = req.body;
  newAvengers.userId = req.userId;
  let data = await users.findOne({ where: { id: newAvengers.userId } });
  let id = data.dataValues.id;
  let item = data.dataValues.todo;
  let arres = [...item, newAvengers];
  console.log(arres);
  let avengers = await userCollection.update(id,{ todo: arres });
  res.status(200).json(avengers);
}

async function updateAvengers(req, res) {
  let arrayIndex = Number(req.query.index);
  let update = req.body;
  update.userId = req.userId;
  let data = await users.findOne({ where: { id: update.userId } });
  let item = data.dataValues.todo;
  let id = data.dataValues.id;
  if (item.length - 1 >= arrayIndex) {
    item[arrayIndex] = update;
    let avengers = await userCollection.update(id, { todo: item });
    res.send(avengers);
  }
}

async function deleteAvengers(req, res) {
  let arrayIndex = Number(req.query.index);
  let data = await users.findOne({ where: { id: req.userId } });
  let item = data.dataValues.todo;
  let id = data.dataValues.id;
  item.splice(arrayIndex, 1);
  let avengers = await userCollection.update(id, { todo: item });
  res.status(200).json(avengers);
}

module.exports = router;
