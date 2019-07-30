const express = require("express");
const getController = require("../controllers/getController");
const postController = require("../controllers/postController");
const dbConn = require("../databases/mySqlite.js");
const User = dbConn.User;
const Blog = dbConn.Blog;

const router = express.Router();
const app = express();

router.route("/").get(getController.indexPage);
router.route("/homepage").get(getController.homePage);
router.route("/login").get(getController.loginPage);
router.route("/signup").get(getController.signupPage);
router.route("/login").post(postController.loginPage);
router.route("/signup").post(postController.signupPage);
router.route("/blog").get(getController.blogPage);
router.route("/blogshow").get(getController.blogShow);
router.route("/profile").get(getController.profilePage);
router.route("/blog").post(postController.blogPage);
router.route("/editblog").get(getController.editBlogPage);
router.route("/removeblog").get(getController.removeBlogPage);
router.route("/editblog").post(postController.editBlogPage);

router.get("/removeblog", function (req, res) {
  var id = req.query;
  Blog.destroy({
    where: {
      id: Object.values(id)[0],
    },
  }).then((blog) => {
    res.render("profile", { name: req.session.user.name, blog: blog });
  });
});

router.post("/editblog", function (req, res) {
  const { heading, content, editBlogId } = req.body;

  Blog.update(
    { headingOfBlog: heading, contentOfBlog: content },
    { where: { id: editBlogId } }
  )
    .then((blog) => {
      console.log("Blog Created");
      return res.redirect("/profile");
    })
    .catch((err) => {
      console.log("Blog Not Created");
      return res.redirect("/profile");
    });
});

//LAST TASK ROUTES

router.post("/upvote", function (req, res) {
  const { heading, content, editBlogId } = req.body;

  Blog.update(
    { headingOfBlog: heading, contentOfBlog: content },
    { where: { id: editBlogId } }
  )
    .then((blog) => {
      return res.redirect("/blogshow");
    })
    .catch((err) => {
      return res.redirect("/blogshow");
    });
});

router.post("/downvote", function (req, res) {
  const { heading, content, editBlogId } = req.body;

  Blog.update(
    { headingOfBlog: heading, contentOfBlog: content },
    { where: { id: editBlogId } }
  )
    .then((blog) => {
      return res.redirect("/blogshow");
    })
    .catch((err) => {
      return res.redirect("/blogshow");
    });
});

router.post("/comment", function (req, res) {
  const { heading, content, editBlogId } = req.body;

  Blog.update(
    { headingOfBlog: heading, contentOfBlog: content },
    { where: { id: editBlogId } }
  )
    .then((blog) => {
      return res.redirect("/blogshow");
    })
    .catch((err) => {
      return res.redirect("/blogshow");
    });
});

module.exports = router;
