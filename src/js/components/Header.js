import {
  SERVER_URL,
  TEMPLATE_IS_LOGGED,
  TEMPLATE_NOT_LOGGED,
  SAVE_ARTICLES_REGEXP,
} from '../constans/constans';
import { isLogin } from '../utils/scripts';

export default class Header {
  constructor(classes) {
    this._container = document.querySelector('.header');
    this.connection = (...args) => new classes.MainApi(...args);
  }

  render() {
    if (!isLogin() && SAVE_ARTICLES_REGEXP.test(document.location.pathname)) document.location.href = '../';
    if (localStorage != undefined && localStorage.getItem('token')) {
      this._container.prepend(TEMPLATE_IS_LOGGED.content.cloneNode(true));
      const logOutButton = this._container.querySelector('.nav__logout-button');
      this.connection({ SERVER_URL, TOKEN: localStorage.getItem('token') }).getUserInfo()
        .then((res) => {
          logOutButton.textContent = res.name;
        })
        .catch((err) => console.log(err));
      this._setEventListener();
      this._mobileRender();
    } else {
      this._container.prepend(TEMPLATE_NOT_LOGGED.content.cloneNode(true));
      this._mobileRender();
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
    this._container.querySelector('.overlay').remove();
    this._container.querySelector('.header__overlay').remove();
  }

  _mobileRender() {
    const overlay = document.querySelector('.overlay');
    const burgerButton = document.querySelector('.nav__burger-button');
    const closeButton = document.querySelector('.nav__close-button');
    const headerOverlay = document.querySelector('.header__overlay');
    const menuItems = document.querySelector('.nav__menu-items');
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav__burger-button')) {
        overlay.setAttribute('style', 'display: flex');
        headerOverlay.setAttribute('style', 'display: flex');
        menuItems.setAttribute('style', 'display: flex');
        burgerButton.setAttribute('style', 'display: none');
        closeButton.setAttribute('style', 'display: flex');
      }
      if (e.target.classList.contains('overlay') || e.target.classList.contains('nav__close-button')) {
        overlay.removeAttribute('style');
        headerOverlay.removeAttribute('style');
        menuItems.removeAttribute('style');
        burgerButton.removeAttribute('style');
        closeButton.removeAttribute('style');
      }
    });
  }
}
