const redis = require("redis");

const client = redis.createClient(process.env.REDIS_URL);

client.on("error", function (err) {
    console.error("Error encountered: ", err);
});

client.on("connect", () => {
    console.log("Redis connected");
});

client.connect();

module.exports = client;
