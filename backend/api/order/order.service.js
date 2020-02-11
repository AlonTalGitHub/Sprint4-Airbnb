const dbService = require('../services/db.service')
const ObjectId = require('mongodb').ObjectId
async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)   
    try {
        const collection = await dbService.getCollection('order')
        const orders = await collection.find(criteria).toArray();       
        return orders

    } catch (err) {
        console.log('ERROR: cannot find orders')
        throw err;
    }
}
async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ "_id": ObjectId(orderId) })
    } catch (err) {
        console.log(`ERROR: cannot remove order ${orderId}`)
        throw err;
    }
}


async function add(order) {
    order.status = 'initial'
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order);        
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert order`)
        throw err;
    }
}

async function update(order) {
    let filterBy = { updateOrder: true ,status:order.status}
    const criteria = _buildCriteria(filterBy)
    let orderId = { _id: ObjectId(order._id) }   
    try {
        const collection = await dbService.getCollection('order')
        await collection.updateOne(orderId, criteria)
        let updatedOrder = await query(orderId)
        return updatedOrder
    }
    catch (err) {
        console.log(`ERROR: cannot update order`)
        throw err;
    }

}

function _buildCriteria(filterBy) {
    let criteria = {};
    var ids = []
    if (filterBy._id) {
        criteria._id = filterBy._id
    }
    if (filterBy.reserved) {
        delete filterBy.reserved
        for (key in filterBy) {
            ids.push(ObjectId(filterBy[key]))
        }
        criteria = { _id: { "$in": ids } }      
    }
    if (filterBy.houserequests) {        
        criteria = {
            "houseId": { $eq: filterBy.houseId }
        }
    }
    if (filterBy.updateOrder) {
        criteria = { $set: { status: filterBy.status } }
    }
    if (filterBy.dates) {
        criteria = {
            $and: [{ "endDate": { $gte: filterBy.startDate } }, { "startDate": { $lt: filterBy.endDate } }]
        }
    }
    return criteria;
}

module.exports = {
    query,
    remove,
    add,
    update
}
