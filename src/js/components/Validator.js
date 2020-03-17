export default class Validator {
  constructor(form, config) {
    this._errorElement = '';
    this._config = config;
    this._form = document.querySelector(`.form__${form}`);
    this._button = this._form.querySelector('.form__button_save');
    this._inputs = Array.from(this._form).filter((item) => item.nodeName === 'INPUT');
    this.connection = config.funcs.mainApi;
    this.popup = config.funcs.popup;
    this.header = config.funcs.header;
    this._regExps = config.regExps;
    this._serverUrl = config.constants.SERVER_URL;
    this._errorConstants = config.errorConstants;
    this._setEventListener(this._inputs, this._form);
    this._disableButton();
  }

  setServerError(res) {
    if (res.status === 500) {
      throw new Error(this._errorConstants.SERVER_INTERNAL_ERROR);
    } else if (res.status === 401) {
      throw new Error(this._errorConstants.SERVER_NOT_AUTHORIZED_ERROR);
    } else if (res.status === 404) {
      throw new Error(this._errorConstants.SERVER_NOT_FOUND_ERROR);
    } else if (res.status === 400) {
      throw new Error(this._errorConstants.SERVER_BAD_REQUEST_ERROR);
    } else if (res.message === 'Такой почтовый ящик уже существует') {
      throw new Error(res.message);
    }
  }

  _setEventListener(inputs, form) {
    inputs.forEach((item) => item.addEventListener('keyup', (event) => {
      this._handleValidate(event);
      this._checkForm(inputs);
    }));
    form.addEventListener('submit', (event) => {
      this._submitForm(event, form, inputs);
    });
  }

  _handleValidate(event) {
    this.resetError(event.target);
  }

  _validate(element) {
    const errorMessages = {
      isempty: this._errorConstants.INPUT_IS_EMPTY_ERROR,
      notmail: this._errorConstants.INPUT_NOT_EMAIL_ERROR,
      littlepass: this._errorConstants.INPUT_SMALL_PASS_ERROR,
      notname: this._errorConstants.INPUT_NOT_NAME_ERROR,
      littlename: this._errorConstants.INPUT_SMALL_NAME_ERROR,
    };
    this._errorElement = document.querySelector(`.error__${element.name}`);
    if (!element.checkValidity()) {
      this._errorElement.textContent = errorMessages.isempty;
      this.activateError(element);
      return false;
    }
    if (element.name == 'password') {
      if (element.value.length < 8) {
        this._errorElement.textContent = errorMessages.littlepass;
        this.activateError(element);
        return false;
      }
    }
    if (element.name == 'email') {
      if (!this._regExps.EMAIL_REGEXP.test(element.value)) {
        this._errorElement.textContent = errorMessages.notmail;
        this.activateError(element);
        return false;
      }
    }
    if (element.name == 'name') {
      if (!this._regExps.NAME_REGEXP.test(element.value)) {
        this._errorElement.textContent = errorMessages.notname;
        this.activateError(element);
        return false;
      }
      if (element.value.length < 2 || element.value.length > 30) {
        this._errorElement.textContent = errorMessages.littlename;
        this.activateError(element);
        return false;
      }
    }
    this.resetError(element);
    return true;
  }

  activateError(element) {
    element.parentNode.classList.add('form__input-container_invalid');
    this._disableButton();
  }

  resetError(element) {
    element.parentNode.classList.remove('form__input-container_invalid');
    // eslint-disable-next-line no-param-reassign
    element.textContent = '';
  }

  _enableButton() {
    this._button.classList.add('form__save-button');
    this._button.removeAttribute('disabled');
  }

  _disableButton() {
    this._button.classList.remove('form__save-button');
    this._button.setAttribute('disabled', true);
  }

  _disableFormElements(form) {
    form.forEach((elem) => {
      elem.setAttribute('disabled', true);
      elem.setAttribute('style', 'background: grey');
    });
  }

  _enableFormElements(form) {
    form.forEach((elem) => {
      elem.removeAttribute('disabled', true);
      elem.removeAttribute('style', 'background: grey');
    });
  }

  _checkForm(inputs) {
    let isValidForm = true;
    inputs.forEach((elem) => {
      if (!this._validate(elem)) {
        isValidForm = false;
      }
    });
    if (isValidForm) {
      this._enableButton();
      return true;
    }
    this._disableButton();
    return false;
  }

  _submitForm(event, form, inputs) {
    event.preventDefault();
    this._checkForm(inputs);
    const formName = form.dataset.form;
    const serverErrorSpan = form.querySelector('.error__server-error');
    if (formName === 'login') {
      this.connection(this._serverUrl, localStorage.getItem('token')).signinUser(inputs[0].value, inputs[1].value)
        .then((res) => {
          this._disableFormElements(this._form);
          if (res.ok) {
            return res.json();
          }
          this.setServerError(res);
        })
        .then((res) => {
          localStorage.setItem('token', res.jwt);
          if (localStorage.getItem('token')) {
            this.popup('#signup-tpl', this._config).render();
            this.header(this._config).clearContent();
            this.header(this._config).render();
          }
        })
        .catch((error) => {
          if (error.message == 'Failed to fetch') {
            serverErrorSpan.textContent = this._errorConstants.SERVER_INTERNAL_ERROR;
            return;
          }
          serverErrorSpan.textContent = error.message;
          console.log(error);
        });
    } else if (formName === 'signup') {
      this.connection(this._serverUrl, localStorage.getItem('token'))
        .signupUser(inputs[0].value, inputs[1].value, inputs[2].value)
        .then((res) => (res.ok ? res.json() : this.setServerError(res)))
        .then(() => {
          this.popup('#signin-tpl', this.classes).render();
          this.popup('#thanks-tpl', this.classes).open();
        })
        .catch((error) => {
          if (error.message == 'Failed to fetch') {
            serverErrorSpan.textContent = this._errorConstants.SERVER_INTERNAL_ERROR;
            return;
          }
          serverErrorSpan.textContent = error.message;
        })
        .finnaly(() => {

        });
    }
  }
}
