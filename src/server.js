"use strict";

const exprees = require("express");
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404.js');
const routes=require('./auth/routes/routes');
const avengersRouts=require('./auth/routes/avengersRoute')
const app = exprees();

app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));
app.use(routes);
app.use(avengersRouts);
// routes
app.get("/", (req, res) => {
  res.send("Welcome to home");
});

// start port
const start = (port) => {
  app.listen(port, () => {
    console.log("The server is started running at port", port);
  });
};

// use middleware
app.use(notFound);
app.use(errorHandler);



// exporting

module.exports = {
  app: app,
  start: start,
};
