const dbService = require('../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('order')
        const orders = await collection.find(criteria).toArray();
        console.log('order.service  orders after promise all: ', orders)
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
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order);
        console.log('order.service, order was added successfully, order is: ',order)
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert order`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    let criteria = {};
    var ids=[]
    if (filterBy._id) {
        criteria._id = filterBy._id
    }
    if (filterBy.reserved) {
        delete filterBy.reserved
    for (key in filterBy) {
        ids.push(ObjectId(filterBy[key]))
    }
    criteria={_id:{"$in":ids}}
    console.log('order.service _buildCriteria(filterBy): ', criteria)
    }
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}
