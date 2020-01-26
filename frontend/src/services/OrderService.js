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
async function save(order) {
    const addedOrder  = order._id? await HttpService.put(`/order/${order._id}`, order)
     : 
     await HttpService.post(`/order`, order);
    console.log(addedOrder)
    return  addedOrder
  }
