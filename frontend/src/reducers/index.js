import { combineReducers } from 'redux';
import HouseReducer from './HouseReducer'
import ReviewReducer from './ReviewReducer'
import UserReducer from './UserReducer'
import SystemReducer from './SystemReducer';

const rootReducer = combineReducers({
  house: HouseReducer,
  review: ReviewReducer,
  system: SystemReducer,
  user: UserReducer
})

export default rootReducer;