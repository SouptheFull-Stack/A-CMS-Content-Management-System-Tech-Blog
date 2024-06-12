// write the relationship psuedo first, then code
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

// A user will have many blogs
// Blogs belong to one user or many users?
User.hasMany(Blog, {
  foreignKey: "user_id",
});

Blog.belongsTo(User, {
  foreignKey: "// write here when done",
});

// a blog can have many comments
Blog.hasMany(Comment, {
  foreignKey: "",
});
// a comment belongs to the blog
Comment.belongsTo(Blog, {
  foreignKey: "",
});

// A user will have many comments
User.hasMany(Comment, {
  foreignKey: "",
});

// comments belong to many users?
Comment.belongsTo(User, {
  foreignKey: "",
});

module.exports = { User, Blog, Comment };
