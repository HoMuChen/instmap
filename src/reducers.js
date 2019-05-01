import { combineReducers } from 'redux-immutable';

import { homeReducer } from './modules/Home/State';
import { nearReducer } from './modules/Near/State';
import { locationReducer } from './modules/Location/State';
import { usersReducer } from './modules/Users/State';
import { singleUserReducer } from './modules/SingleUser/State';

const Reducers = combineReducers({
  home:          homeReducer,
  near:          nearReducer,
  location:      locationReducer,
  users:         usersReducer,
  singleUser:    singleUserReducer,
})

export default Reducers;
