import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';
import logger from 'redux-logger';

export default function configureStore(initialState = {}) {
  return createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, logger),
  );
}
