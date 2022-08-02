import { createStore, applyMiddleware, combineReducers } from 'redux';

import BG from './modules/layouts/bg/reducer';
import MusicPlayer from './modules/musicPlayer/reducer';
import Login from './modules/Login/reducer';

const combineReducer = combineReducers({
  BG,
  MusicPlayer,
  Login,
});

import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  combineReducer,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);
