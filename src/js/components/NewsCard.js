import { MONTH_NAME } from '../constans/constans';

export default class NewsCard {
  constructor(container) {
    this._container = container || '';
  }


  create(data) {
    this._container = document.createElement('article');
    this._container.classList.add('article');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('article__image-container');

    const img = document.createElement('img');
    img.classList.add('article__image');
    img.setAttribute('src', `${data.image}`);
    img.setAttribute('alt', `${data.title}`);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('article__delete-icon');
    const deleteMsg = document.createElement('span');
    deleteMsg.classList.add('article__delete-msg');
    deleteMsg.textContent = 'Убрать из сохраненных';
    const notLoggedMsg = document.createElement('span');
    notLoggedMsg.classList.add('article__signin-msg');
    notLoggedMsg.textContent = 'Войдите, чтобы сохранять статьи';
    const saveButton = document.createElement('button');
    if (this.isLogin()) {
      saveButton.addEventListener('click', (e) => {
        this.renderIcons(e);
      });
    } else {
      saveButton.addEventListener('mouseover', (e) => {
        this.renderIcons(e, notLoggedMsg);
      });
      saveButton.addEventListener('mouseout', (e) => {
        this.renderIcons(e, notLoggedMsg);
      });
    }
    saveButton.classList.add('article__save-icon');
    const contentName = document.createElement('h3');
    contentName.classList.add('article__content-name');
    contentName.textContent = data.keyword;
    if (document.location.pathname === '/savearticles') {
      imgContainer.append(img, deleteButton, deleteMsg, contentName);
    } else if (this.isLogin()) {
      imgContainer.append(img, saveButton);
    } else {
      imgContainer.append(img, saveButton, notLoggedMsg);
    }

    const textContainer = document.createElement('div');
    textContainer.classList.add('article__text-container');

    const titleText = document.createElement('h3');
    titleText.classList.add('article__name');
    titleText.textContent = data.title;
    const dateText = document.createElement('p');
    dateText.classList.add('article__date');
    dateText.textContent = this.changeDateFormat(data.date);
    const descText = document.createElement('p');
    descText.classList.add('article__description');
    descText.textContent = data.text;
    const linkContainer = document.createElement('a');
    linkContainer.classList.add('article__link');
    linkContainer.setAttribute('href', `${data.link}`);
    linkContainer.textContent = data.source;
    textContainer.append(titleText, dateText, descText, linkContainer);

    this._container.append(imgContainer, textContainer);
    console.log(this._container);
    return this._container;
  }

  isLogin() {
    if (localStorage && localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  changeDateFormat(date) {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    const month = MONTH_NAME[newDate.getMonth()];
    return `${day} ${month}, ${year}`;
  }

  renderIcons() {
    const button = this._container.querySelector('.article__save-icon');
    const span = this._container.querySelector('.article__signin-msg');
    if (this.isLogin()) {
      if (button.classList.contains('article__save-icon_active')) {
        button.classList.remove('article__save-icon_active');
      } else {
        button.classList.add('article__save-icon_active');
      }
    } else if (button.classList.contains('article__save-icon_hover')) {
      button.classList.remove('article__save-icon_hover');
      span.removeAttribute('style');
    } else {
      button.classList.add('article__save-icon_hover');
      span.setAttribute('style', 'display: block');
    }
  }

  save(e) {
  }
}
