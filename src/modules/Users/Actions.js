import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import { sendEvent } from '../../utils/ga';

export const CHANGE_LOADING             = 'USERS/CHANGE_LOADING';
export const CHANGE_FANS_RANGE          = 'USERS/CHANGE_FANS_RANGE';

export const FCH_USERS_DONE             = 'USERS/FCH_USERS_DONE';


export const changeLoading              = makeActionCreator(CHANGE_LOADING, 'isLoading');
export const changeFansRange            = makeActionCreator(CHANGE_FANS_RANGE, 'range');
export const fchUsersDone               = makeActionCreator(FCH_USERS_DONE, 'users');

export const fchUsers = (limit, from) => dispatch => {
  sendEvent({ action: 'view_item_list', value: limit, label: 'users', category: 'engagement' })

  const endpoint = from
    ? `/api/users?limit=${limit}&from=${from}`
    : `/api/users?limit=${limit}`

  axios(endpoint)
    .then(_ => {
      dispatch( fchUsersDone(_.data.Items) )
    })
}
