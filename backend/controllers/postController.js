const dbConn = require("../databases/mySqlite.js"); 
const User = dbConn.User; 
const Blog = dbConn.Blog; 

function loginPage(req, res) {
  const { email, password } = req.body;         
  if (!( email && password))                   
    return res.render("login", {                   
      msg: "Please enter all the required details"
    });
 
  else {
    User.findOne({          
     where : {
        email: email,
        password:password
      }
    })
      .then(user => {
        if (!user) {
               console.log("No User");
               return  res.redirect('/login');
            } else if (!user.password==(password)) {
              console.log("Invalid Password");
               return  res.redirect('/login');
            } else {
                console.log("Signed in");
                req.session.user = user;
              return res.redirect('/homepage');
            }
      });
  }   
}

function signupPage(req, res) {
  const { name, email, password } = req.body;
  if (!(name && email && password)) return res.render("signup");
  else {
    User.create({
      name: name,
      email: email,
      password: password,
    })
      .then((user) => {
        console.log("New User added");
        req.session.user = user;

        return res.redirect("/homepage");
      })
      .catch((err) => {
        return res.render("signup");
      });
  }
}   

function blogPage(req, res) {
  const { heading, content } = req.body;

  Blog.create({
    headingOfBlog: heading,
    contentOfBlog: content,
    emailOfUser: req.session.user.email,
  })
    .then((blog) => {
      console.log("Blog Created");

      return res.redirect("/homepage");
    })
    .catch((err) => {
      console.log("Blog Not Created");
      return res.redirect("/homepage");
    });
}

module.exports = {
  loginPage: loginPage,
  signupPage: signupPage,
  blogPage: blogPage
};