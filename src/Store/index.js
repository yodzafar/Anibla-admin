import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history'
import createRootReducer from '../Models'

export const history = createBrowserHistory()
const middlewares = [thunk, routerMiddleware(history)];

export default createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middlewares))
);
