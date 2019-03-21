import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';
import { sendEvent } from '../../utils/ga';

export const CHANGE_LOADING             = 'HOME/CHANGE_LOADING';

export const FCH_LOCATIONS_DONE         = 'HOME/FCH_LOCATIONS_DONE';



export const changeLoading              = makeActionCreator(CHANGE_LOADING, 'isLoading');
export const fchLocationsDone           = makeActionCreator(FCH_LOCATIONS_DONE, 'locations');

export const fchLocations = (limit, from) => dispatch => {
  sendEvent({ action: 'view_item_list', value: limit, label: 'locations', category: 'engagement' })

  const endpoint = from
    ? `/api/locations?limit=${limit}&from=${from}`
    : `/api/locations?limit=${limit}`

  axios(endpoint)
    .then(_ => {
      dispatch( fchLocationsDone(_.data.Items) )
    })
}
