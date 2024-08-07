const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Blog, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const blogDataAll = await Blog.findAll({
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

    const blogs = blogDataAll.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      loggedIn: req.session.logged_in,
      user_id: req.session.user_id,
      isNotDashboard: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/");
      return; // stopping the function execution, so it doesn't render login, same as if else in this case
    }
    res.render("login-signup", {
      // formPartials,
      isNotDashboard: true,
      createBlog: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogDataUserAll = await Blog.findAll({
      include: [{ model: User, attributes: ["username"] }],
      where: { user_id: req.session.user_id },
    });

    const blogs = blogDataUserAll.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", {
      blogs,
      loggedIn: req.session.logged_in,
      user_id: req.session.user_id,
      isNotDashboard: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard/:id", withAuth, async (req, res) => {
  try {
    const blogDataUserSingle = await Blog.findOne({
      include: [{ model: User, attributes: ["username"] }],
      where: { user_id: req.session.user_id },
    });

    const blogOne = blogDataUserSingle.get({ plain: true });

    res.render("editBlog", {
      blogOne,
      loggedIn: req.session.logged_in,
      user_id: req.session.user_id,
      isNotDashboard: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/createBlog", withAuth, async (req, res) => {
  try {
    res.render("createBlog", {
      loggedIn: req.session.logged_in,
      user_id: req.session.user_id,
      isNotDashboard: false,
      createBlog: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/dashboard/edit", withAuth, async (req, res) => {
//   try {
//     res.render("editBlog", {
//       loggedIn: req.session.logged_in,
//       user_id: req.session.user_id,
//       isNotDashboard: false,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
