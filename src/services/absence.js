const { Sequelize } = require("sequelize");
const Absence = require("../model/Absence");

const User = require("../model/user");
const Role = require("../model/role");

class AbsenceService {
  async findAllAbsenceEmployee(offset, limit) {
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
        offset: Number(offset),
        limit: Number(limit),
        order: [["created", "DESC"]],
      });
    } catch (e) {
      console.error(e);
    }

    return result;
  }

  async findAbsenceToday(filter) {
    let result;
    const today = new Date();

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
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    return result;
  }
}

module.exports = AbsenceService;
