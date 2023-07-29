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
    damageValue: {
      type: DataTypes.FLOAT, // Assuming damage values can be floating-point numbers
      allowNull: true, // Set to false if damage values are always required
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "ring_keyword",
  }
);

module.exports = RingKeyword;
