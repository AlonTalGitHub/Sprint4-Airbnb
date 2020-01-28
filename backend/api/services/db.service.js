
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
        // const db = await connect()
        // return db.collection(collectionName);
        const client = await connect()
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        return collection;
    }
    catch(err){
       console.log('db.service:eize bassa cant get collection',err)
    }
}

// async function connect() {
//     if (dbConn) return dbConn;
//     try {
//         const client = await MongoClient.connect("mongodb+srv://shayke:bMv1zuQG7EoZmzLe@cluster0-f7z7e.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true }); //config.dbURL
//         const db = client.db(dbName);
//         dbConn = db;
//         return db;
//     } catch(err) {
//         console.log('Cannot Connect to DB', err)
//         throw err;
//     }
// }
// async function connect() {
//         if (dbConn) return dbConn;
//     try {
//         const MongoClient = require('mongodb').MongoClient;
//         const uri = "mongodb+srv://shayke:RS6Kwe55wg89SdT@cluster0-f7z7e.mongodb.net/test?retryWrites=true&w=majority";
//         const client = new MongoClient(uri, { useNewUrlParser: true });
//         // client.connect(err => {
//         //     const collection = client.db("test").collection("devices");
//         //     // perform actions on the collection object
//         // });
//         // const ggg=await client.connect()
//         // console.log('client is',client)
//         await client.connect()
//         const db = await client.db(dbName);
//         console.log('db maniak zevel',db)
//         dbConn = db;
//         return db;
//     } catch (err) {
//         console.log('Cannot Connect to DB', err)
//         client.close();
//         throw err;
//     }
// }

//bMv1zuQG7EoZmzLe
//RS6Kwe55wg89SdT
// { useUnifiedTopology: true } { useNewUrlParser: true } 
//?authSource=admin
async function connect() {
    try{
        const uri = "mongodb+srv://shayke:bMv1zuQG7EoZmzLe@cluster0-f7z7e.mongodb.net/test?retryWrites=true&w=majority";
        const client = await new MongoClient.connect(uri,{ useUnifiedTopology: true })
        return client; 
        // .catch(err => { console.log(err); });
    }
    catch(err){
        console.log('cant connect to mongoDB',err);
        throw err
    }


    // if (!client) {
    //     return;
    // } else {
    //     return client;
    // }
}

// try {

//     const db = client.db("testdb");

//     let collection = db.collection('cars');

//     let query = { name: 'Volkswagen' }

//     let res = await collection.findOne(query);

//     console.log(res);

// } catch (err) {

//     console.log(err);
// } finally {

//     client.close();
// }

