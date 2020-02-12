const initialState = {
  houses: [],
  favorites: [],
  israel:[],
  italy:[],
  spain:[],
  myHouses:[],
  filterBy: { numOfperson: 1, location: '', price:1000},
  selectedHouse: null
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_HOUSES':      
      return { ...state, houses: action.houses };
    case 'SET_FILTER':      
      return { ...state, filterBy: { ...state.filterBy, ...action.filter } };
    case 'HOUSE_ADD':      
      return { ...state, houses: [...state.houses, action.house] };
    case 'HOUSE_UPDATE':      
      return {
        ...state, houses: state.houses.map(house =>
          house._id === action.house._id ? action.house : house)
      };
    case 'HOUSE_ADD_REVIEW':      
      return {
        ...state, houses: state.houses.map(house => {
          if (house._id !== action.house._id) {
            return house
          }
          const reviews = house.reviews
          let reviewsToUpdate = reviews.slice()
          reviewsToUpdate.splice(reviews.length, 0, action.review)
          const houseToUpdate = { ...house, reviews: reviewsToUpdate }

          return houseToUpdate
      })
    }
    case 'HOUSE_REMOVE':
      return { ...state, houses: state.houses.filter(house => house._id !== action.houseId) }
    case 'SET_FAVS':
      return { ...state, favorites: action.houses }
    case 'SET_BEST_ISRAEL':      
      return { ...state, israel: action.houses }
    case 'SET_BEST_ITALY':      
      return { ...state, italy: action.houses }
    case 'SET_BEST_SPAIN':      
      return { ...state, spain: action.houses }
    case 'SET_MY_HOUSES':      
      return { ...state, myHouses: action.houses}
    default:
      return state;
  }
}
