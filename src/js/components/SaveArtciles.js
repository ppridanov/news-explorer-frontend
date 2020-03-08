/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import MainApi from '../api/MainApi';
import NewsCard from './NewsCard';

const connect = new MainApi({
  url: 'https://api.pridanov.site',
  token: localStorage.getItem('token'),
});

export default class SaveArticles {
  constructor() {
    this._container = document.querySelector('.saved-articles__card-container');
    this._mainTitle = document.querySelector('.main-text__title');
    this._keywordText = document.querySelector('.main-text__word-key');
    this._keywordArray = [];
    this._newsArray = [];
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('article__delete-icon')) {
        const articleCard = e.target.parentNode.parentNode;
        const articleIndex = articleCard.getAttribute('index');
        this._keywordArray.splice(articleIndex, 1);
        this.renderKeywords();
      }
    });
    console.log(this._container);
  }

  render() {
    connect.getArticles()
      .then((data) => {
        console.log(data);
        this._newsArray = data;
        data.forEach((item, index) => {
          const articlesElement = new NewsCard().create({
            source: item.source,
            title: item.title,
            date: item.date,
            text: item.text,
            image: item.image,
            link: item.url,
            keyword: item.keyword,
            _id: item._id,
            indexNum: index,
          });
          this._keywordArray.push(item.keyword);
          this._container.appendChild(articlesElement);
        });
        this.renderKeywords();
      });
  }

  renderKeywords() {
    const result = {};
    this._keywordArray.forEach((item) => {
      result[item] = result[item] + 1 || 1;
    });
    const keywordSorted = Object.keys(result).sort((a, b) => result[b] - result[a]);
    console.log(result);
    console.log(keywordSorted);
    let saveArticlesText = '';
    if (this._keywordArray.length == 0) {
      saveArticlesText = 'сохраненных статей';
    } else if (this._keywordArray.length <= 4) {
      saveArticlesText = 'сохраненные статьи';
    } else if (this._keywordArray.length === 1) {
      saveArticlesText = 'сохраненная статья';
    } else {
      saveArticlesText = 'сохраненных статей';
    }
    const newKeywordsArray = Array.from(new Set(this._keywordArray));
    let keyWordsText = '';
    if (newKeywordsArray.length > 2) {
      keyWordsText = `${keywordSorted[0]}, ${keywordSorted[1]} и ${keywordSorted.slice(0, -2).length} других.`;
    } else if (newKeywordsArray.length == 2) {
      keyWordsText = `${keywordSorted[0]} и ${keywordSorted[1]}`;
    } else if (newKeywordsArray.length === 0) {
      keyWordsText = 'Ключевых слов нет';
    } else {
      keyWordsText = `${keywordSorted[0]}`;
    }
    connect.getUserInfo()
      .then((data) => {
        this._mainTitle.textContent = `${data.name}, у Вас ${this._keywordArray.length} ${saveArticlesText}`;
        this._keywordText.textContent = keyWordsText;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
