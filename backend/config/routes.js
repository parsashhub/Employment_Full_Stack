const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const users = require("../controller/users");
const advertisement = require("../controller/advertisement");
const auth = require("../controller/auth");
const cookieParser = require("cookie-parser");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(cookieParser());

  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/advertisements", advertisement);

  app.use(error);
};
