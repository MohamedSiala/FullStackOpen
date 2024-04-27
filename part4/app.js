const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const Blog = require("./models/blog");
const morgan = require("morgan");
morgan.token("data", function (req) {
  if (Object.keys(req.body).length !== 0) {
    return JSON.stringify(req.body);
  }
  return " ";
});

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "test") {
  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms :data"
    )
  );
}
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
