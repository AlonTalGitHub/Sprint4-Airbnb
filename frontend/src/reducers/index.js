import { combineReducers } from 'redux';
import HouseReducer from './HouseReducer'
import ReviewReducer from './ReviewReducer'
import UserReducer from './UserReducer'
import SystemReducer from './SystemReducer';
import OrderReducer from './OrderReducer';
const rootReducer = combineReducers({
  house: HouseReducer,
  review: ReviewReducer,
  system: SystemReducer,
  user: UserReducer,
  order:OrderReducer
})

export default rootReducer;