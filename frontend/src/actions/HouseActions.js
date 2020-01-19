import HouseService from '../services/HouseService';

export function loadHouses(filter) {
  console.log('load houses', filter)
  return async dispatch => {
    try {
      const houses = await HouseService.query(filter);
      console.log(houses)
      dispatch(setHouses(houses));
      
    } catch (err) {
      console.log('HouseActions: err in loadHouses', err);
    }
  };
}

export function filterHouses(filter) {
    return async (dispatch) => {
      dispatch(_setFilter(filter))
      const houses = await HouseService.query(filter);
      dispatch(setHouses(houses))
    }
}

export function setFilter(filter) {
  return dispatch => {
    dispatch(_setFilter(filter));

  };
}

export function addHouse(house){
  return async dispatch => {
    try {
      const addedHouse = await HouseService.add(house);
      console.log('action add house',addedHouse)
      dispatch(_addHouse(addedHouse));

    } catch (err) {
      console.log('HouseActions: err in addHouse', err);
    }
  };
}

// export function addReview(review) {
//   return async dispatch => {
//     try {
//       const addedReview = await ReviewService.add(review);
//       dispatch(_addReview(addedReview));
//     } catch (err) {
//       console.log('ReviewActions: err in addReview', err);
//     }
//   };
// }

function setHouses(houses) {
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
