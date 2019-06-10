const express = require("express");
const app = express();

app.use("/", mainRoutes);

app.set("port", 8888); 

app.listen(app.get("port"), () => {
  console.log("Application running in port: " + app.get("port"));
});

module.exports = app;


