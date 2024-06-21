const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", async, (req, res) => {
  res.render("homepage");
});

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
      isHomePage: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return; // stopping the function execution, so it doesn't render login, same as if else in this case
  }
  res.render("login");
});

module.exports = router;
