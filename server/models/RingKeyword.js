const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class RingKeyword extends Model {}

RingKeyword.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ringId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ring",
        key: "id",
      },
    },
    keywordId: {
      type: DataTypes.INTEGER,
      references: {
        model: "keyword",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "ring_keyword", // Update the model name to match the table name in the database
  }
);

module.exports = RingKeyword;
