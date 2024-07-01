const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Blog, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
      isNotDashboard: true,
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
  res.render("login", {
    isNotDashboard: true,
  });
});

router.get("/dashboard", withAuth, async (req, res) => {
  const blogData = await Blog.findAll({
    include: [{ model: Blog }, { model: Comment }],
    where: { user_id: req.session.user_id },
  });

  const blogs = blogData.map((blog) => blog.get({ plain: true }));

  const loggedInUser = await User.findByPk(req.session.user_id, {
    attributes: ["name"],
  });

  res.render("blogs", {
    blogs,
    loggedIn: req.session.logged_in,
    userId: req.session.user_id,
    userName: loggedInUser.name,
    isNotDashboard: false,
  });
});

module.exports = router;
