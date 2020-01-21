export default class Order {
    constructor(houseId, userId,numOfPeople) {
        this.houseId = houseId
        this.byUser = {"_id":userId}
        this.numOfPeople=numOfPeople;
        this.createdAt = (new Date).getTime()
    }
}

/*
    {
        "_id":"tyui5678",
        "houseId":"jgvgh23d3"
        "createdAt": 1579089879043,
        "byUser":{
            "_id": "1234"

        }
*/


