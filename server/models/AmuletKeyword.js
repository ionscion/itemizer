const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class AmuletKeyword extends Model {}

AmuletKeyword.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      amuletId: {
        type: DataTypes.INTEGER,
        references: {
          model: "amulet",
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
      modelName: "amulet_keyword",
    }
  );

  module.exports = AmuletKeyword;