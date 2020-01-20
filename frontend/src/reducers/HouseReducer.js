const initialState = {
  houses: [],
  filterBy: { numOfperson: 1, location: '' },
  selectedHouse: null
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_HOUSES':
      console.log("set houses")
      console.log(action.houses)
      return { ...state, houses: action.houses };
    case 'SET_FILTER':
      console.log('set filter', action.filter)
      // let newFilter={...state.filterBy}
      // newFilter=action.filter
      return { ...state, filterBy: { ...state.filterBy, ...action.filter } };
    case 'HOUSE_ADD':
      return { ...state, houses: [...state.houses, action.house] };
    case 'HOUSE_REMOVE':
      return { ...state, houses: state.houses.filter(house => house._id !== action.houseId) }
    case 'REVIEW_UPDATE':
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review._id === action.review._id ? action.review : review
        )
      };
    default:
      return state;
  }
}
