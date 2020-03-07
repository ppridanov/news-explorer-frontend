// eslint-disable-next-line import/no-cycle
import { connect } from './Validator';

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
      connect.getUserInfo()
        .then((res) => {
          logOutButton.textContent = res.name;
        })
        .catch((err) => console.log(err));
      this._setEventListener();
    } else {
      _template = document.querySelector('#header-notlogged-tpl');
      this._container.prepend(_template.content.cloneNode(true));
    }
  }

  _setEventListener() {
    this._container.querySelector('.nav__logout-button').addEventListener('click', (e) => {
      if (this._logOut()) {
        localStorage.clear();
        this.clearContent();
        this.render();
      }
    });
  }

  _logOut() {
    if (localStorage != undefined && localStorage.getItem('token')) {
      localStorage.clear();
      return true;
    }
    return false;
  }

  clearContent() {
    this._element = this._container.querySelector('.nav').remove();
  }
}
