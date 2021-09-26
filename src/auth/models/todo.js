   
"use strict";

const toDoModel = (sequelize, DataTypes) => {
  const model = sequelize.define("todo", {
    todo: { type: DataTypes.ARRAY(DataTypes.JSON()), defaultValue: [] },
    userId:{type: DataTypes.INTEGER }
  });
  return model;
};

module.exports = toDoModel;