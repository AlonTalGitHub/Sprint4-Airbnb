const initialState = {
  orders: [],
  selectedOrder: null
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_ORDERS':
      return { ...state, orders: action.orders };
    case 'ORDER_ADD':
      return { ...state, orders: [...state.orders, action.order] };
    case 'ORDER_UPDATE':
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.order._id ? action.order : order
        )};
    default:
      return state;
  }
}
 // 'SET_ORDERS','SET_FILTER','ORDER_UPDATE','ORDER_REMOVE','ORDER_ADD',