export default class EventListener {
  constructor(classes) {
    this.popup = (...args) => new classes.Popup(...args);
    this.classes = classes;
    this._setEventListener();
  }

  _setEventListener() {
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav__login-button')) {
        this.popup('#signin-tpl', this.classes).open();
      }
      if (e.target.classList.contains('popup__signup-button')) {
        this.popup('#signup-tpl', this.classes).render();
        this.popup('#signup-tpl', this.classes).open();
      }
      if (e.target.classList.contains('popup__signin-button')) {
        this.popup('#signup-tpl', this.classes).render();
        this.popup('#signin-tpl', this.classes).open();
      }
    });
  }
}
