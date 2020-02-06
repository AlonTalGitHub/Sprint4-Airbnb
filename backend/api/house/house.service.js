const dbService = require('../services/db.service')
const ObjectId = require('mongodb').ObjectId
const orderService = require('../order/order.service')
async function query(filterBy = {}) {
    var criteria = _buildCriteria(filterBy)
    console.log('house service the criteria is: ', criteria)
    let houses;
    try {
        let collection = await dbService.getCollection('house')
        if (filterBy.countries) {
            houses = await collection.find(criteria).sort({ "rating": -1 }).limit(3).toArray();

        } else if (filterBy.startDate && filterBy.endDate) {
            let newFilterBy = await _getAvailableHouses({ startDate: filterBy.startDate, endDate: filterBy.endDate })
            console.log('newFilterBy: ', newFilterBy)
            dateCriteria = _buildCriteria(newFilterBy)
            let newCriteria={...criteria,...dateCriteria}
            console.log('newCriteria is: ', newCriteria)
            houses = await collection.find(newCriteria).toArray()
        }
        else {
            houses = await collection.find(criteria).toArray()
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
    if(filterBy.price){
        criteria={
            ...criteria,"price":{$lte:+filterBy.price}
        }
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

    if (filterBy.allExcept) {
        let allHousesExcept = filterBy.allExceptHouses.map(houseId => ObjectId(houseId))
        criteria = {
            ...criteria, _id: { $nin: allHousesExcept }
        }
    }
    return criteria;
}

async function _getAvailableHouses(dates) {
    let userDates = { ...dates }
    console.log('startDate is: ', userDates.startDate, '\n')
    console.log('endDate is: ', userDates.endDate, '\n')

    let orderFilterBy = {
        dates: true,
        startDate: userDates.startDate,
        endDate: userDates.endDate
    }
    console.log('orderFilterBy: ', orderFilterBy)

    try {
        let overlappingOrders = await orderService.query(orderFilterBy)
        console.log('overlappingOrders are: ', overlappingOrders)
        let unAvailableHouses = overlappingOrders.map(order => order.houseId)
        console.log('unAvailableHouses: ', unAvailableHouses)
        // let filter = {
        //     allExcept: true,
        //     allExceptHouses: unAvailableHouses
        // }
        return {
            allExcept: true,
            allExceptHouses: unAvailableHouses
        }
        // let availableHouses = await query(filter)
        // return availableHouses;
    } catch (err) {
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    update,
}