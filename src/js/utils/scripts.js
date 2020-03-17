import EventListener from '../components/EventListener';
import Popup from '../components/Popup';
import Validator from '../components/Validator';
import MainApi from '../api/MainApi';
import Header from '../components/Header';
import NewsApi from '../api/NewsApi';
import NewsCard from '../components/NewsCard';
import NewsCardList from '../components/NewsCardList';
import SaveArticles from '../components/SaveArtciles';

const eventListener = (...args) => new EventListener(...args);
const popup = (...args) => new Popup(...args);
const validator = (...args) => new Validator(...args);
const mainApi = (...args) => new MainApi(...args);
const header = (...args) => new Header(...args);
const newsApi = (...args) => new NewsApi(...args);
const newsCard = (...args) => new NewsCard(...args);
const newsCardList = (...args) => new NewsCardList(...args);
const saveArticles = (...args) => new SaveArticles(...args);

function isLogin() {
  if (localStorage && localStorage.getItem('token')) {
    return true;
  }
  return false;
}


function checkHttps() {
  const httpsRegExp = /https:\/\//;
  if (httpsRegExp.test(document.location.href)) {
    return 'https://';
  }
  return 'http://';
}


const functions = {
  isLogin,
  checkHttps,
  eventListener,
  popup,
  validator,
  header,
  mainApi,
  newsApi,
  newsCard,
  newsCardList,
  saveArticles,
};
export { checkHttps, functions };
