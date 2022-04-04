const shortUser = (user) => {
    const { _id, password, createdAt, updatedAt, __v, ...other } =
        user._doc || user;

    return {
        _id: _id.toString(),
        ...other,
    };
};

const shortPost = (post) => {
    const { _id, createdAt, updatedAt, __v, ...other } = post._doc;
    return {
        _id: _id.toString(),
        date: updatedAt,
        ...other,
    };
};

module.exports = {
    shortUser,
    shortPost,
};
