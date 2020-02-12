
const MongoClient = require('mongodb').MongoClient;

const config = require('../../config/index')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'TURTLE_HOUSE_DB';

var dbConn = null;

async function getCollection(collectionName) {
    try {
        const client = await connect()
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        return collection;
    }
    catch (err) {
        console.log( err)
    }
}
//mongodb+srv://shayRosenthal:qS397tuQWrUSAFQx@turtlecluster1-yvyp2.mongodb.net/test?retryWrites=true&w=majority
//old link : "mongodb+srv://shayke:bMv1zuQG7EoZmzLe@cluster0-f7z7e.mongodb.net/test?retryWrites=true&w=majority
async function connect() {
    try {
        const uri = "mongodb+srv://shayRosenthal:qS397tuQWrUSAFQx@turtlecluster1-yvyp2.mongodb.net/test?retryWrites=true&w=majority";
        const client = await new MongoClient.connect(uri, { useUnifiedTopology: true })
        return client;
        // .catch(err => { console.log(err); });
    }
    catch (err) {
        console.log('cant connect to mongoDB', err);
        throw err
    }

}
