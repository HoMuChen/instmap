import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import { sendEvent } from '../../utils/ga';

export const CHANGE_LOADING             = 'LOCATION/CHANGE_LOADING';
export const changeLoading              = makeActionCreator(CHANGE_LOADING, 'target', 'isLoading');
export const CHANGE_DISPLAY             = 'LOCATION/CHANGE_DISPLAY';
export const changeDisplay              = makeActionCreator(CHANGE_DISPLAY, 'display');
export const CLEAR_MEDIAS               = 'LOCATION/CLEAR_MEDIAS';
export const clearMedias                = makeActionCreator(CLEAR_MEDIAS);

export const FCH_MEDIAS_DONE            = 'LOCATION/FCH_MEDIAS_DONE';
export const fchMediasDone              = makeActionCreator(FCH_MEDIAS_DONE, 'medias');

export const GET_LOCATION_DONE          = 'LOCATION/GET_LOCATION_DONE';
export const getLocationDone            = makeActionCreator(GET_LOCATION_DONE, 'location');


export const getLocation = (id) => dispatch => {
  const endpoint = `/api/locations/${id}`

  axios(endpoint)
    .then(_ => {
      dispatch( getLocationDone(_.data.Item) )
    })
}

export const fchMedias = (id, from) => dispatch => {
  const limit = 15;

  sendEvent({ action: 'view_item_list', value: limit, label: 'medias', category: 'engagement' });

  const endpoint = from
    ? `/api/locations/${id}/medias?limit=${limit}&from=${from}`
    : `/api/locations/${id}/medias?limit=${limit}`

  axios(endpoint)
    .then(_ => {
      dispatch( fchMediasDone(_.data.Items) )
    })
}
