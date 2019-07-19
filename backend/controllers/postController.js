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

module.exports = {
  loginPage: loginPage
};