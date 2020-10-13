import {generateTitle, generateUrl} from "../Helpers/url-helpers";

export const BASIC_URLS = {
  CATEGORY: '/category',
  GENRE: '/genre',
  GENERIC: '/generic',
  STUFF: '/stuff',
  TRAILER: '/trailer',
  PRODUCT: '/product'
}

export const ROUTE_URL = {
  CATEGORY: generateUrl(BASIC_URLS.CATEGORY),
  GENRE: generateUrl(BASIC_URLS.GENRE),
  GENERIC: generateUrl(BASIC_URLS.GENERIC),
  STUFF: generateUrl(BASIC_URLS.STUFF),
  TRAILER: generateUrl(BASIC_URLS.TRAILER),
  PRODUCT: generateUrl(BASIC_URLS.PRODUCT),
}

export const URL_TITLE = {
  CATEGORY: generateTitle('Kategoriya'),
  GENRE: generateTitle('Janr'),
  GENERIC: generateTitle('Umumiy'),
  STUFF: generateTitle('Hodim'),
  TRAILER: generateTitle('Trailer'),
  PRODUCT: generateTitle('Mahsulot'),
}