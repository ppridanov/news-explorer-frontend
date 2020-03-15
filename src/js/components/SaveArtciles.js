import { SERVER_URL } from '../constans/constans';
import isLogin from '../utils/scripts';

export default class SaveArticles {
  constructor(classes) {
    this._container = document.querySelector('.saved-articles__card-container');
    this._mainTitle = document.querySelector('.main-text__title');
    this._keywordText = document.querySelector('.main-text__word-key');
    this._keywordArray = [];
    this._newsArray = [];
    this.connectionToMainApi = (...args) => new classes.MainApi(...args);
    this.newsCard = (...args) => new classes.NewsCard(...args);
    this.classes = classes;
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('article__delete-icon')) {
        const deleteButton = e.target;
        this.connectionToMainApi({ SERVER_URL, TOKEN: localStorage.getItem('token') }).deleteArticle(deleteButton.getAttribute('_id'))
          .then(() => {
            this._container.removeChild(e.target.closest('.article'));
            deleteButton.removeAttribute('_id');
            const articleCard = e.target.parentNode.parentNode;
            const articleId = articleCard.getAttribute('_id');
            this._newsArray.forEach((item, index) => {
              if (articleId === item._id) {
                this._newsArray.splice(index, 1);
                this._keywordArray.splice(index, 1);
                this.renderKeywords();
              }
            });
          })
          .catch((err) => console.log(err));
      }
    });
  }

  render() {
    this.connectionToMainApi({ SERVER_URL, TOKEN: localStorage.getItem('token') }).getArticles()
      .then((articlesArray) => {
        this._newsArray = articlesArray;
        articlesArray.forEach((article) => {
          const articlesElement = this.newsCard(this.classes).create({
            source: article.source,
            title: article.title,
            date: article.date,
            text: article.text,
            image: article.image,
            link: article.link,
            keyword: article.keyword,
            _id: article._id,
          });
          this._keywordArray.push(article.keyword);
          this._container.appendChild(articlesElement);
        });
        this.renderKeywords();
      })
      .catch((err) => console.log(err));
  }

  renderKeywords() {
    const result = {};
    this._keywordArray.forEach((item) => {
      result[item] = result[item.keyword] + 1 || 1;
    });
    const keywordSorted = Object.keys(result).sort((a, b) => result[b] - result[a]);
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
    this.connectionToMainApi({ SERVER_URL, TOKEN: localStorage.getItem('token') }).getUserInfo()
      .then((user) => {
        this._mainTitle.textContent = `${user.name}, у Вас ${this._keywordArray.length} ${saveArticlesText}`;
        this._keywordText.textContent = keyWordsText;
      })
      .catch((err) => console.log(err));
  }
}
