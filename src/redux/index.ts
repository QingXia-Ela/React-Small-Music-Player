import { createStore, applyMiddleware, combineReducers } from 'redux';

import BG from './modules/layouts/bg/reducer';

const combineReducer = combineReducers({
  BG,
});

import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  combineReducer,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);
