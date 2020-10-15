import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
import {authReducer} from "./auth";
import {categoryReducer} from "./category";
import {genreReducer} from './genre'
import {memberReducer} from "./member";
import {siteReducer} from "./site";


export default (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  category: categoryReducer,
  genre: genreReducer,
  member: memberReducer,
  site: siteReducer
})
