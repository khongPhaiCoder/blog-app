const { clearHash } = require("../services/cache.service");

module.exports = async (req, res, next) => {
    await next();

    if (req.userId) {
        clearHash(req.userId);
    }
    clearHash(process.env.GUEST_ID);
};
