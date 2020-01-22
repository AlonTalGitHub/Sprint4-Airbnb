import UserService from '../services/UserService.js';

// export function loadHouses(filter) {
//   console.log('load houses', filter)
//   return async dispatch => {
//     try {
//       const houses = await HouseService.query(filter);
//       console.log(houses)
//       dispatch(setHouses(houses));

//     } catch (err) {
//       console.log('HouseActions: err in loadHouses', err);
//     }
//   };
// }

// export function filterHouses(filter) {
//   return async (dispatch) => {
//     dispatch(_setFilter(filter))
//     const houses = await HouseService.query(filter);
//     dispatch(setHouses(houses))
//   }
// }

// export function setFilter(filter) {
//   return dispatch => {
//     dispatch(_setFilter(filter));

//   };
// }

export function saveOrder(order) {
  return async dispatch => {
    try {
      const addedOrder = await UserService.save_order(order);
      console.log('new added order', addedOrder)
    //   house._id ? dispatch(_updateHouse(addedHouse)) : dispatch(_addHouse(addedHouse));
    dispatch(_addOrder(addedOrder))
    } catch (err) {
      console.log('HouseActions: err in addHouse', err);
    }
  };
}

// export function deleteHouse(houseId) {
//   return async (dispatch) => {
//     try {
//       await HouseService.remove(houseId)
//       console.log('house delete action')
//       dispatch(_deleteHouse(houseId))
//     }
//     catch (err) {
//       console.log(err)
//     }

//   }
// }

// function setHouses(houses) {
//   return {
//     type: 'SET_HOUSES',
//     houses
//   };
// }
// function _setFilter(filter) {
//   return {
//     type: 'SET_FILTER',
//     filter
//   };
// }

function _addOrder(order) {
  return {
    type: 'ORDER_ADD',
    order
  };
}

// function _updateHouse(house) {
//   return {
//     type: 'HOUSE_UPDATE',
//     house
//   };

// }

// function _deleteHouse(houseId) {
//   return {
//     type: 'HOUSE_REMOVE',
//     houseId
//   };
// }
