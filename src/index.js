/* eslint-disable no-new */
import './style.css';
import EventListener from './js/components/EventListener';
import Popup from './js/components/Popup';
import Validator from './js/components/Validator';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';

const classes = {
  EventListener,
  Popup,
  Validator,
  MainApi,
  Header,
  NewsApi,
  NewsCard,
  NewsCardList,
};

new EventListener(classes);
new Header(classes).render();
new Validator('search', classes);
new NewsCardList(classes);
