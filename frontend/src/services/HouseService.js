import axios from 'axios';
import HttpService from './HttpService'
// import StorageService from "./StorageService"


// const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/house/'
//     : '//localhost:3000/house/';



export default {
    query,
    get,
    save,
    remove,
    getHouses
    // get
}
/*filter={
 numOfperson: 1,
            location: '',
            nightsNum:1
}*/
function query(filter) {
    console.log(filter)
    // serever
    // const queryStr = _createQueryStr(filter)
    // return HttpService.get(queryStr)

    //json-server
    return HttpService.get(`/house?address.country_like=${filter.location}&capacity_gte=${filter.numOfperson}`, filter)
    // return HttpService.get(`/house`, filter)

}
function getHouses() {
    return HttpService.get('/house')
}
async function save(house) {
    const addedHouse = house._id ? await HttpService.put(`/house/${house._id}`, house)
        :
        await HttpService.post(`/house`, house);
    console.log(addedHouse)
    return addedHouse
}




// function query() {
//     return StorageService.query('house')
//         .then(houses => {
//             if (houses.length === 0) return StorageService.postMany('house', testHouses)
//             return houses
//         })
// }

function get(id) {
    return HttpService.get(`/house/${id}`)
}

function remove(id) {
    return HttpService.delete(`house/${id}`, id)
}

// function save(house) {
//     if (house._id) {
//         return StorageService.put('house', house)
//     } else {
//         return StorageService.post('house', house)
//     }
// }

const testHouses = [
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

function _createQueryStr(filter) {
    return `/house?country=${filter.location}&capacity=${filter.numOfperson}`
}