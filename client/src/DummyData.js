export const shortArticles = [
    {
        _id: "623f5dfa92f4a5e7ac27636d",
        author: {
            _id: "623f3ca4e93a5bf705682f3e",
            username: "user 2",
            email: "user2@email.com",
            profilePicture: "defaultProfilePicture.png",
        },
        title: "hmm....",
        categories: [
            {
                _id: "623d6ae9c619c43cd66c4948",
                name: "Test",
            },
            {
                _id: "623d80b8677bd27cec822bc1",
                name: "Test 2",
            },
        ],
        likes: [],
        dislike: [],
        views: 0,
        comments: [],
        updatedAt: "2022-03-26T18:39:54.986Z",
    },
    {
        _id: "623e6f75005b2c52c53bb61f",
        author: {
            _id: "623d315d60f6678426c224ff",
            username: "nika nika no mi",
            email: "user1@email.com",
            profilePicture: "a66364f5-e933-4252-971f-94f0e1d4b39a.jpg",
        },
        title: "article 1",
        categories: [
            {
                _id: "623d6ae9c619c43cd66c4948",
                name: "Test",
            },
            {
                _id: "623d80b8677bd27cec822bc1",
                name: "Test 2",
            },
        ],
        likes: [],
        dislike: [],
        views: 0,
        comments: ["623e94a0f5d417c941f020ea"],
        updatedAt: "2022-03-26T18:24:52.053Z",
    },
    {
        _id: "623df7fffcf7bc7ea15f51bb",
        author: {
            _id: "623d315d60f6678426c224ff",
            username: "nika nika no mi",
            email: "user1@email.com",
            profilePicture: "a66364f5-e933-4252-971f-94f0e1d4b39a.jpg",
        },
        title: "article 2",
        categories: [
            {
                _id: "623d6ae9c619c43cd66c4948",
                name: "Test",
            },
            {
                _id: "623d80b8677bd27cec822bc1",
                name: "Test 2",
            },
        ],
        likes: [],
        dislike: [],
        views: 0,
        comments: [],
        updatedAt: "2022-03-26T01:41:26.260Z",
    },
    {
        _id: "623def585feb6250a14fbf5e",
        author: {
            _id: "623d315d60f6678426c224ff",
            username: "nika nika no mi",
            email: "user1@email.com",
            profilePicture: "a66364f5-e933-4252-971f-94f0e1d4b39a.jpg",
        },
        title: "article 3",
        categories: [
            {
                _id: "623d6ae9c619c43cd66c4948",
                name: "Test",
            },
            {
                _id: "623d80b8677bd27cec822bc1",
                name: "Test 2",
            },
        ],
        likes: [],
        dislike: [],
        views: 0,
        comments: [],
        updatedAt: "2022-03-25T16:35:36.562Z",
    },
    {
        comments: [],
        _id: "623d90c986aceb1e6fec5b28",
        author: {
            _id: "623d315d60f6678426c224ff",
            username: "nika nika no mi",
            email: "user1@email.com",
            profilePicture: "a66364f5-e933-4252-971f-94f0e1d4b39a.jpg",
        },
        title: "article 4",
        categories: [
            {
                _id: "623d6ae9c619c43cd66c4948",
                name: "Test",
            },
            {
                _id: "623d80b8677bd27cec822bc1",
                name: "Test 2",
            },
        ],
        likes: [],
        dislike: [],
        views: 0,
        updatedAt: "2022-03-25T09:52:09.663Z",
    },
    {
        comments: [],
        _id: "623d90c986aceb1e6fec5b29",
        author: {
            _id: "623d315d60f6678426c224ff",
            username:
                "nika nika no mi nika nika no mi nika nika no mi nika nika no mi",
            email: "user1@email.com",
            profilePicture: "a66364f5-e933-4252-971f-94f0e1d4b39a.jpg",
        },
        title: "article 4 article 4 article 4 article 4 article 4 article 4 article 4 article 4 article 4 article 4 article 4 article 4 article 4",
        categories: [
            {
                _id: "623d6ae9c619c43cd66c4948",
                name: "Test Test Test Test Test Test Test",
            },
            {
                _id: "623d80b8677bd27cec822bc1",
                name: "Test 2",
            },
        ],
        likes: [],
        dislike: [],
        views: 0,
        updatedAt: "2022-03-25T09:52:09.663Z",
    },
];

export const authors = [
    {
        _id: "623d315d60f6678426c224ff",
        username: "nika nika no mi",
        email: "user1@email.com",
        profilePicture: "a66364f5-e933-4252-971f-94f0e1d4b39a.jpg",
        posts: [
            "623d90c986aceb1e6fec5b28",
            "623def585feb6250a14fbf5e",
            "623df59fa28ad1475e7148a6",
            "623df782e0afa9afe63fb5bb",
            "623df7974ff22ec4f43aab98",
            "623df7fffcf7bc7ea15f51bb",
            "623df86dfcf7bc7ea15f51bf",
            "623dfae948c337497c229d57",
            "623dfbab48c337497c229d5d",
        ],
        roles: ["623d1f611f87fa2d0ac148a2", "623d27801f9134dce0e5f617"],
        numPosts: 9,
    },
    {
        _id: "623f3ca4e93a5bf705682f3e",
        username: "user 2",
        email: "user2@email.com",
        profilePicture: "defaultProfilePicture.png",
        posts: ["623f5dfa92f4a5e7ac27636d"],
        roles: ["623d1f611f87fa2d0ac148a2"],
        numPosts: 1,
    },
    {
        _id: "62413f204c6d76e806a66ce5",
        username: "user 3",
        email: "user3@email.com",
        profilePicture: "defaultProfilePicture.png",
        posts: [],
        roles: ["623d1f611f87fa2d0ac148a2"],
        numPosts: 0,
    },
];

export const post = {
    _id: "623f5dfa92f4a5e7ac27636d",
    date: "2022-03-26T18:39:54.986Z",
    author: {
        _id: "623f3ca4e93a5bf705682f3e",
        username: "user 2",
        email: "user2@email.com",
        profilePicture: "defaultProfilePicture.png",
    },
    title: "hmm....",
    content: "may be i get something interest ^^",
    images: [
        "b7dfe505-e567-4b23-aeb6-afda88e6edcb.jpg",
        "15543a83-2c3d-4fdd-a0a9-9bcbc93fa586.png",
    ],
    categories: [
        {
            _id: "623d6ae9c619c43cd66c4948",
            name: "Test",
        },
        {
            _id: "623d80b8677bd27cec822bc1",
            name: "Test 2",
        },
    ],
    likes: [],
    dislike: [],
    views: 0,
    comments: [],
};
