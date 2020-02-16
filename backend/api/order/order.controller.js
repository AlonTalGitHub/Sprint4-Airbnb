const orderService = require('./order.service')



async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        console.log('Cannot get orders', err);
        res.status(500).send({ error: 'cannot get orders' })

    }
}
async function getOrder(req, res) {
    try {
        const orders = await orderService.query({ "_id": req.params.id })
        res.send(orders)
    } catch (err) {
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
        order = await orderService.add(order)
        res.send(order)
    } catch (err) {
        console.log('order.controller,addOrde,err', err)
        throw err
    }
}
async function updateOrder(req, res) {
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