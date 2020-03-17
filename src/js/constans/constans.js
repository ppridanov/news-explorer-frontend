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
const HEADER_TEMPLATE_IS_LOGGED = document.querySelector('#header-islogged-tpl');
const HEADER_TEMPLATE_NOT_LOGGED = document.querySelector('#header-notlogged-tpl');
const NEWSCARD_TEMPLATE_IS_LOADING = document.querySelector('#results-is-loading');
const NEWSCARD_TEMPLATE_NOT_FOUND = document.querySelector('#results-not-found');
const NEWSCARD_TEMPLATE_FOUND = document.querySelector('#results-found');
const ERROR_SPAN = document.querySelector('.error__searchinput');
const RESULTS_CONTAINER = document.querySelector('.articles__results-container');
const SEARCH_FORM = document.querySelector('.search__form');
const SEARCH_INPUT = document.querySelector('.search__input');
const SEARCH_BUTTON = document.querySelector('.search__submit-button');

const regExps = {
  EMAIL_REGEXP,
  NAME_REGEXP,
  SAVE_ARTICLES_REGEXP,
};

const selectors = {
  HEADER_TEMPLATE_IS_LOGGED,
  HEADER_TEMPLATE_NOT_LOGGED,
  NEWSCARD_TEMPLATE_FOUND,
  NEWSCARD_TEMPLATE_IS_LOADING,
  NEWSCARD_TEMPLATE_NOT_FOUND,
  ERROR_SPAN,
  RESULTS_CONTAINER,
  SEARCH_FORM,
  SEARCH_INPUT,
  SEARCH_BUTTON,
};

const constants = {
  ESCAPE_CODE,
  MONTH_NAME,
  SERVER_URL,
  NEWS_URL,
  API_KEY,
};

export { selectors, constants, regExps };
