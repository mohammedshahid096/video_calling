const express = require("express");
const compression = require("compression");
let moment = require("moment-timezone");

const MongoDataBaseConn = require("@config/db.config");
const { DEVELOPMENT_MODE } = require("@config/index.config");
const ratelimitConfig = require("@config/ratelimit.config");
const corsConfig = require("@config/cors.config");
const morganConfigFunction = require("@config/morgan.config");
const helmetConfig = require("@config/helmet.config");
const { runCronSchedulerFunction } = require("@config/cron.config");

const IndexRoutes = require("@routes/index.route");
const errorHandling = require("@utils/errorHandling");

const app = express();

//----------------------------------------
//------------ config --------------------
//----------------------------------------
// MongoDataBaseConn
MongoDataBaseConn();

if (DEVELOPMENT_MODE === "development") {
  app.use(morganConfigFunction());
} else {
  runCronSchedulerFunction();
}

app.use(helmetConfig);
app.use(ratelimitConfig);
app.use(compression({ level: 6 }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(corsConfig);
moment.tz.setDefault("Asia/Kolkata");

// Routes
app.use(IndexRoutes);

// response for error message
app.use((err, req, res, next) => {
  errorHandling.handleMainErrorService(err, res);
});

module.exports = app;
