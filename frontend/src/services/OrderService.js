// import axios from 'axios';
import HttpService from './HttpService'
// import StorageService from "./StorageService"

export default {
    getOrders,
    getById,
    remove,
    update,
    save
}

function getOrders(filterBy = {}) {
    let querySTR = _makeQuerySTR(filterBy)
    return HttpService.get(`/order${querySTR}`)
}

function getById(orderId) {
    return HttpService.get(`/order/${orderId}`)
}
function remove(orderId) {
    return HttpService.delete(`/order/${orderId}`)
}

function update(order) {
    return HttpService.put(`/order/${order._id}`, order)
}
async function save(order) {
    const addedOrder = order._id ? await HttpService.put(`/order/${order._id}`, order)
        :
        await HttpService.post(`/order`, order);
    console.log(addedOrder)
    return addedOrder
}
function _makeQuerySTR(filterBy) {
    let STR = '';
    if (filterBy.orders) {
        let orders = filterBy.orders
        console.log(' _makeQuerySTR: orders are ', orders)
        let Length = orders.length
        STR = orders.reduce((acc, item, idx) => {
            if (idx < Length - 1) return acc + `order${idx}=${item}&`
            else return acc + `order${idx}=${item}`
        }, '?reserved=true&')
        return STR;
    }
    if (filterBy.houserequests) {
        STR = `?houserequests=true&houseId=${filterBy.houseId}`
    }
    if(filterBy.dates){
        STR=`?dates=true&startDate=${filterBy.startDate}&endDate=${filterBy.endDate}`
    }
    return STR;
}
