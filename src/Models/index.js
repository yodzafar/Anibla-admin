import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
import {authReducer} from "./auth";
import {categoryReducer} from "./category";


export default (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  category: categoryReducer
})
