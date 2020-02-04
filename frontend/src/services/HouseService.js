import axios from 'axios';
import HttpService from './HttpService'
// import StorageService from "./StorageService"


// const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/house/'
//     : '//localhost:3000/house/';

export default {
    query,
    get,
    save,
    remove,
    getHouses
    // get
}
/*filter={
 numOfperson: 1,
            location: '',
            nightsNum:1
}*/
function query(filter) {
    console.log(filter)
    // server
    const queryStr = _createQueryStr(filter)
    return HttpService.get(queryStr)

    //json-server
    // return HttpService.get(`/house?address.country_like=${filter.location}&capacity_gte=${filter.numOfperson}`, filter)
    // return HttpService.get(`/house`, filter)

}
function getHouses() {
    return HttpService.get('/house')
}
async function save(house) {
    const addedHouse = house._id ? await HttpService.put(`/house/${house._id}`, house)
        :
        await HttpService.post(`/house`, house);
    console.log('house service fron save house',addedHouse)
    return addedHouse
}


function get(id) {
    return HttpService.get(`/house/${id}`)
}

function remove(id) {
    return HttpService.delete(`/house/${id}`, id)
}

function _createQueryStr(filter) {
    var querySTR = '/house'    
       
    if (filter.byId) {
        querySTR += `/${filter._id}`
    }
    if (filter.location==='' || filter.location) {        
        querySTR += `?country=${filter.location}&capacity=${filter.numOfperson}`
    }    
    if (filter.startDate && filter.endDate && !filter.location) {
        querySTR += `?dates=true&startDate=${filter.startDate}&endDate=${filter.endDate}`
    }
    if(filter.startDate && filter.endDate && filter.location){
        querySTR += `&startDate=${filter.startDate}&endDate=${filter.endDate}`
    }
    if (filter.ids) {
        const ids = filter.ids.join()
        querySTR += `?ids=${ids}`
    }
    
    if (filter.countries) {
        const countries = filter.countries.join()
        querySTR += `?countries=${countries}`
    }
    if(filter.price){
        querySTR+=`&price=${filter.price}`
    }
    console.log('query ready', querySTR)
    return querySTR;
}

