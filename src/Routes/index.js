import FilmIcon from 'mdi-react/FilmIcon';
import ViewCarouselOutlineIcon from 'mdi-react/ViewCarouselOutlineIcon';
import FormatListBulletedSquareIcon from 'mdi-react/FormatListBulletedSquareIcon';
import AccountGroupOutlineIcon from 'mdi-react/AccountGroupOutlineIcon';
import FilmstripBoxMultipleIcon from 'mdi-react/FilmstripBoxMultipleIcon';
import FilmstripBoxIcon from 'mdi-react/FilmstripBoxIcon'
import { CategoryList } from '../Views/Category'
import { GenreList } from '../Views/Genre';
import { URL_TITLE, ROUTE_URL } from '../Constants/url';
import { MemberList } from '../Views/Memeber';
import { TrailerList } from '../Views/Trailer';
import { FilmList } from '../Views/Film';
import { SeasonList, SerialList, SeriyaList } from '../Views/Serial';

const category = [
  {
    id: 'categoryList',
    title: URL_TITLE.CATEGORY.TITLE_PLURAL,
    path: ROUTE_URL.CATEGORY.LIST,
    icon: FormatListBulletedSquareIcon,
    component: CategoryList
  }
]

const genre = [
  {
    id: 'genreList',
    title: URL_TITLE.GENRE.TITLE_PLURAL,
    path: ROUTE_URL.GENRE.LIST,
    icon: ViewCarouselOutlineIcon,
    component: GenreList
  }
]

const member = [
  {
    id: 'stuffList',
    title: URL_TITLE.MEMBER.TITLE_PLURAL,
    path: ROUTE_URL.MEMBER.LIST,
    icon: AccountGroupOutlineIcon,
    component: MemberList
  }
]

const trailer = [
  {
    id: 'trailerList',
    title: URL_TITLE.TRAILER.TITLE_PLURAL,
    path: ROUTE_URL.TRAILER.LIST,
    icon: FilmstripBoxMultipleIcon,
    component: TrailerList
  }
]

const film = [
  {
    id: 'filmList',
    title: URL_TITLE.FILM.TITLE_PLURAL,
    path: ROUTE_URL.FILM.LIST,
    icon: FilmstripBoxIcon,
    component: FilmList
  }
]

const serial = [
  {
    id: 'serialList',
    title: URL_TITLE.SERIAL.TITLE_PLURAL,
    path: ROUTE_URL.SERIAL.LIST,
    icon: FilmIcon,
    component: SerialList
  },
  {
    id: 'seasonList',
    title: URL_TITLE.SEASON.TITLE_PLURAL,
    path: `${ROUTE_URL.SEASON.LIST}/:filmId`,
    icon: FilmIcon,
    component: SeasonList,
    hidden: true
  },
  {
    id: 'seriyaList',
    title: URL_TITLE.SERIYA.TITLE_PLURAL,
    path: `${ROUTE_URL.SEASON.LIST}/:filmId/seriya/:seasonId`,
    icon: FilmIcon,
    component: SeriyaList,
    hidden: true
  }
]

export default [
  ...category,
  ...genre,
  ...member,
  ...trailer,
  ...film,
  ...serial
  // {
  //   id: 'generic',
  //   title: 'Generic',
  //   path: '/generic',
  //   icon: LayersOutlineIcon,
  //   component: Generic
  // }
]
