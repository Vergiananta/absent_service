import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConn";

export const Absent = sequelize.define(
  "absent",
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
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "absent",
    freezeTableName: true,
  }
);
