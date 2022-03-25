const shortRole = (role) => {
    const { _id, createdAt, updatedAt, __v, ...other } = role._doc;

    return {
        _id: _id.toString(),
        ...other,
    };
};

module.exports = {
    shortRole,
};
