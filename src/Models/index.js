import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
import {authReducer} from "./auth";
import {categoryReducer} from "./category";
import {genreReducer} from './genre'


export default (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  category: categoryReducer,
  genre: genreReducer
})
