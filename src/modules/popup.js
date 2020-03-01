import { validator } from "./validator";

export class Popup {
  constructor() {
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup__close')) {
        this.close(event);
      }
      if (event.target.classList.contains('nav__login-button')) {
        this.open(event);
      }
      if (event.target.classList.contains('popup__signin-button')) {
        this.render();
        this.open(event);
      }
      if (event.target.classList.contains('popup__signup-button')) {
        this.render();
        this.open(event);
      }
      if (event.target.classList.contains('popup')) {
        this.render();
        validator.resetForms();
      }
    });
    document.body.addEventListener('keydown', (event) => {
      if (event.keyCode == '27') {
        this.render();
        validator.resetForms();
      }
    })
  }
  open(event) {
    this.target = event.target;
    const modalId = this.target.dataset.target;
    const modal = document.getElementById(modalId);
    modal.classList.add('popup_is-opened');
    validator.disableButton();
  }
  close(event) {
    this.target = event.target.parentNode.parentNode;
    this.target.classList.remove('popup_is-opened');
    validator.resetForms();
  }
  render() {
    validator.resetForms();
    if (document.querySelector('.popup_is-opened')) {
      if (document.documentElement.clientWidth === 320) {
        burgerButton.classList.remove('nav__burger-button_none');
      }
      const popupIsOpened = document.querySelector('.popup_is-opened');
      popupIsOpened.classList.remove('popup_is-opened');
    }
  }
}

