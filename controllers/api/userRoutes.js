const router = require("express").Router();
const { User } = require("../../models");

// create a new user
router.post("/", async (req, res) => {
  try {
    const createUser = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = createUser.id;
      res.status(200).json(createUser);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userLogin = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userLogin) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again." });
      return;
    }

    const validPassword = await userLogin.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userLogin.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userLogin, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// retrieve users to test
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    // return as a json object
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
