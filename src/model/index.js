const role = require("./role");
const user = require("./user");
const absence = require("./Absence");

const dbAssociations = function dbAssociations() {
  role.hasMany(user);
  user.belongsTo(role);
  user.hasMany(absence);
  absence.belongsTo(user);
};

module.exports = dbAssociations;
