export default class EventListener {
  constructor(config) {
    this._config = config;
    this.popup = this._config.funcs.popup;
    this._setEventListener();
  }

  _setEventListener() {
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav__login-button')) {
        this.popup('#signin-tpl', this._config).open();
      }
      if (e.target.classList.contains('popup__signup-button')) {
        this.popup('#signup-tpl', this._config).render();
        this.popup('#signup-tpl', this._config).open();
      }
      if (e.target.classList.contains('popup__signin-button')) {
        this.popup('#signup-tpl', this._config).render();
        this.popup('#signin-tpl', this._config).open();
      }
    });
  }
}
