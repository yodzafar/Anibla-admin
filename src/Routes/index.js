import {CategoryList, CategoryAdd, CategoryEdit} from '../Views/Category'
import Generic from '../Views/Generic'
import {GenreAdd, GenreEdit, GenreList} from "../Views/Genre";
import {URL_TITLE, ROUTE_URL} from "../Constants/url";
import {StuffAdd, StuffEdit, StuffList} from "../Views/Stuff";
import {TrailerAdd, TrailerEdit, TrailerList} from "../Views/Trailer";
import {ProductAdd, ProductEdit, ProductList} from "../Views/Product";

import LayersOutlineIcon from 'mdi-react/LayersOutlineIcon'
import FilmIcon from "mdi-react/FilmIcon";
import ViewCarouselOutlineIcon from "mdi-react/ViewCarouselOutlineIcon";
import FormatListBulletedSquareIcon from "mdi-react/FormatListBulletedSquareIcon";
import AccountGroupOutlineIcon from "mdi-react/AccountGroupOutlineIcon";
import FilmstripBoxMultipleIcon from "mdi-react/FilmstripBoxMultipleIcon";

const category = [
  {
    id: 'categoryList',
    title: URL_TITLE.CATEGORY.TITLE_PLURAL,
    path: ROUTE_URL.CATEGORY.LIST,
    icon: FormatListBulletedSquareIcon,
    component: CategoryList,
  },
  {
    id: 'categoryAdd',
    title: URL_TITLE.CATEGORY.TITLE_ADD,
    path: ROUTE_URL.CATEGORY.ADD,
    icon: LayersOutlineIcon,
    component: CategoryAdd,
    hidden: true
  },
  {
    id: 'categoryEdit',
    title: URL_TITLE.CATEGORY.TITLE_EDIT,
    path: `${ROUTE_URL.CATEGORY.EDIT}/:editID`,
    icon: LayersOutlineIcon,
    component: CategoryEdit,
    hidden: true
  },
]

const genre = [
  {
    id: 'genreList',
    title: URL_TITLE.GENRE.TITLE_PLURAL,
    path: ROUTE_URL.GENRE.LIST,
    icon: ViewCarouselOutlineIcon,
    component: GenreList,
  },
  {
    id: 'genreAdd',
    title: URL_TITLE.GENRE.TITLE_ADD,
    path: ROUTE_URL.GENRE.ADD,
    icon: LayersOutlineIcon,
    component: GenreAdd,
    hidden: true
  },
  {
    id: 'genreEdit',
    title: URL_TITLE.GENRE.TITLE_EDIT,
    path: `${ROUTE_URL.GENRE.EDIT}/editID`,
    icon: LayersOutlineIcon,
    component: GenreEdit,
    hidden: true
  },
]

const stuff = [
  {
    id: 'stuffList',
    title: URL_TITLE.STUFF.TITLE_PLURAL,
    path: ROUTE_URL.STUFF.LIST,
    icon: AccountGroupOutlineIcon,
    component: StuffList,
  },
  {
    id: 'stuffAdd',
    title: URL_TITLE.STUFF.TITLE_ADD,
    path: ROUTE_URL.STUFF.ADD,
    icon: LayersOutlineIcon,
    component: StuffAdd,
    hidden: true
  },
  {
    id: 'stuffEdit',
    title: URL_TITLE.STUFF.TITLE_EDIT,
    path: `${ROUTE_URL.STUFF.EDIT}/editID`,
    icon: LayersOutlineIcon,
    component: StuffEdit,
    hidden: true
  },
]

const trailer = [
  {
    id: 'trailerList',
    title: URL_TITLE.TRAILER.TITLE_PLURAL,
    path: ROUTE_URL.TRAILER.LIST,
    icon: FilmstripBoxMultipleIcon,
    component: TrailerList,
  },
  {
    id: 'trailerAdd',
    title: URL_TITLE.TRAILER.TITLE_ADD,
    path: ROUTE_URL.TRAILER.ADD,
    icon: LayersOutlineIcon,
    component: TrailerAdd,
    hidden: true
  },
  {
    id: 'trailerEdit',
    title: URL_TITLE.TRAILER.TITLE_EDIT,
    path: `${ROUTE_URL.TRAILER.EDIT}/editID`,
    icon: LayersOutlineIcon,
    component: TrailerEdit,
    hidden: true
  },
]

const product = [
  {
    id: 'productList',
    title: URL_TITLE.PRODUCT.TITLE_PLURAL,
    path: ROUTE_URL.PRODUCT.LIST,
    icon: FilmIcon,
    component: ProductList,
  },
  {
    id: 'productAdd',
    title: URL_TITLE.STUFF.TITLE_ADD,
    path: ROUTE_URL.PRODUCT.ADD,
    icon: LayersOutlineIcon,
    component: ProductAdd,
    hidden: true
  },
  {
    id: 'productEdit',
    title: URL_TITLE.PRODUCT.TITLE_EDIT,
    path: `${ROUTE_URL.PRODUCT.EDIT}/editID`,
    icon: LayersOutlineIcon,
    component: ProductEdit,
    hidden: true
  },
]

export default [
  ...category,
  ...genre,
  ...trailer,
  ...stuff,
  ...product,
  {
    id: 'generic',
    title: 'Generic',
    path: '/generic',
    icon: LayersOutlineIcon,
    component: Generic
  }
]