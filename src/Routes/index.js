import {CategoryList} from '../Views/Category'
import {GenreList} from "../Views/Genre";
import {URL_TITLE, ROUTE_URL} from "../Constants/url";
import {MemberList} from "../Views/Memeber";
import {TrailerList} from "../Views/Trailer";
import {ProductList} from "../Views/Product";

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
]

const genre = [
  {
    id: 'genreList',
    title: URL_TITLE.GENRE.TITLE_PLURAL,
    path: ROUTE_URL.GENRE.LIST,
    icon: ViewCarouselOutlineIcon,
    component: GenreList,
  }
]

const member = [
  {
    id: 'stuffList',
    title: URL_TITLE.MEMBER.TITLE_PLURAL,
    path: ROUTE_URL.MEMBER.LIST,
    icon: AccountGroupOutlineIcon,
    component: MemberList,
  }
]

const trailer = [
  {
    id: 'trailerList',
    title: URL_TITLE.TRAILER.TITLE_PLURAL,
    path: ROUTE_URL.TRAILER.LIST,
    icon: FilmstripBoxMultipleIcon,
    component: TrailerList,
  }
]

const product = [
  {
    id: 'productList',
    title: URL_TITLE.PRODUCT.TITLE_PLURAL,
    path: ROUTE_URL.PRODUCT.LIST,
    icon: FilmIcon,
    component: ProductList,
  }
]

export default [
  ...category,
  ...genre,
  ...trailer,
  ...member,
  ...product,
  // {
  //   id: 'generic',
  //   title: 'Generic',
  //   path: '/generic',
  //   icon: LayersOutlineIcon,
  //   component: Generic
  // }
]