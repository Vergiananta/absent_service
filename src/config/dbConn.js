const Sequelize = require("sequelize");
const connection = new Sequelize("absent", "postgres", "shaolinsocer", {
  dialect: "postgres",
  host: "localhost",
  logging: console.log,
  define: {
    timestamps: false,
  },
});
module.exports = connection;
