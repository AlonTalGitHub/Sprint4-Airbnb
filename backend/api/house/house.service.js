const dbService = require('../services/db.service')
const ObjectId = require('mongodb').ObjectId
const orderService=require('../order/order.service')
async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    console.log('the criteria is: ', criteria)
    try {
        let collection = await dbService.getCollection('house')
        // console.log('this is house.controller speaking collection is :',collection)
        let houses = await collection.find(criteria).toArray();
        // console.log('this is house.controller speaking houses is :',houses)
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
    }
    if (filterBy.allExcept) {
        let allHousesExcept = filterBy.allExceptHouses.map(houseId=>ObjectId(houseId))
        criteria = {
            ...criteria, _id: { $nin: allHousesExcept}
        }
    }
    return criteria;
}

async function getAvailableHouses(dates) {
    let userDates={...dates}
    console.log('startDate is: ', userDates.startDate, '\n')
    console.log('endDate is: ', userDates.endDate, '\n')

    let orderFilterBy = {
        dates: true,
        startDate:userDates.startDate,
        endDate:userDates.endDate
    }
    console.log('orderFilterBy: ', orderFilterBy)

    try {
        let overlappingOrders = await orderService.query(orderFilterBy)
        console.log('overlappingOrders are: ',overlappingOrders)
        let unAvailableHouses = overlappingOrders.map(order => order.houseId)
        console.log('unAvailableHouses: ',unAvailableHouses)
        let filter = {
            allExcept: true,
            allExceptHouses: unAvailableHouses
        }
        let availableHouses = await query(filter)
        return availableHouses;
    } catch (err) {
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    update,
    getAvailableHouses
}