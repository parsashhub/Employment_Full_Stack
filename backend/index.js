const express = require("express");
const winston = require("winston");
require("dotenv").config();
require("./config/logger")();

if (!process.env.JWT_PRIVATE_KEY) throw new Error("private key not defined");

const app = express();
require("./config/production")(app);
require("./config/routes")(app);

const port = process.env.PORT || 8888;
const server = app.listen(port, () =>
    winston.info(`Listening on port ${port} in ${process.env.NODE_ENV} mode.`),
);

module.exports = server;
