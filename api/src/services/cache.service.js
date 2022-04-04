const mongoose = require("mongoose");
const redisClient = require("../configs/redis.config");

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
    this._cache = true;
    this._hashKey = JSON.stringify(options.key || "");

    return this;
};

mongoose.Query.prototype.exec = async function () {
    if (!this._cache) {
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name,
        })
    );

    const cacheValue = await redisClient.hGet(this._hashKey, key);

    if (cacheValue) {
        return JSON.parse(cacheValue);
    }

    const result = await exec.apply(this, arguments);

    redisClient.hSet(this._hashKey, key, JSON.stringify(result));

    return result;
};

module.exports = {
    clearHash(hashKey) {
        redisClient.del(JSON.stringify(hashKey));
    },
};
