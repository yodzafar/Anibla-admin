import { generateTitle, generateUrl } from '../Helpers/url-helpers';

export const BASIC_URLS = {
  CATEGORY: '/category',
  GENRE: '/genre',
  GENERIC: '/generic',
  MEMBER: '/member',
  TRAILER: '/trailer',
  FILM: '/film',
  SERIAL: '/serial',
  SEASON: '/serial/season',
  SERIYA: '/serial/season/seriya'
}

export const ROUTE_URL = {
  CATEGORY: generateUrl(BASIC_URLS.CATEGORY),
  GENRE: generateUrl(BASIC_URLS.GENRE),
  GENERIC: generateUrl(BASIC_URLS.GENERIC),
  MEMBER: generateUrl(BASIC_URLS.MEMBER),
  TRAILER: generateUrl(BASIC_URLS.TRAILER),
  FILM: generateUrl(BASIC_URLS.FILM),
  SERIAL: generateUrl(BASIC_URLS.SERIAL),
  SEASON: generateUrl(BASIC_URLS.SEASON),
  SERIYA: generateUrl(BASIC_URLS.SERIYA)
}

export const URL_TITLE = {
  CATEGORY: generateTitle('Kategoriya'),
  GENRE: generateTitle('Janr'),
  GENERIC: generateTitle('Umumiy'),
  MEMBER: generateTitle('Hodim'),
  TRAILER: generateTitle('Trailer'),
  FILM: generateTitle('Film'),
  SERIAL: generateTitle('Serial'),
  SEASON: generateTitle('Fasl'),
  SERIYA: generateTitle('Seriya')
}

export const BASE_URL = process.env.REACT_APP_BASE_URL
