const redis = require("redis");
const uuid = require("uuid");
const Absence = require("../model/Absence");
const { Sequelize } = require("sequelize");
const topicProduce = "absence-consumer";

class RedisService {
  async produce(topic, message) {
    const publisher = redis.createClient();
    await publisher.connect();
    await publisher.publish(topic, JSON.stringify(message));
  }

  async consumer(topic, message) {
    const dataObj = JSON.parse(message);
    if (topic == "absence-produce-in") {
      this.InAbsence(dataObj);
    } else if (topic == "absence-produce-out") {
      this.OutAbsence(dataObj);
    }
  }

  async InAbsence(data) {
    var jsonObject = JSON.parse(data);
    const absenceData = {
      id: uuid.v4(),
      userId: jsonObject.userId,
      timeIn: new Date(),
      created: new Date(),
      updated: new Date(),
    };
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
      const myData = await Absence.findOne({
        where: {
          timeIn: {
            [Sequelize.Op.between]: [startOfDay, endOfDay],
          },
        },
      });
      if (!myData) {
        result = await Absence.create(absenceData);
        this.produce(topicProduce, "Success clocked in");
      } else {
        this.produce(topicProduce, "You have already clocked in previously");
      }
    } catch (e) {
      this.produce(topicProduce, "Failed clocked in");
    }
  }

  async OutAbsence(data) {
    var jsonObject = JSON.parse(data);
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
      const myData = await Absence.findOne({
        where: {
          updated: {
            [Sequelize.Op.between]: [startOfDay, endOfDay],
          },
          userId: jsonObject.userId,
          timeOut: null,
        },
      });

      if (myData) {
        result = await Absence.update(
          { timeOut: new Date(), updated: new Date() },
          {
            where: {
              id: myData.id,
            },
          }
        );
        this.produce(topicProduce, "Success clocked out");
      } else {
        this.produce(topicProduce, "You have already clocked out previously");
      }
    } catch (e) {
      this.produce(topicProduce, "Failed clocked out");
    }
  }
}

module.exports = RedisService;
