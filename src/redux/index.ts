import { createStore, applyMiddleware, combineReducers } from 'redux';

import BG from './modules/layouts/bg/reducer';
import MusicPlayer from './modules/musicPlayer/reducer';

const combineReducer = combineReducers({
  BG,
  MusicPlayer,
});

import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  combineReducer,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);
