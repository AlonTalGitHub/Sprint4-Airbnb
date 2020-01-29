import OrderService from '../services/OrderService.js';

export function loadOrders(filter) {
  console.log('load orders', filter)
  return async dispatch => {
    try {
      const orders = await OrderService.query(filter);
      console.log(orders)
      dispatch(setOrders(orders));

    } catch (err) {
      console.log('OrderActions: err in loadOrders', err);
    }
  };
}

export function filterOrders(filter) {
  return async (dispatch) => {
    dispatch(_setFilter(filter))
    const orders = await OrderService.query(filter);
    dispatch(setOrders(orders))
  }
}

export function setFilter(filter) {
  return dispatch => {
    dispatch(_setFilter(filter));

  };
}


export function deleteOrder(orderId) {
  return async (dispatch) => {
    try {
      await OrderService.remove(orderId)
      console.log('order delete action')
      dispatch(_deleteOrder(orderId))
    }
    catch (err) {
      console.log(err)
    }

  }
}
export function saveOrder(order) {
    return async dispatch => {
      try {
        const addedOrder = await OrderService.save(order);
        console.log('action add order', addedOrder)
        order._id ? dispatch(_updateOrder(addedOrder)) : dispatch(_addOrder(addedOrder));
      } catch (err) {
        console.log('OrderActions: err in addOrder', err);
      }
    };
  }


function setOrders(orders) {
  return {
    type: 'SET_ORDERS',
    orders
  };
}
function _setFilter(filter) {
  return {
    type: 'SET_FILTER',
    filter
  };
}

function _updateOrder(order) {
  return {
    type: 'ORDER_UPDATE',
    order
  };

}

function _deleteOrder(orderId) {
  return {
    type: 'ORDER_REMOVE',
    orderId
  };
}
function _addOrder(order) {
    return {
      type: 'ORDER_ADD',
      order
    };
  }
  


// export function saveOrder(order) {
//     return async dispatch => {
//       try {
//         const addedOrder = await UserService.save_order(order);
//         console.log('new added order', addedOrder)
//       //   order._id ? dispatch(_updateOrder(addedOrder)) : dispatch(_addOrder(addedOrder));
//       dispatch(_addOrder(addedOrder))
//       } catch (err) {
//         console.log('OrderActions: err in addOrder', err);
//       }
//     };
//   }

  
// function _addOrder(order) {
//     return {
//       type: 'ORDER_ADD',
//       order
//     };
//   }