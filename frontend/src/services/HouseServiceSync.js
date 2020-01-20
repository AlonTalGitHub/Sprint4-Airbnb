var testHouses = [
    {
        "_id": "0p9o8i",
        "title": "House on the Lake",
        "description": "Central location and nice view",
        "owner": {
            "_id": "0987",
            "fullName": "Yael Shenker",
            "imgURL": "https://a0.muscache.com/im/pictures/user/e23d9c03-0de7-46f9-ba5a-c62a6358ff34.jpg?aki_policy=profile_x_medium"
        },
        "address": {
            "country": "Spain",
            "coords": {
                "lat": 0,
                "lng": 0
            }
        },
        "imgs": [
            "https://a0.muscache.com/im/pictures/41671788/112cfec6_original.jpg?aki_policy=xx_large",
            "https://a0.muscache.com/im/pictures/beb041ce-a69f-4be0-988d-1305d351e3d1.jpg?aki_policy=large",
            "https://a0.muscache.com/im/pictures/b87c9f56-bd6e-4cfc-b1af-5c122c5c5066.jpg?aki_policy=large",
            "https://a0.muscache.com/im/pictures/a52deab7-1485-4d75-b871-b468b3f4a08d.jpg?aki_policy=large",
            "https://a0.muscache.com/im/pictures/f3259994-cf98-4c4a-a532-c1ac95e65477.jpg?aki_policy=large"
        ],
        "capacity": 4,
        "price": 100,
        "reviews": [
            {
                "byUser": {
                    "_id": "1234",
                    "fullName": "shay rosenthal",
                    "img": "http://img"
                },
                "txt": "Amazing place",
                "rate": 4,
                "createdAt": "2020-01-15T07:51:18.138Z"
            }
        ]
    },
    {
        "_id": "0p9o8i",
        "title": "House on the Lake",
        "description": "Central location and nice view",
        "owner": {
            "_id": "0987",
            "fullName": "Yael Shenker",
            "imgURL": "https://a0.muscache.com/im/pictures/user/e23d9c03-0de7-46f9-ba5a-c62a6358ff34.jpg?aki_policy=profile_x_medium"
        },
        "address": {
            "country": "Spain",
            "coords": {
                "lat": 0,
                "lng": 0
            }
        },
        "imgs": [
            "https://a0.muscache.com/im/pictures/41671788/112cfec6_original.jpg?aki_policy=xx_large",
            "https://a0.muscache.com/im/pictures/beb041ce-a69f-4be0-988d-1305d351e3d1.jpg?aki_policy=large",
            "https://a0.muscache.com/im/pictures/b87c9f56-bd6e-4cfc-b1af-5c122c5c5066.jpg?aki_policy=large",
            "https://a0.muscache.com/im/pictures/a52deab7-1485-4d75-b871-b468b3f4a08d.jpg?aki_policy=large",
            "https://a0.muscache.com/im/pictures/f3259994-cf98-4c4a-a532-c1ac95e65477.jpg?aki_policy=large"
        ],
        "capacity": 4,
        "price": 100,
        "reviews": [
            {
                "byUser": {
                    "_id": "1234",
                    "fullName": "shay rosenthal",
                    "img": "http://img"
                },
                "txt": "Amazing place",
                "rate": 4,
                "createdAt": "2020-01-15T07:51:18.138Z"
            }
        ]
    },
    {
        "_id": "0p9o8i",
        "title": "House on the Lake",
        "description": "Central location and nice view",
        "owner": {
            "_id": "0987",
            "fullName": "Yael Shenker",
            "imgURL": "https://a0.muscache.com/im/pictures/user/e23d9c03-0de7-46f9-ba5a-c62a6358ff34.jpg?aki_policy=profile_x_medium"
        },
        "address": {
            "country": "Spain",
            "coords": {
                "lat": 0,
                "lng": 0
            }
        },
        "imgs": [
            "https://a0.muscache.com/im/pictures/41671788/112cfec6_original.jpg?aki_policy=xx_large",
            "https://a0.muscache.com/im/pictures/beb041ce-a69f-4be0-988d-1305d351e3d1.jpg?aki_policy=large",
            "https://a0.muscache.com/im/pictures/b87c9f56-bd6e-4cfc-b1af-5c122c5c5066.jpg?aki_policy=large",
            "https://a0.muscache.com/im/pictures/a52deab7-1485-4d75-b871-b468b3f4a08d.jpg?aki_policy=large",
            "https://a0.muscache.com/im/pictures/f3259994-cf98-4c4a-a532-c1ac95e65477.jpg?aki_policy=large"
        ],
        "capacity": 4,
        "price": 100,
        "reviews": [
            {
                "byUser": {
                    "_id": "1234",
                    "fullName": "shay rosenthal",
                    "img": "http://img"
                },
                "txt": "Amazing place",
                "rate": 4,
                "createdAt": "2020-01-15T07:51:18.138Z"
            }
        ]
    }
]

export default {
    query,
    save,
    remove,
    get
}

function query() {
    return testHouses;
}

function get(id) {
    return testHouses.find(house =>house._id === id)
}

function remove(id) {
    const idx = testHouses.findIndex(house =>house._id === id)
    testHouses.splice(idx, 1)
}

function save(house) {
    if (house._id) {
        const idx = testHouses.findIndex(house =>house._id === house.id)
        testHouses.splice(idx, 1, house)

    } else {
        house._id = _makeId()
        testHouses.push(house)
    }
    return house;
}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
