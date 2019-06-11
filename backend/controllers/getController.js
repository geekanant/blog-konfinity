function indexPage (req, res) {
  if (!req.session.user) {
        res.redirect("/login");
   } else {
        res.redirect("/homepage");    
   }    
}

module.exports = {
  indexPage: indexPage,
};