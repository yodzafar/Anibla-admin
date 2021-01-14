import { generateTitle, generateUrl } from '../Helpers/url-helpers';

export const BASIC_URLS = {
  FILM: '/film',
  NEWS: '/news',
  GENRE: '/genre',
  SERIAL: '/serial',
  SLIDER: '/slider',
  MEMBER: '/member',
  GENERIC: '/generic',
  TRAILER: '/trailer',
  CATEGORY: '/category',
  SEASON: '/serial/season',
  ANNOTATION: '/annotation',
  SERIYA: '/serial/season/series',
  COMMENTS: '/comments',
  USERS: '/users',
  PRICE:'/price',
  PAYMENT: '/payment',
  SOLD: '/sold'
}

export const ROUTE_URL = {
  NEWS: generateUrl(BASIC_URLS.NEWS),
  FILM: generateUrl(BASIC_URLS.FILM),
  GENRE: generateUrl(BASIC_URLS.GENRE),
  MEMBER: generateUrl(BASIC_URLS.MEMBER),
  SERIAL: generateUrl(BASIC_URLS.SERIAL),
  SEASON: generateUrl(BASIC_URLS.SEASON),
  SERIYA: generateUrl(BASIC_URLS.SERIYA),
  SLIDER: generateUrl(BASIC_URLS.SLIDER),
  GENERIC: generateUrl(BASIC_URLS.GENERIC),
  TRAILER: generateUrl(BASIC_URLS.TRAILER),
  CATEGORY: generateUrl(BASIC_URLS.CATEGORY),
  ANNOTATION: generateUrl(BASIC_URLS.ANNOTATION),
  COMMENTS: generateUrl(BASIC_URLS.COMMENTS),
  USERS: generateUrl(BASIC_URLS.USERS),
  PRICE:generateUrl(BASIC_URLS.PRICE),
  PAYMENT: generateUrl(BASIC_URLS.PAYMENT),
  SOLD: generateUrl(BASIC_URLS.SOLD)
}

export const URL_TITLE = {
  FILM: generateTitle('Film'),
  GENRE: generateTitle('Janr'),
  SEASON: generateTitle('Fasl'),
  MEMBER: generateTitle('Hodim'),
  SERIAL: generateTitle('Serial'),
  SERIYA: generateTitle('Seriya'),
  SLIDER: generateTitle('Slider'),
  GENERIC: generateTitle('Umumiy'),
  TRAILER: generateTitle('Trailer'),
  NEWS: generateTitle('Yangiliklar'),
  CATEGORY: generateTitle('Kategoriya'),
  ANNOTATION: generateTitle('Annotatsiya'),
  COMMENTS: generateTitle('Muhokama'),
  USERS: generateTitle('Foydalanuvchi'),
  PRICE: generateTitle('Narx'),
  PAYMENT: generateTitle("To'lov"),
  SOLD: generateTitle("Sotilgan")
}

export const BASE_URL = process.env.REACT_APP_BASE_URL
