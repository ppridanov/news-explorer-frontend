export default class NewsCardList {
  constructor(config) {
    this._config = config;
    this._newsArray = [];
    this._value = '';
    this._resultsCard = undefined;
    this._form = this._config.selectors.SEARCH_FORM;
    this._input = this._config.selectors.SEARCH_INPUT;
    this._button = this._config.selectors.SEARCH_BUTTON;
    this._resultContainer = this._config.selectors.RESULTS_CONTAINER;
    this._templateNotFound = this._config.selectors.NEWSCARD_TEMPLATE_NOT_FOUND;
    this._templateSearchIsLoading = this._config.selectors.NEWSCARD_TEMPLATE_IS_LOADING;
    this._templateFound = this._config.selectors.NEWSCARD_TEMPLATE_FOUND;
    this._errorSpan = this._config.selectors.ERROR_SPAN;
    this._newsUrl = this._config.constants.NEWS_URL;
    this._newsApi = this._config.constants.API_KEY;
    this.connectionToNews = this._config.funcs.newsApi;
    this.newsCard = this._config.funcs.newsCard;
    this._setHandlers();
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
    this.connectionToNews(this._newsUrl, this._newsApi).render(this._value)
      .then((array) => {
        console.log(array.articles);
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
          const articlesElement = this.newsCard(this._config).create({
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
      const articlesElement = this.newsCard(this._config).create({
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
