const dbConn = require("../databases/mySqlite.js");
const User = dbConn.User;
const Blog = dbConn.Blog;

function indexPage(req, res) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    res.redirect("/homepage");
  }
}

function homePage(req, res) {
  if (req.session.user) {
    Blog.findAll({}).then((blog) => {
      res.render("homepage", { blog: blog });
    });
  } else {
    res.render("login");
  }
}

function loginPage(req, res) {
  res.render("login");
}

function signupPage(req, res) {
  res.render("signup");
}

function blogPage(req, res) {
  res.render("blogpage");
}

function removeblog(req,res){
  if (req.session.user) {
     var id = req.body;
  console.log(Object.keys(id)[0]);
  Blog.destroy({
    where: {
        id: Object.keys(id)[0]
    }
    }).then((blog)=>{
     //console.log("Fetched Taskes" ,blog);
     res.render("profile");
    })
   } else {
    res.render("profile");    
   }   
 }

function editBlogPage(req, res) {
  var id = req.query;
  console.log("Edit query", Object.values(id)[0]);
  res.render("editblog", { id: Object.values(id)[0] });
}

function profilePage(req, res) {
  if (req.session.user) {
    Blog.findAll({
      where: {
        emailOfUser: req.session.user.email,
      },
    }).then((blog) => {
      res.render("profile", { name: req.session.user.name, blog: blog });
    });
  } else {
    res.render("profile");
  }
}

function blogShow(req, res) {
  if (req.session.user) {
    Blog.findAll({}).then((blog) => {
      res.render("blogshow", { blog: blog });
    });
  } else {
    res.render("blogshow");
  }
}

module.exports = {
  loginPage: loginPage,
  homePage: homePage,
  indexPage: indexPage,
  signupPage: signupPage,
  blogShow: blogShow,
  profilePage: profilePage,
  blogPage: blogPage,
  removeblog:removeblog,
  editBlogPage: editBlogPage,
};
