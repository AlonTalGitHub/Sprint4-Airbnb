import { combineReducers } from 'redux';
import HouseReducer from './HouseReducer'
import UserReducer from './UserReducer'
import SystemReducer from './SystemReducer';

const rootReducer = combineReducers({
  house: HouseReducer,
  system: SystemReducer,
  user: UserReducer
})

export default rootReducer;