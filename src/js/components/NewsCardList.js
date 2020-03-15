import { NEWS_URL, API_KEY } from '../constans/constans';

export default class NewsCardList {
  constructor(classes) {
    this._newsArray = [];
    this._value = '';
    this._resultsCard = undefined;
    this._form = document.forms.search;
    this._input = this._form.elements.searchinput;
    this._button = this._form.elements.button;
    this._resultContainer = document.querySelector('.articles__results-container');
    this._templateNotFound = document.querySelector('#results-not-found');
    this._templateSearchIsLoading = document.querySelector('#results-is-loading');
    this._templateFound = document.querySelector('#results-found');
    this._errorSpan = document.querySelector('.error__searchinput');
    this._setHandlers();
    this.connectionToNews = (...args) => new classes.NewsApi(...args);
    this.newsCard = (...args) => new classes.NewsCard(...args);
    this.classes = classes;
  }

  _setHandlers() {
    this._form.addEventListener('submit', (e) => {
      this._value = this._input.value;
      this.renderResults(e);
    });
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('articles__next-button')) {
        this.moreCards(this._someCardsArray, this._resultsCard);
      }
    });
  }

  _disableSearchForm() {
    this._input.setAttribute('disabled', true);
    this._button.setAttribute('disabled', true);
    this._button.setAttribute('style', 'background: grey');
  }

  _enableSearchForm() {
    this._input.removeAttribute('disabled', true);
    this._button.removeAttribute('disabled', true);
    this._button.removeAttribute('style', 'background: grey');
  }

  renderResults(event) {
    event.preventDefault();
    if (document.querySelector('.articles__results')) {
      this._resultContainer.removeChild(document.querySelector('.articles__results'));
    }
    this._disableSearchForm();
    this._input.setAttribute('disabled', true);
    this._resultContainer.append(this._templateSearchIsLoading.content.cloneNode(true));
    this.connectionToNews(NEWS_URL, API_KEY).render(this._value)
      .then((array) => {
        this._resultContainer.removeChild(document.querySelector('.articles__results'));
        if (array.totalResults === 0) {
          this._resultContainer.append(this._templateNotFound.content.cloneNode(true));
          return;
        }
        this._resultContainer.append(this._templateFound.content.cloneNode(true));
        this._resultsCard = document.querySelector('.articles-container');
        this._newsArray = array.articles;
        this._someCardsArray = [];
        this._someCardsArray = this._newsArray.slice(0, 3);
        if (this._someCardsArray.length === 0) document.querySelector('.articles__next-button').setAttribute('style', 'display: none');
        this._newsArray = this._newsArray.slice(3);
        this._someCardsArray.forEach((item) => {
          const articlesElement = this.newsCard(this.classes).create({
            source: item.source.name,
            title: item.title,
            date: item.publishedAt.slice(0, -10),
            text: item.description,
            image: item.urlToImage,
            link: item.url,
            keyword: this._value,
          });
          this._resultsCard.appendChild(articlesElement);
        });
      })
      .catch((err) => {
        if (err.message == 'Failed to fetch') {
          this._resultContainer.removeChild(document.querySelector('.articles__results'));
          this._errorSpan.classList.add('error-message_active');
          this._errorSpan.textContent = 'Произошла ошибка соединения с сервером новостей, попробуйте позднее';
          setTimeout(() => {
            this._errorSpan.classList.remove('error-message_active');
          }, 5000);
        }
      })
      .finally(() => {
        this._enableSearchForm();
      });
  }

  moreCards(array, container) {
    // eslint-disable-next-line no-param-reassign
    array = this._newsArray.slice(0, 3);
    this._newsArray = this._newsArray.slice(3);
    if (this._newsArray.length <= 3) {
      document.querySelector('.articles__next-button').setAttribute('style', 'display: none');
      document.querySelector('.articles-container').setAttribute('style', 'margin-bottom: 86px');
    }
    array.forEach((item) => {
      const articlesElement = this.newsCard(this.classes).create({
        source: item.source.name,
        title: item.title,
        date: item.publishedAt.slice(0, -10),
        text: item.description,
        image: item.urlToImage,
        link: item.url,
        keyword: this._value,
      });
      container.appendChild(articlesElement);
    });
  }
}
