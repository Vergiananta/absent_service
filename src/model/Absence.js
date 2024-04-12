const DataTypes = require("sequelize");
const sequelize = require("../config/dbConn");

const Absence = sequelize.define(
  "absence",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    timeIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    timeOut: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "absence",
  }
);
module.exports = Absence;
