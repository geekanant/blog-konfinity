const express = require("express");
const getController = require("../controllers/getController");
const postController = require("../controllers/postController");
const dbConn = require("../databases/mySqlite.js"); 
const User = dbConn.User; 
const Blog = dbConn.Blog; 

const router = express.Router();
const app = express();


router.route("/").get(getController.indexPage); //Line2
router.route("/homepage").get(getController.homePage); //Line3
router.route("/login").get(getController.loginPage); //Line2
router.route("/signup").get(getController.signupPage); //Line2
router.route("/login").post(postController.loginPage); //Line3
router.route("/signup").post(postController.signupPage); //Line3
router.route("/blog").get(getController.blogPage); //Line2
router.route("/blogshow").get(getController.blogShow); //Line2
router.route("/profile").get(getController.profilePage); //Line2
router.route("/blog").post(postController.blogPage); //Line2
router.route("/editblog").get(getController.editBlogPage); //Line2
//router.route("/removeblog").get(getController.removeBlogPage); //Line2
//router.route("/editblog").post(postController.editBlogPage); //Line2


router.get('/removeblog', function (req, res) {
  var id = req.query;
  //console.log(req.params);
  //console.log(Object.values(id)[0]);
  Blog.destroy({
    where: {
        id: Object.values(id)[0]
    }
  }).then((blog)=>{
     //console.log("Fetched Taskes" ,blog);
     res.render("profile", {name:req.session.user.name, blog: blog});
    });

})

router.post('/editblog', function (req, res) {
  const { heading, content,editBlogId} = req.body; 

  Blog.update(
    {headingOfBlog: heading,contentOfBlog:content},
    {where: { id: editBlogId }}
  )
  .then(blog => {
    console.log("Blog Created");    
    return res.redirect("/profile");
  })
  .catch(err => {
    console.log("Blog Not Created");
    return res.redirect("/profile");
  });
})

//LAST TASK ROUTES

router.post('/upvote', function (req, res) {
  const { heading, content,editBlogId} = req.body; 

  Blog.update(
    {headingOfBlog: heading,contentOfBlog:content},
    {where: { id: editBlogId }}
  )
  .then(blog => {
    return res.redirect("/blogshow");
  })
  .catch(err => {
    return res.redirect("/blogshow");
  });
})

router.post('/downvote', function (req, res) {
  const { heading, content,editBlogId} = req.body; 

  Blog.update(
    {headingOfBlog: heading,contentOfBlog:content},
    {where: { id: editBlogId }}
  )
  .then(blog => {
    return res.redirect("/blogshow");
  })
  .catch(err => {
    return res.redirect("/blogshow");
  });
})

router.post('/comment', function (req, res) {
  const { heading, content,editBlogId} = req.body; 

  Blog.update(
    {headingOfBlog: heading,contentOfBlog:content},
    {where: { id: editBlogId }}
  )
  .then(blog => {
    return res.redirect("/blogshow");
  })
  .catch(err => {
    return res.redirect("/blogshow");
  });
})




module.exports = router;