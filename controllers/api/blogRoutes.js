// initialise express
const router = require("express").Router();
// retrieve model
const { Blog, Comment } = require("../../models");

// create a new blog post
router.post("/", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all blogs
router.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.findAll({
      include: [{ model: Comment }],
    });
    res.status(200).json(allBlogs);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get blog by id ?? consider not doing this one
router.get("/:id", async (req, res) => {
  try {
    const idBlog = await Blog.findByPk({
      include: [{ model: Comment }],
    });
    res.status(200).json(idBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a blog the USER has made
router.put("/:id", async (req, res) => {
  try {
    const updateBlog = await Blog.update({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a blog
router.delete("/:id", async (req, res) => {
  try {
    const deleteBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(`Successfully deleted ${deleteBlog}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
