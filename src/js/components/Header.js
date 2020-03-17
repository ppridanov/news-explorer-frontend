export default class Header {
  constructor(config) {
    this._container = document.querySelector('.header');
    this._serverUrl = config.constants.SERVER_URL;
    this._selectors = config.selectors;
    this._isLogged = config.funcs.isLogin;
    this._mainApi = config.funcs.mainApi;
    this._regExps = config.regExps;
  }

  render() {
    if (!this._isLogged() && this._regExps.SAVE_ARTICLES_REGEXP.test(document.location.pathname)) document.location.href = '../';
    if (localStorage != undefined && localStorage.getItem('token')) {
      this._container.prepend(this._selectors.HEADER_TEMPLATE_IS_LOGGED.content.cloneNode(true));
      const logOutButton = this._container.querySelector('.nav__logout-button');
      this._mainApi(this._serverUrl, localStorage.getItem('token')).getUserInfo()
        .then((res) => {
          logOutButton.textContent = res.name;
        })
        .catch((err) => console.log(err));
      this._setEventListener();
      this._mobileRender();
    } else {
      this._container.prepend(this._selectors.HEADER_TEMPLATE_NOT_LOGGED.content.cloneNode(true));
      this._mobileRender();
      if (document.querySelector('.articles__results')) {
        document.querySelector('.articles__results').remove();
      }
    }
  }

  _setEventListener() {
    this._container.querySelector('.nav__logout-container').addEventListener('click', (e) => {
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
