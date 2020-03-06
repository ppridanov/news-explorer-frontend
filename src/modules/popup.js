export default class Popup {
  constructor(selector) {
    this._container = document.body.querySelector('.page');
    this._template = document.querySelector(selector).content.querySelector('.popup');
    this._element = this._template.cloneNode(true);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  setContent(popup) {
    const target = document.querySelector('#signin-tpl');
    console.log(target);
    this.page.appendChild(target.content.cloneNode(true));
  }

  open(event) {
    this.target = event.target;
    console.log(event.target);
    const modalId = this.target.dataset.target;
    const modal = document.getElementById(modalId);
    modal.classList.add('popup_is-opened');
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

// export default class Popup {
//   constructor() {
//     this.domElement = this._domElement();
//     this.popupTitle = this.domElement.querySelector('.popup__title');
//     this.popupContent = this.domElement.querySelector('.popup__content');
//   }

//   _domElement() {
//     const popupContainer = document.createElement('div');
//     popupContainer.classList.add('popup');
//     const popupContent = document.createElement('div');
//     popupContent.classList.add('popup__content');
//     const popupTitle = document.createElement('h3');
//     popupTitle.classList.add('popup__title');
//     const popupCloseButton = document.createElement('div');
//     popupCloseButton.classList.add('popup__close');
//     popupCloseButton.addEventListener('click', () => {
//       this.close();
//     });
//     popupContent.append(popupTitle, popupCloseButton);
//     popupContainer.appendChild(popupContent);
//     return document.body.appendChild(popupContainer);
//   }

//   setContent(form) {
//     this.domElement.appendChild(form);
//     this.open();
//   }

//   clearContent() {
//     document.body.removeChild(document.querySelector('.popup'));
//   }

//   open() {
//     this.domElement.classList.add('popup_is-opened');
//   }

//   close() {
//     this.domElement.classList.remove('popup_is-opened');
//     this.clearContent();
//   }
// }
