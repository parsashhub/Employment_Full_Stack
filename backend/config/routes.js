const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const users = require("../controller/users");
const advertisement = require("../controller/advertisement");
const jobCategories = require("../controller/jobCategories");
const jobContracts = require("../controller/jobContracts");
const auth = require("../controller/auth");
const cookieParser = require("cookie-parser");
const authMiddleware = require("../middleware/authMiddleware");

module.exports = function (app) {
  app.use(express.json());
  const allowedOrigins = ["http://localhost:3005", "http://localhost:3000"];

  app.use(cors({ credentials: true, origin: allowedOrigins }));
  app.use(cookieParser());

  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/advertisements", advertisement);
  app.use("/api/jobCategories", jobCategories);
  app.use("/api/jobContracts", jobContracts);
  // app.use("/api/resume", authMiddleware);
  app.use("/api/resume", express.static(__dirname.slice(0, -6) + "uploads"));

  app.use(error);
};
