console.log('Hello, World!')
//ВСЕ что тут сделано это на время верстки. В будующем это все я переделаю.

import "./style.css";
const overlay = document.querySelector('.overlay');
const burgerButton = document.querySelector('.nav__burger-button');
const closeBurgerButton = document.querySelector('.nav__close-button');
const headerOverlay = document.querySelector('.header__overlay');
const menuItems = document.querySelector('.nav__menu-items');

function saveButtonEvents() {
  const articleImageContainers = document.querySelectorAll('.article__image-container');
  articleImageContainers.forEach((el) => {
    el.addEventListener('mouseover', function(event) {
      if (event.target.classList.contains('article__save-icon') && !event.target.classList.contains('article__save-icon_active')) {
        event.target.classList.toggle('article__save-icon_hover');
        const signinMsg = document.createElement('span');
        signinMsg.classList.add('article__signin-msg');
        signinMsg.textContent = 'Войдите, чтобы сохранять статьи';
        el.appendChild(signinMsg);
      }
    })
    el.addEventListener('mouseout', function(event) {
      if (event.target.classList.contains('article__save-icon') && !event.target.classList.contains('article__save-icon_active')) {
        event.target.classList.toggle('article__save-icon_hover');
        if (el.querySelector('.article__signin-msg')) {
          el.removeChild(el.querySelector('.article__signin-msg'));
        }
      }
    });
    el.addEventListener('click', function (event) {
      if (event.target.classList.contains('article__save-icon')) {
        event.target.classList.toggle('article__save-icon_active');
        if (el.querySelector('.article__signin-msg')) {
          el.removeChild(el.querySelector('.article__signin-msg'));
        }
      }
    });
  })
}

function openBurgerMenu(event) {
  event.preventDefault();
  headerOverlay.style.display = 'flex';
  overlay.style.display = 'flex';
  burgerButton.classList.add('nav__burger-button_none')
  closeBurgerButton.style.display = 'flex';
  menuItems.style.display = 'flex';
}

function closeBurgerMenu(event) {
  headerOverlay.style.display = 'none';
  overlay.style.display = 'none';
  burgerButton.classList.remove('nav__burger-button_none')
  closeBurgerButton.style.display = 'none';
  menuItems.style.display = 'none';
}

function openPopup(event) {
  event.preventDefault();
  if (document.documentElement.clientWidth === 320) {
    burgerButton.classList.add('nav__burger-button_none');
  }
  burgerButton.classList.add('nav__burger-button_none')
  const modalId = (event.target.dataset.target);
  const modal = document.getElementById(modalId);
  modal.classList.add('popup_is-opened');
}

function closePopup(event) {
  if (document.documentElement.clientWidth === 320) {
    burgerButton.classList.remove('nav__burger-button_none');
  }
  const popupTarget = event.target.parentNode.parentNode;
  popupTarget.classList.remove('popup_is-opened');
}

function changePopup() {
  if (document.querySelector('.popup_is-opened')) {
    if (document.documentElement.clientWidth === 320) {
      burgerButton.classList.remove('nav__burger-button_none');
    }
    const popupIsOpened = document.querySelector('.popup_is-opened');
    popupIsOpened.classList.remove('popup_is-opened');
  }
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('nav__login-button') || event.target.classList.contains('popup__signin-button')) {
    changePopup();
    openPopup(event);
  }
  if (event.target.classList.contains('popup__signup-button')) {
    changePopup();
    openPopup(event);
  }
});
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__close')) {
    closePopup(event);
  }
})
document.addEventListener('keydown', (event) =>{
  if (event.keyCode == '27') {
    changePopup();
  }
})

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    changePopup();
  }
})

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('nav__burger-button')) {
    openBurgerMenu(event);
  }
  if (event.target.classList.contains('nav__close-button')) {
    closeBurgerMenu(event);
  }
})
saveButtonEvents();
