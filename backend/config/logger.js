require("express-async-errors");
const winston = require("winston");

module.exports = function () {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.File({
        filename: "log/error.log",
        level: "error",
      }),
      new winston.transports.File({ filename: "log/info.log", level: "info" }),
    ],
    exceptionHandlers: [
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      new winston.transports.File({ filename: "log/exceptions.log" }),
    ],
  });

  winston.add(logger);

  if (process.env.APP_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  }

  process.on("unhandledRejection", (e) => {
    throw e;
  });
};
