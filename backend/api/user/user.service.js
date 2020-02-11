const dbService = require('../services/db.service')
const ObjectId = require('mongodb').ObjectId
// const userService = require('../user/user.service')

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add,
    addFavorite
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        const users = await collection.find(criteria).toArray();
        users.forEach(user => delete user.password);

        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        delete user.password

        // user.givenUsers = await userService.query({byUserId: ObjectId(user._id) })
        // user.givenUsers = user.givenUsers.map(user => {
        //     delete user.byUser
        //     return user
        // })


        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByEmail(email) {
    try {
        const collection = await dbService.getCollection('user')
        console.log('user.service getByEmail:email,collection found', email, collection)
        const user = await collection.findOne({ email })
        //    const user = await collection.findOne()
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);
    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function addFavorite(userId, houseId) {
    const collection = await dbService.getCollection('user')
    const id = ObjectId(userId);    
    
    try {
        const user = await collection.updateOne({ "_id": id }, { $push: { favorites: houseId } })
        console.log(user)
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        user.houses = [];
        user.reserved = [];
        user.favorites = [];
        user.isHost = false;
        user.isAdmin = false;
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.username = filterBy.txt
    }
    
    return criteria;
}





