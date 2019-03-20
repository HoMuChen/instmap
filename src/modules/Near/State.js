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
             ).sortBy(doc => doc.get('dist'));
    case __.CHANGE_CENTER:
      return Immutable.OrderedMap();
    default:
      return _;
  }
}

const configtInitState = Immutable.fromJS({
  center: {
    lat: 25.0419115,
    lng: 121.5317922,
  },
  zoom: 15,
  isLoading: false,
  distance: 1000,
  limit: 10,
  page: 0,
  hasNextPage: true,
  focusedLocation: '',
  focusedIndex: 0,
})
const config = (_=configtInitState, action) => {
  switch(action.type) {
    case __.FCH_LOCATIONS_DONE:
      return _.set('isLoading', false)
              .set(
                'lastDistance',
                action.locations.length === 0
                  ? 0
                  : action.locations[action.locations.length - 1]['dist']
              )
              .set('hasNextPage', action.locations.length !== 0)
              .update('page', pre => pre+1)
    case __.CHANGE_LOADING:
      return _.set('isLoading', action.isLoading);
    case __.CHANGE_CENTER:
      return _.set('center', Immutable.fromJS(action.center))
              .set('hasNextPage', true)
              .set('page', 0)
    case __.CHANGE_ZOOM:
      return _.set('zoom', action.zoom);
    case __.CHANGE_FOCUSED_LOCATION:
      return _.set('focusedLocation', action.location_id);
    case __.CHANGE_FOCUSED_INDEX:
      return _.get('focusedIndex') === action.index
        ? _
        : _.set('focusedIndex', action.index)
           .set('focusedLocation', action.locations.getIn([action.index, 'id']));
    default:
      return _;
  }
}

export const nearReducer = combineReducers({
  locations,
  config,
})
