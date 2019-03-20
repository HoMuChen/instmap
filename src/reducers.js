import { combineReducers } from 'redux-immutable';

import { homeReducer } from './modules/Home/State';
import { nearReducer } from './modules/Near/State';
import { locationReducer } from './modules/Location/State';

const Reducers = combineReducers({
  home:          homeReducer,
  near:          nearReducer,
  location:      locationReducer,
})

export default Reducers;
