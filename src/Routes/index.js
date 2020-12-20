import {CategoryList} from '../Views/Category'
import {GenreList} from '../Views/Genre';
import {MemberList} from '../Views/Memeber';
import {FilmList} from '../Views/Film';
import {SerialList, SeriesList} from '../Views/Serial';
import {SliderList} from "../Views/Slider";
import {NewsList} from "../Views/News";
import {AnnotationList} from "../Views/Annotation";
import FilmIcon from 'mdi-react/FilmIcon';
import ViewCarouselOutlineIcon from 'mdi-react/ViewCarouselOutlineIcon';
import FormatListBulletedSquareIcon from 'mdi-react/FormatListBulletedSquareIcon';
import AccountGroupOutlineIcon from 'mdi-react/AccountGroupOutlineIcon';
import FilmstripBoxIcon from 'mdi-react/FilmstripBoxIcon'
import NewspaperVariantIcon from "mdi-react/NewspaperVariantIcon";
import ImageSizeSelectActualIcon from "mdi-react/ImageSizeSelectActualIcon";
import CardTextIcon from "mdi-react/CardTextIcon";
import {URL_TITLE, ROUTE_URL} from '../Constants/url';
import CommentIcon from "mdi-react/CommentIcon";
import {CommentList} from "../Views/Comments";
import AccountBoxMultipleIcon from "mdi-react/AccountBoxMultipleIcon";
import {UserList} from "../Views/Users";
import {PriceList} from "../Views/Price";
import CashMultipleIcon from "mdi-react/CashMultipleIcon";

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
        id: 'seriyaList',
        title: URL_TITLE.SERIYA.TITLE_PLURAL,
        path: `${ROUTE_URL.SERIAL.LIST}/:filmId`,
        icon: FilmIcon,
        component: SeriesList,
        hidden: true
    }
]

const slider = [
    {
        id: 'sliderList',
        title: URL_TITLE.SLIDER.TITLE_PLURAL,
        path: ROUTE_URL.SLIDER.LIST,
        icon: ImageSizeSelectActualIcon,
        component: SliderList
    }
]

const news = [
    {
        id: 'newsList',
        title: URL_TITLE.NEWS.TITLE_PLURAL,
        path: ROUTE_URL.NEWS.LIST,
        icon: NewspaperVariantIcon,
        component: NewsList
    }
]

const annotation = [
    {
        id: 'annotationList',
        title: URL_TITLE.ANNOTATION.TITLE_PLURAL,
        path: ROUTE_URL.ANNOTATION.LIST,
        icon: CardTextIcon,
        component: AnnotationList
    }
]

const comments = [
    {
        id: 'commentList',
        title: URL_TITLE.COMMENTS.TITLE_PLURAL,
        path: ROUTE_URL.COMMENTS.LIST,
        icon: CommentIcon,
        component: CommentList
    }
]

const users = [
    {
        id: 'userList',
        title: URL_TITLE.USERS.TITLE_PLURAL,
        path: ROUTE_URL.USERS.LIST,
        icon: AccountBoxMultipleIcon,
        component: UserList
    }
]

const price = [
    {
        id: 'priceList',
        title: URL_TITLE.PRICE.TITLE_PLURAL,
        path: ROUTE_URL.PRICE.LIST,
        icon: CashMultipleIcon,
        component: PriceList
    }
]

export default [
    ...category,
    ...genre,
    ...member,
    ...film,
    ...serial,
    ...slider,
    ...news,
    ...annotation,
    ...comments,
    ...users,
    ...price
]
