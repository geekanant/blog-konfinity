const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./backend/databases/database.sqlite"
});

const users = sequelize.define("users", {
  
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique:true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const blog = sequelize.define("blog", {
  
  headingOfBlog: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contentOfBlog: {
    type: Sequelize.STRING,
    
    allowNull: false
  },
  emailOfUser: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

sequelize
  .sync()
  .then(() =>
    console.log(
    )
  )
  .catch(error => console.log("This error occurred"));
  
 module.exports = {
  User: users,
  Blog:blog

};