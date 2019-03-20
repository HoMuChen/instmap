import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as __ from './Actions';

const locationsInitState = Immutable.OrderedMap()
const locations = (_=locationsInitState, action) => {
  switch(action.type) {
    case __.FCH_LOCATIONS_DONE:
      return _.merge(
               Immutable.fromJS(action.locations)
                 .map(loc => Immutable.OrderedMap().set(loc.get('id'), loc))
                 .reduce((pre, cur) => pre.merge(cur), Immutable.OrderedMap())
             );
    default:
      return _;
  }
}

const configtInitState = Immutable.Map({
  isLoading: false,
  lastEvaluated: 5000000,
})
const config = (_=configtInitState, action) => {
  switch(action.type) {
    case __.FCH_LOCATIONS_DONE:
      return _.set('isLoading', false)
              .set('lastEvaluated', action.locations[action.locations.length -1]['media_count']);
    case __.CHANGE_LOADING:
      return _.set('isLoading', action.isLoading);
    default:
      return _;
  }
}

export const homeReducer = combineReducers({
  locations,
  config,
})
