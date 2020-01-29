// const logger = require('../../services/logger.service')
const houseService = require('./house.service')
const ObjectId = require('mongodb').ObjectId

// TODO: needs error handling! try, catch

async function getHouses(req, res) {
    console.log('controller query',req.query)
        
    try {
        let houses = await houseService.query(req.query)
        res.send(houses)
    } catch (err) {
        // logger.error('Cannot get houses', err);
        console.log('Cannot get houses', err);
        res.status(500).send({ error: 'cannot get houses' })

    }
}

      
async function getHouse(req, res) {
    //shay
    try {
        const house = await houseService.query({ "_id": ObjectId(req.params.id)})
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

module.exports = {
    getHouses,
    deleteHouse,
    addHouse,
    getHouse,
    updateHouse
}