/* eslint-disable no-return-assign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './style.css';
import Header from '../../js/components/Header';
import SaveArticles from '../../js/components/SaveArtciles';
import MainApi from '../../js/api/MainApi';
import NewsCard from '../../js/components/NewsCard';

const classes = {
  Header,
  SaveArticles,
  MainApi,
  NewsCard,
};

new SaveArticles(classes).render();
new Header(classes).render();
