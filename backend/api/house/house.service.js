const dbService = require('../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    console.log('house service the criteria is: ', criteria)
    let houses;
    try {
        let collection = await dbService.getCollection('house')
        if (filterBy.countries) {
            houses = await collection.find(criteria).sort({ "rating": -1 }).limit(3).toArray();
            
        } else {
            houses = await collection.find(criteria)
        }
        console.log('this is house.service speaking houses is :', houses[0])
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

async function update(house) {
    const collection = await dbService.getCollection('house')
    house._id = ObjectId(house._id);
    try {
        await collection.replaceOne({ "_id": house._id }, { $set: house })
        return house
    } catch (err) {
        console.log(`ERROR: cannot update user ${house._id}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy._id) {
        criteria._id = filterBy._id
    }
    if (filterBy.country) {
        criteria = {
            ...criteria, "address.country": filterBy.country
        }
    }
    if (filterBy.capacity) {
        criteria = {
            ...criteria, "capacity": { $gte: +filterBy.capacity }
        }
        //ADD startDate and endDate to criteria!!
    }
    if (filterBy.ids) {
        let idsArr = filterBy.ids.split(',')
        let objectIds = idsArr.map(id => ObjectId(id))
        criteria = { _id: { "$in": objectIds } }
    }
    if (filterBy.countries) {
        let countries = filterBy.countries.split(',')
        criteria = { "address.country": { "$in": countries } }
    }
    // if(filterBy.capacity){
    //     criteria.capacity=parseInt(filterBy.capacity)
    //     //from stack overFlow 'relation.$.status': 'friends'
    //     // criteria.address={}
    //     // criteria.address.country = filterBy.country
    //     // criteria.address.coords = {"$exists" : "true"}
    //     //{ "makes.fgh" : { $exists : true } }
    //     // criteria.capacity=filterBy.capacity
    // }

    return criteria;
}

module.exports = {
    query,
    remove,
    add,
    update
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