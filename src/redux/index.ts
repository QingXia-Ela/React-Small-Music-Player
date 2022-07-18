import { createStore, applyMiddleware, combineReducers } from "redux"

import BGPath from './modules/layouts/bg/reducer'


const combineReducer = combineReducers({
  BGPath
})

import reduxThunk from 'redux-thunk'

import { composeWithDevTools } from "redux-devtools-extension"

export default createStore(combineReducer, composeWithDevTools(applyMiddleware(reduxThunk)))