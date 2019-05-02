import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import { sendEvent } from '../../utils/ga';

export const CHANGE_LOADING             = 'SINGLEUSER/CHANGE_LOADING';
export const changeLoading              = makeActionCreator(CHANGE_LOADING, 'target', 'isLoading');
export const CHANGE_DISPLAY             = 'SINGLEUSER/CHANGE_DISPLAY';
export const changeDisplay              = makeActionCreator(CHANGE_DISPLAY, 'display');
export const CLEAR_MEDIAS               = 'SINGLEUSER/CLEAR_MEDIAS';
export const clearMedias                = makeActionCreator(CLEAR_MEDIAS);

export const FCH_MEDIAS_DONE            = 'SINGLEUSER/FCH_MEDIAS_DONE';
export const fchMediasDone              = makeActionCreator(FCH_MEDIAS_DONE, 'medias');

export const GET_USER_DONE              = 'SINGLEUSER/GET_USER_DONE';
export const getUserDone                = makeActionCreator(GET_USER_DONE, 'user');


export const getUser = (id) => dispatch => {
  const endpoint = `/api/users/${id}`

  axios(endpoint)
    .then(_ => {
      dispatch( getUserDone(_.data.Item) )
    })
}

export const fchMedias = (id, from) => dispatch => {
  const limit = 15;

  sendEvent({ action: 'view_item_list', value: limit, label: 'medias', category: 'engagement' });

  const endpoint = from
    ? `/api/users/${id}/medias?limit=${limit}&from=${from}`
    : `/api/users/${id}/medias?limit=${limit}`

  axios(endpoint)
    .then(_ => {
      dispatch( fchMediasDone(_.data.Items) )
    })
}
