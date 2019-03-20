import axios from 'axios';

import makeActionCreator from '../../utils/ActionHelpers';

export const CHANGE_LOADING             = 'NEAR/CHANGE_LOADING';
export const CHANGE_CENTER              = 'NEAR/CHANGE_CENTER';
export const CHANGE_ZOOM                = 'NEAR/CHANGE_ZOOM';
export const CHANGE_FOCUSED_LOCATION    = 'NEAR/CHANGE_FOCUSED_LOCATION';
export const CHANGE_FOCUSED_INDEX       = 'NEAR/CHANGE_FOCUSED_INDEX';

export const changeLoading              = makeActionCreator(CHANGE_LOADING, 'isLoading');
export const changeCenter               = makeActionCreator(CHANGE_CENTER, 'center');
export const changeZoom                 = makeActionCreator(CHANGE_ZOOM, 'zoom');
export const changeFocusedLocation      = makeActionCreator(CHANGE_FOCUSED_LOCATION, 'location_id');
export const changeFocusedIndex         = makeActionCreator(CHANGE_FOCUSED_INDEX, 'index', 'locations');


export const FCH_LOCATIONS_DONE         = 'NEAR/FCH_LOCATIONS_DONE';
export const fchLocationsDone           = makeActionCreator(FCH_LOCATIONS_DONE, 'locations');

export const fchLocations = (lat, lng, distance, limit, page) =>
  dispatch => {
    axios(`/api/locations/near?lat=${lat}&lng=${lng}&distance=${distance}&limit=${limit}&page=${page}`)
      .then(_ => dispatch( fchLocationsDone(_.data) ));
  }
