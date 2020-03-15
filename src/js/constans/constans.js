import { checkHttps } from '../utils/scripts';

const ESCAPE_CODE = 27;
const EMAIL_REGEXP = /^([a-z0-9_\-.]{2,})@([\w\-.]+)\.([a-z]{2,})$/;
// eslint-disable-next-line no-useless-escape
const NAME_REGEXP = /^([А-ЯЁ][а-яё]+([\-/{1}]?[А-Я]{1}?[а-я]+?)?)$/;
const SAVE_ARTICLES_REGEXP = /savearticles/;
const MONTH_NAME = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
const SERVER_URL = `${checkHttps()}api.pridanov.site`;
const NEWS_URL = `${checkHttps()}newsapi.org`;
const API_KEY = 'c35a0eed6bd34888a598b4e5fee41542';
const TEMPLATE_IS_LOGGED = document.querySelector('#header-islogged-tpl');
const TEMPLATE_NOT_LOGGED = document.querySelector('#header-notlogged-tpl');
const LOGOUT_BUTTON = TEMPLATE_IS_LOGGED.content.querySelector('.nav__logout-button');

export {
  ESCAPE_CODE,
  EMAIL_REGEXP,
  NAME_REGEXP,
  MONTH_NAME,
  SERVER_URL,
  TEMPLATE_IS_LOGGED,
  TEMPLATE_NOT_LOGGED,
  LOGOUT_BUTTON,
  API_KEY,
  NEWS_URL,
  SAVE_ARTICLES_REGEXP,
};
