// write the relationship psuedo first, then code
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

// A user will have many blogs
User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
});

// a blog can have many comments
Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

// a comment belongs to the blog
Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});

// A user will have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// comments belong to many users?
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Blog, Comment };
