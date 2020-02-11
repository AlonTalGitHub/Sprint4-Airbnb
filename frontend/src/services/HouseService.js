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
}

function query(filter) {    
    const queryStr = _createQueryStr(filter)
    return HttpService.get(queryStr)   

}
function getHouses() {
    return HttpService.get('/house')
}
async function save(house) {
    const addedHouse = house._id ? await HttpService.put(`/house/${house._id}`, house)
        :
        await HttpService.post(`/house`, house);    
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
        querySTR += `?country=${filter.location}`
    }    
    
    if(filter.startDate && filter.endDate && filter.location){
        querySTR += `&startDate=${filter.startDate}&endDate=${filter.endDate}`
    }
    if(filter.numOfperson){
        querySTR +=`&capacity=${filter.numOfperson}`
    }
    if (filter.ids) {
        const ids = filter.ids.join()
        querySTR += `?ids=${ids}`
    }
    
    if (filter.countries) {
        const countries = filter.countries.join()        
        querySTR = `/house?countries=${countries}`
    }
    if(filter.price){
        querySTR+=`&price=${filter.price}`
    }    
    return querySTR;
}

