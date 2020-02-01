// const logger = require('../../services/logger.service')
const orderService = require('./order.service')

// TODO: needs error handling! try, catch

async function getOrders(req, res) {
    console.log('this is order.controller getOrders,req.query: ', req.query)
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        // logger.error('Cannot get orders', err);
        console.log('Cannot get orders', err);
        res.status(500).send({ error: 'cannot get orders' })

    }
}
async function getOrder(req, res) {
    try {
        const orders = await orderService.query({ "_id": req.params.id })
        res.send(orders)
    } catch (err) {
        // logger.error('Cannot get orders', err);
        console.log('Cannot get orders', err);
        res.status(500).send({ error: 'cannot get orders' })

    }
}

async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.end()
    } catch (err) {
        console.log('order.controller,deleteOrder,err', err)
        throw err
    }
}

async function addOrder(req, res) {
    try {
        var order = req.body;
        // order.byUserId = req.session.user._id;
        order = await orderService.add(order)
        // order.byUser = req.session.user;
        // TODO - need to find aboutUser
        // order.aboutUser = {} 
        res.send(order)
    } catch (err) {
        console.log('order.controller,addOrde,err', err)
        throw err
    }
}
async function updateOrder(req, res) {
    console.log('update req.body', req.body)
    console.log('update req.params', req.params)
    console.log('update req.params', req.query)
    try {
        var order = req.body;
        order = await orderService.update(order)
        res.send(order)
    } catch (err) {
        console.log('order.controller,update order,err', err)
        throw err
    }
}

module.exports = {
    getOrders,
    deleteOrder,
    addOrder,
    getOrder,
    updateOrder
}