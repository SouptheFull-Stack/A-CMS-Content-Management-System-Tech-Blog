// creating a middleware function in utils to avoid repetitive code in the routes
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

// exporting it so we can declare it in the route requests
module.exports = withAuth;
