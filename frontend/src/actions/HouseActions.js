import HouseService from '../services/HouseService';


export function filterHouses(filter) {
  console.log(filter)
  return async (dispatch) => {
    dispatch(_setFilter(filter))
    // const houses = await HouseService.query(filter);
    const houses = await HouseService.getHouses();
    dispatch(_setHouses(houses))
  }
}

export function setFilter(filter) {
  return dispatch => {
    dispatch(_setFilter(filter));
    
  };
}

export function saveHouse(house) {
  return async dispatch => {
    try {
      const addedHouse = await HouseService.save(house);
      console.log('action add house', addedHouse)
      house._id ? dispatch(_updateHouse(addedHouse)) : dispatch(_addHouse(addedHouse));
    } catch (err) {
      console.log('HouseActions: err in addHouse', err);
    }
  };
}

export function deleteHouse(houseId) {
  return async (dispatch) => {
    try {
      await HouseService.remove(houseId)
      console.log('house delete action')
      dispatch(_deleteHouse(houseId))
    }
    catch (err) {
      console.log(err)
    }
    
  }
}

        
function _setHouses(houses) {
  return {
    type: 'SET_HOUSES',
    houses
  };
}
function _setFilter(filter) {
  return {
    type: 'SET_FILTER',
    filter
  };
}

function _addHouse(house) {
  return {
    type: 'HOUSE_ADD',
    house
  };
}

function _updateHouse(house) {
  return {
    type: 'HOUSE_UPDATE',
    house
  };
  
}

function _deleteHouse(houseId) {
  return {
    type: 'HOUSE_REMOVE',
    houseId
  };
}

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