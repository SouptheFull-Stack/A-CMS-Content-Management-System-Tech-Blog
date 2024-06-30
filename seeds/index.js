const sequelize = require("../config/connection");

const Blog = require("../models/Blog");
const blogData = require("./blogData.json");

const Comment = require("../models/Comment");
const commentData = require("./commentData.json");

const User = require("../models/User");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  console.log("Seeding successful!");

  process.exit(0);
};

seedDatabase();
