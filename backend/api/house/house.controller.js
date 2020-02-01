// const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const houseService = require('./house.service')
const ObjectId = require('mongodb').ObjectId

// TODO: needs error handling! try, catch

async function getHouses(req, res) {
    console.log('controller query', req.query)
    try {
        if (req.query.startDate && req.query.endDate) {
            let userDates={...req.query}
            delete userDates.dates
            let houses=await _getAvailableHouses(userDates)
            res.send(houses)
        } else{
            let houses = await houseService.query(req.query)
            res.send(houses)
        }
    }
    catch (err) {
        // logger.error('Cannot get houses', err);
        console.log('Cannot get houses', err);
        res.status(500).send({ error: 'cannot get houses' })

    }
}


async function getHouse(req, res) {
    //shay
    try {
        const house = await houseService.query({ "_id": ObjectId(req.params.id) })
        res.send(house[0])
    } catch (err) {
        // logger.error('Cannot get houses', err);
        console.log('Cannot get houses', err);
        res.status(500).send({ error: 'cannot get house' })

    }
}
async function deleteHouse(req, res) {
    await houseService.remove(req.params.id)
    res.end()
}

async function addHouse(req, res) {
    var house = req.body;
    // house.byUserId = req.session.user._id;
    house = await houseService.add(house)
    console.log('house.controler house id is', house._id.toString())
    const { _id } = house.owner
    const user = await userService.getById(_id)
    console.log('house.controler user is', user)
    user.houses.push(house._id.toString())
    user.isHost = true
    updateUser = await userService.update(user)
    console.log('updates user in house controller',updateUser)




    // house.byUser = req.session.user;
    // TODO - need to find aboutUser
    // house.aboutUser = {} 
    res.send(house)
}

async function updateHouse(req, res) {
    let house = req.body;
    house = await houseService.update(house)
    res.send(house)
}
async function _getAvailableHouses(userDates) {
    try {
        let houses = await houseService.getAvailableHouses(userDates)
        // res.send(houses)
        return houses
    } catch (err) {
        // logger.error('Cannot get houses', err);
        console.log('Cannot get houses', err);
        res.status(500).send({ error: 'cannot get houses' })

    }
}
module.exports = {
    getHouses,
    deleteHouse,
    addHouse,
    getHouse,
    updateHouse,
}