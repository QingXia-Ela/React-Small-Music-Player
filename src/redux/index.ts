import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import BG from './modules/layouts/bg/reducer';
import MusicPlayer from './modules/musicPlayer/reducer';
import Login from './modules/Login/reducer';
import Weather from './modules/Weather/reducer';
import SongList from './modules/SongList/reducer';
import AudioContext from './modules/AudioContext/reducer';
import pageInit from './modules/pageInit/reducer';

import { CHANGEDETAILSONGLIST } from './constant';

const combineReducer = combineReducers({
  BG,
  MusicPlayer,
  Login,
  Weather,
  SongList,
  AudioContext,
  pageInit,
});

/* eslint-disable no-underscore-dangle */
const middleware = [reduxThunk];
const actionSanitizer = (action: any) => {
  let newAction = { ...action };

  switch (action.type) {
    case CHANGEDETAILSONGLIST:
      newAction.data = 'LONG_DATA';
      break;

    default:
      break;
  }

  return newAction;
};

const composeEnhancers = composeWithDevTools({
  actionSanitizer,
  stateSanitizer: (state) => {
    let newState: any = {
      ...state,
    };
    newState.AudioContext = 'audioCtx';
    return newState;
  },
  traceLimit: 2,
});

const enhancers = composeEnhancers(applyMiddleware(...middleware));

export default createStore(combineReducer, enhancers);

/* eslint-enable */
