const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const mainRoutes = require("./backend/routes/htmlRoutes");
var session = require('express-session');
var cookieParser = require("cookie-parser");


app.use(cors()); //Line1
app.use(compression()); //Line2
app.use(bodyParser.urlencoded({ extended: true })); //Line3
app.use(bodyParser.json()); //Line4
app.use(cookieParser());


app.use(session({
    key: 'sid',
    secret: "KonfinitySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie : {}
}));

app.set("views", __dirname + "/client/views"); 
app.engine("html", require("ejs").renderFile); //Line2
app.set("view engine", "ejs"); //Line3
app.use(logger("dev")); //Line5
app.use("/", mainRoutes); //Line10


app.set("port", 8888); 

app.listen(app.get("port"), () => {
  console.log("Application running in port: " + app.get("port"));
});

module.exports = app;


