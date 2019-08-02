const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const mainRoutes = require("./backend/routes/htmlRoutes");

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    key: "sid",
    secret: "KonfinitySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

app.set("views", __dirname + "/client");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(logger("dev")); 
app.use("/", mainRoutes);

app.set("port", 8888); 

app.listen(app.get("port"), () => {
  console.log("Application running in port: " + app.get("port"));
});

module.exports = app;


