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
    // order.byOrderId = ObjectId(order.byOrderId);
    // order.aboutOrderId = ObjectId(order.aboutOrderId);
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order);
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert order`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}

// async function query(filterBy = {}) {
    //     // const criteria = _buildCriteria(filterBy)
    //     const collection = await dbService.getCollection('order')
    //     try {
    //         // const orders = await collection.find(criteria).toArray();
    //         var orders = await collection.aggregate([
    //             {
    //                 $match: filterBy
    //             },
    //             {
    //                 $lookup:
    //                 {
    //                     from: 'order',
    //                     localField: 'byOrderId',
    //                     foreignField: '_id',
    //                     as: 'byOrder'
    //                 }
    //             },
    //             {
    //                 $unwind: '$byOrder'
    //             },
    //             {
    //                 $lookup:
    //                 {
    //                     from: 'order',
    //                     localField: 'aboutOrderId',
    //                     foreignField: '_id',
    //                     as: 'aboutOrder'
    //                 }
    //             },
    //             {
    //                 $unwind: '$aboutOrder'
    //             }
    //         ]).toArray()
    
    //         orders = orders.map(order => {
    //             order.byOrder = { _id: order.byOrder._id, ordername: order.byOrder.ordername }
    //             order.aboutOrder = { _id: order.aboutOrder._id, ordername: order.aboutOrder.ordername }
    //             delete order.byOrderId;
    //             delete order.aboutOrderId;
    //             return order;
    //         })
    
    //         return orders
    //     } catch (err) {
    //         console.log('ERROR: cannot find orders')
    //         throw err;
    //     }
    // }