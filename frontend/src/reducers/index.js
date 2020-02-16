import { combineReducers } from 'redux';
import HouseReducer from './HouseReducer'
import UserReducer from './UserReducer'
import SystemReducer from './SystemReducer';
import OrderReducer from './OrderReducer';
import SocketReducer from './SocketReducer';
const rootReducer = combineReducers({
  house: HouseReducer,
  system: SystemReducer,
  user: UserReducer,
  order:OrderReducer,
  socket:SocketReducer
})

export default rootReducer;