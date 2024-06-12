const router = require("express").Router();

const { Comment } = require("../../models");

// consider the url paths for this, as the comments will be linked to the blog

// create a new comment
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a comment the USER has made
router.put("/", async (req, res) => {
  try {
    // enter code here
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a comment the USER has made
router.delete("/:id", async (req, res) => {
  try {
    // enter code here
  } catch (err) {
    res.status(400).json(err);
  }
});
