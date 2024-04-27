const logger = require("./logger");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else {
    logger.info(error);
  }
  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
