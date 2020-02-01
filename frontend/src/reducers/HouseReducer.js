const initialState = {
  houses: [],
  favorites: [],
  israel:[],
  italy:[],
  spain:[],
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
      console.log('add', action.house)
      return { ...state, houses: [...state.houses, action.house] };
    case 'HOUSE_UPDATE':
      console.log('update', action.house)
      return {
        ...state, houses: state.houses.map(house =>
          house._id === action.house._id ? action.house : house)
      };
    case 'HOUSE_REMOVE':
      return { ...state, houses: state.houses.filter(house => house._id !== action.houseId) }
    case 'SET_FAVS':
      return { ...state, favorites: action.houses }
    case 'SET_BEST_ISRAEL':
      console.log('israelllll', action.houses)
      return { ...state, israel: action.houses }
    case 'SET_BEST_ITALY':
      console.log('italyyy', action.houses)
      return { ...state, italy: action.houses }
    case 'SET_BEST_SPAIN':
      console.log('spainnnn', action.houses)
      return { ...state, spain: action.houses }
    default:
      return state;
  }
}
