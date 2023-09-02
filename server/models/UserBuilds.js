const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserBuilds extends Model {}

UserBuilds.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    build_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    build_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    build_rings: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    build_amulet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_builds",
  }
);
module.exports = UserBuilds;
