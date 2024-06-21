const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // NEED TO FIX THIS
    user_name: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "username",
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // will display how long it's been since the comment was posted (as done in Facebook)
    time_since: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true, // not sure what this does, and if it's necessary for comments? only seen in user models
    modelName: "comment",
  }
);

module.exports = Comment;
