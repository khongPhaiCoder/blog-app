const { clearHash } = require("../services/cache.service");
const wrapAsync = require("../utils/wrap-async");

module.exports = wrapAsync(async (req, res, next) => {
    await next();

    if (req.userId) {
        clearHash(req.userId);
    }
    clearHash(process.env.GUEST_ID);
});
