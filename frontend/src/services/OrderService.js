// import axios from 'axios';
import HttpService from './HttpService'
// import StorageService from "./StorageService"

export default {
    getOrders,
    getById,
    remove,
    update
}

function getOrders() {
    return HttpService.get('order')
}

function getById(orderId) {
    return HttpService.get(`order/${orderId}`)
}
function remove(orderId) {
    return HttpService.delete(`order/${orderId}`)
}

function update(order) {
    return HttpService.put(`order/${order._id}`, order)
}
