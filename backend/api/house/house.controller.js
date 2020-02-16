const userService = require('../user/user.service')
const houseService = require('./house.service')
const ObjectId = require('mongodb').ObjectId



async function getHouses(req, res) {
    console.log('controller query', req.query)
    try {
        let houses = await houseService.query(req.query)
        if (houses.length === 0) houses = [null];
        // console.log('houses found: ', houses)
        res.send(houses)
    }
    catch (err) {
        // console.log('Cannot get houses', err);
        res.status(500).send({ error: 'cannot get houses' })

    }
}


async function getHouse(req, res) {
    try {
        const house = await houseService.query({ "_id": ObjectId(req.params.id) })
        res.send(house[0])
    } catch (err) {
        // console.log('Cannot get houses', err);
        res.status(500).send({ error: 'cannot get house' })

    }
}
async function deleteHouse(req, res) {
    await houseService.remove(req.params.id)
    res.end()
}

async function addHouse(req, res) {
    var house = req.body;
    house = await houseService.add(house)
    // console.log('house.controler house id is', house._id.toString())
    const { _id } = house.owner
    const user = await userService.getById(_id)
    // console.log('house.controler user is', user)
    user.houses.push(house._id.toString())
    user.isHost = true
    updateUser = await userService.update(user)
    // console.log('updates user in house controller',updateUser)
    res.send(house)
}

async function updateHouse(req, res) {
    let house = req.body;
    house = await houseService.update(house)
    res.send(house)
}
module.exports = {
    getHouses,
    deleteHouse,
    addHouse,
    getHouse,
    updateHouse,
}