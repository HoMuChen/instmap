import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as __ from './Actions';

const userInitState = Immutable.Map()
const user = (_=userInitState, action) => {
  switch(action.type) {
    case __.GET_USER_DONE:
      return Immutable.fromJS(action.user)
    default:
      return _;
  }
}

const mediasInitState = Immutable.OrderedMap();
const medias = (_=mediasInitState, action) => {
  switch(action.type) {
    case __.FCH_MEDIAS_DONE:
      return _.merge(
               Immutable.fromJS(action.medias)
                 .map(media => Immutable.OrderedMap().set(media.get('url'), media))
                 .reduce((pre, cur) => pre.merge(cur), Immutable.OrderedMap())
             );
    case __.CLEAR_MEDIAS:
      return mediasInitState;
    default:
      return _;
  }
}


const configInitState = Immutable.fromJS({
  isLoading: {
    user: false,
    media: false,
  },
  from: Math.floor( Date.now()/1000 ),
  hasNextPage: true,
  display: 0
});
const config = (_=configInitState, action) => {
  switch(action.type) {
    case __.CHANGE_LOADING:
      return _.setIn(['isLoading', action.target], action.isLoading);
    case __.GET_USER_DONE:
      return _.setIn(['isLoading', 'user'], false);
    case __.FCH_MEDIAS_DONE:
      return _.setIn(['isLoading', 'media'], false)
              .set('hasNextPage', action.medias.length !== 0)
              .set(
                'from',
                action.medias.length === 0
                  ? 0
                  : action.medias[action.medias.length - 1]['tm']
              )
    case __.CLEAR_MEDIAS:
      return configInitState;
    case __.CHANGE_DISPLAY:
      return _.set('display', action.display);
    default:
      return _;
  }
}

export const singleUserReducer = combineReducers({
  user,
  medias,
  config,
})
