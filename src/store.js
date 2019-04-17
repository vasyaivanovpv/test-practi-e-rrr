import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { combineReducers } from 'redux';

import loginReducer from 'modules/login';
import profileReducer from 'modules/profile';
import newsReducer from 'modules/news';

const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  news: newsReducer,
});

const middleware = [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
