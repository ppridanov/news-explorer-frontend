import MainApi from '../api/MainApi';
import NewsCard from './NewsCard';
import NewsCardList from './NewsCardList';

export default class Header {
  constructor() {
    this._container = document.querySelector('.header');
  }

  render() {
    let _template = '';
    if (localStorage != undefined && localStorage.getItem('token')) {
      _template = document.querySelector('#header-islogged-tpl');
      this._container.prepend(_template.content.cloneNode(true));
      const logOutButton = this._container.querySelector('.nav__logout-button');
      new MainApi({
        url: 'http://api.pridanov.site',
        token: localStorage.getItem('token'),
      }).getUserInfo()
        .then((res) => {
          logOutButton.textContent = res.name;
        })
        .catch((err) => console.log(err));
      this._setEventListener();
    } else {
      if (document.location.pathname === '/savearticles') document.location.href = '../';
      _template = document.querySelector('#header-notlogged-tpl');
      this._container.prepend(_template.content.cloneNode(true));
      if (document.querySelector('.articles__results')) {
        document.querySelector('.articles__results').remove();
      }
    }
  }

  _setEventListener() {
    this._container.querySelector('.nav__logout-button').addEventListener('click', (e) => {
      localStorage.clear();
      this.clearContent();
      this.render();
    });
  }

  clearContent() {
    this._element = this._container.querySelector('.nav').remove();
  }
}
