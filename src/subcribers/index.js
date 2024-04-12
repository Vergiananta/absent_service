const RedisService = require("../services/worker.service");
const redis = require("redis");
const redisService = new RedisService();

const subscriber = async () => {
  const subscriber = redis.createClient();
  await subscriber.connect();
  await subscriber.pSubscribe("*", async (message, channels) => {
    await redisService.consumer(channels, message);
  });
};

module.exports = subscriber;
