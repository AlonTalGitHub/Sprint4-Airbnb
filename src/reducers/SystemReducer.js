const initialState = {
  isLoading: false,
  currRoute: null
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'LOADING_START':
      return { ...state, isLoading: true };
    case 'LOADING_DONE':
      return { ...state, isLoading: false };
    case 'UPDATE_ROUTE':
      console.log('system reducer here: route is : ', action.route)
      return { ...state, currRoute: action.route }
    default: return state;
  }
}
