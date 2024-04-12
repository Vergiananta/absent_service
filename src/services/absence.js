const { Sequelize } = require("sequelize");
const Absence = require("../model/Absence");

const uuid = require("uuid");
const User = require("../model/user");
const Role = require("../model/role");

const topicProduce = "absence-consumer";
class AbsenceService {
  async findAllAbsenceEmployee(employeeId) {
    let result;
    try {
      result = await Absence.findAll({
        include: {
          model: User,
          attributes: ["id", "name", "nik"],
          include: {
            model: Role,
            attributes: ["name"],
          },
        },
        where: {
          userId: employeeId,
        },
      });
    } catch (e) {
      console.error(e);
    }

    return result;
  }

  async findAbsenceToday(filter) {
    let result;
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    try {
      result = await Absence.findOne({
        where: {
          userId: filter.userId,
          created: {
            [Sequelize.Op.between]: [startOfDay, endOfDay],
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
    return result;
  }
}

module.exports = AbsenceService;
