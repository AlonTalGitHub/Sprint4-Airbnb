const dbService = require('../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('house')
        const houses = await collection.find(criteria).toArray();
        return houses
    } catch (err) {
        console.log('ERROR: cannot find houses')
        throw err;
    }
}
async function remove(houseId) {
    const collection = await dbService.getCollection('house')
    try {
        await collection.deleteOne({ "_id": ObjectId(houseId) })
    } catch (err) {
        console.log(`ERROR: cannot remove house ${houseId}`)
        throw err;
    }
}


async function add(house) {
    // house.byHouseId = ObjectId(house.byHouseId);
    // house.aboutHouseId = ObjectId(house.aboutHouseId);

    const collection = await dbService.getCollection('house')
    try {
        await collection.insertOne(house);
        return house;
    } catch (err) {
        console.log(`ERROR: cannot insert house`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy._id) {
        criteria._id = filterBy._id
    }
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}

// async function query(filterBy = {}) {
    //     // const criteria = _buildCriteria(filterBy)
    //     const collection = await dbService.getCollection('house')
    //     try {
    //         // const houses = await collection.find(criteria).toArray();
    //         var houses = await collection.aggregate([
    //             {
    //                 $match: filterBy
    //             },
    //             {
    //                 $lookup:
    //                 {
    //                     from: 'house',
    //                     localField: 'byHouseId',
    //                     foreignField: '_id',
    //                     as: 'byHouse'
    //                 }
    //             },
    //             {
    //                 $unwind: '$byHouse'
    //             },
    //             {
    //                 $lookup:
    //                 {
    //                     from: 'house',
    //                     localField: 'aboutHouseId',
    //                     foreignField: '_id',
    //                     as: 'aboutHouse'
    //                 }
    //             },
    //             {
    //                 $unwind: '$aboutHouse'
    //             }
    //         ]).toArray()

    //         houses = houses.map(house => {
    //             house.byHouse = { _id: house.byHouse._id, housename: house.byHouse.housename }
    //             house.aboutHouse = { _id: house.aboutHouse._id, housename: house.aboutHouse.housename }
    //             delete house.byHouseId;
    //             delete house.aboutHouseId;
    //             return house;
    //         })

    //         return houses
    //     } catch (err) {
    //         console.log('ERROR: cannot find houses')
    //         throw err;
    //     }
    // }