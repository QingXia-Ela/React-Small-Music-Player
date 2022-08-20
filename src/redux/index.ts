import { createStore, applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import BG from './modules/layouts/bg/reducer';
import MusicPlayer from './modules/musicPlayer/reducer';
import Login from './modules/Login/reducer';
import Weather from './modules/Weather/reducer';
import SongList from './modules/SongList/reducer';

const combineReducer = combineReducers({
  BG,
  MusicPlayer,
  Login,
  Weather,
  SongList,
});

import reduxThunk from 'redux-thunk';

export default configureStore({
  reducer: combineReducer,
  middleware: [reduxThunk],
  devTools: true,
});
