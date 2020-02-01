import HouseService from '../services/HouseService';


export function filterHouses(filter) {
  console.log(filter)
  return async (dispatch) => {
    dispatch(_setFilter(filter))
    // for json-server:
    let houses = await HouseService.query(filter);
    // for real server:
    // const houses = await HouseService.getHouses();
    dispatch(_setHouses(houses))
  }
}
export function getBestByCountry(filter) {

  console.log(filter)
  return async (dispatch) => {    
    let houses = await HouseService.query(filter);
    console.log(houses)   
    dispatch(_setBestByCountry(filter.countries[0],houses))
    // dispatch(_setBestByCountry(filter.location.toUpperCase(),houses))
  }
}

export function AddToFavorites(ids) {
  if (ids.length > 0) {
    return async dispatch => {
      try {        
        const favHouses = await HouseService.query({ favorites: ids })        
        dispatch(_AddToFavs(favHouses))
      }
      catch (err) {
        console.log(err)
      }
    }
  } else {
    return dispatch => {
      dispatch(_AddToFavs([])) 
    }
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

function _setBestByCountry(country,houses) {
  return {    
    type: `SET_BEST_${country.toUpperCase()}`,
    houses
  }
}

function _AddToFavs(houses) {
  return {
    type: 'SET_FAVS',
    houses
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