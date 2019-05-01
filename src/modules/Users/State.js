import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as __ from './Actions';

const usersInitState = Immutable.OrderedMap()
const users = (_=usersInitState, action) => {
  switch(action.type) {
    case __.FCH_USERS_DONE:
      return _.merge(
               Immutable.fromJS(action.users)
                 .map(loc => Immutable.OrderedMap().set(loc.get('id'), loc))
                 .reduce((pre, cur) => pre.merge(cur), Immutable.OrderedMap())
             );
    case __.CHANGE_FANS_RANGE:
      return Immutable.OrderedMap();
    default:
      return _;
  }
}

const configtInitState = Immutable.fromJS({
  isLoading: false,
  hasNextPage: true,
  lastEvaluated: 100000,
  range: [ 1000, 100000 ],
})
const config = (_=configtInitState, action) => {
  switch(action.type) {
    case __.FCH_USERS_DONE:
      if (action.users.length === 0) {
        return _.set('isLoading', false)
                .set('hasNextPage', false);
      }
      return _.set('isLoading', false)
              .set('lastEvaluated', action.users[action.users.length -1]['fans_count']);
    case __.CHANGE_LOADING:
      return _.set('isLoading', action.isLoading);
    case __.CHANGE_FANS_RANGE:
      return _.set('range', Immutable.List(action.range))
              .set('hasNextPage', true)
              .set('lastEvaluated', action.range[1]);
    default:
      return _;
  }
}

export const usersReducer = combineReducers({
  users,
  config,
})
