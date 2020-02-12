// const logger = require('../../services/logger.service')
const userService = require('./user.service')

// TODO: needs error handling! try, catch

// async function getHouses(req, res) {
//     try {
//         const houses = await houseService.query(req.query)
//         res.send(houses)
//     } catch (err) {
//         logger.error('Cannot get houses', err);
//         res.status(500).send({ error: 'cannot get houses' })

//     }
// }

// async function deleteHouse(req, res) {
//     await houseService.remove(req.params.id)
//     res.end()
// }
// async function turlak(req, res) {
//     // var reqTurlak=req.body
//     try {
//         const resTurlak = await userService.bringMeAdmin();
//         res.send(resTurlak)
//     } catch (err) {

//         console.log('kaka ba leben', err)
//     }

// }
// async function addOrder(req, res) {
//     var order = req.body;
//     // house.byUserId = req.session.user._id;
//     var addedOrder = await userService.add(order)
//     // house.byUser = req.session.user;
//     // TODO - need to find aboutUser
//     // house.aboutUser = {} 
//     res.send(addedOrder)
// }

// module.exports = {
//     // getHouses,
//     // deleteHouse,
//     addOrder,
//     turlak
// }


async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    }
    catch (err) {
        console.log('backend user.controller err:')
        throw err
    }
}

async function getUsers(req, res) {
    try {
        console.log(req.query);
        const users = await userService.query(req.query)
        res.send(users)
    }
    catch (err) {
        console.log('backend user.controller err:', err)
        throw err
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.end()
    }
    catch (err) {
        console.log('backend user.controller err:', err)
        throw err
    }

}

async function updateUser(req, res) {
    try {
        const user = req.body;
        await userService.update(user)
        res.send(user)
    }
    catch (err) {
        console.log('backend user.controller err:', err)
        throw err
    }
}
async function addFavorite(req, res) {
    try {
        const favoriteId = req.body;
        console.log('user controller favorite id ', favoriteId.favId)
        console.log('user controller favorite id str ', favoriteId.favId.toString())
        const userId = req.params.id;
        const user = await userService.addFavorite(userId, favoriteId.favId.toString())
        res.send(user)
    }
    catch (err) {
        console.log('backend user.controller err:', err)
        throw err
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    addFavorite
}