import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
import { authReducer } from './auth';
import { categoryReducer } from './category';
import { genreReducer } from './genre'
import { memberReducer } from './member';
import { appReducer } from './app';
import { productReducer } from './product';
import {sliderReducer} from "./slider";
import {newsReducer} from "./news";
import {annotationReducer} from "./annotation";

export default (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  category: categoryReducer,
  genre: genreReducer,
  member: memberReducer,
  app: appReducer,
  product: productReducer,
  slider: sliderReducer,
  news: newsReducer,
  annotation: annotationReducer
})
