import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Reducers from './reducers';

const __DEV__ = process.env.NODE_ENV === 'development';
const store = __DEV__
  ?  createStore(
       Reducers,
       composeWithDevTools(applyMiddleware(thunkMiddleware)),
     )
  :  createStore(
       Reducers,
       applyMiddleware(thunkMiddleware),
     )

export default store;
