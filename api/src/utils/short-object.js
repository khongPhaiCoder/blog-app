const shortRole = (role) => {
    const { _id, createdAt, updatedAt, __v, ...other } = role._doc;

    return {
        _id: _id.toString(),
        ...other,
    };
};

const shortUser = (user) => {
    const { _id, password, createdAt, updatedAt, __v, ...other } = user._doc;

    return {
        _id: _id.toString(),
        ...other,
    };
};

const shortCategory = (category) => {
    const { _id, createdAt, updatedAt, __v, ...other } = category._doc;
    return {
        _id: _id.toString(),
        ...other,
    };
};

module.exports = {
    shortRole,
    shortUser,
    shortCategory,
};
