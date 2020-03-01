import {connection} from './api';


const signinForm = document.forms.login;
const signupForm = document.forms.signup;
const searchForm = document.forms.search;

const emailSigninInput = signinForm.elements.signinemail;
const passSigninInput = signinForm.elements.signinpassword;
const emailSignupInput = signupForm.elements.signupemail;
const passSignupInput = signupForm.elements.signuppassword;
const nameSignupInput = signupForm.elements.signupname;
const searchInput = searchForm.elements.searchinput;
const searchButton = document.querySelector('.search__submit-button');
const submitButton = document.querySelectorAll('.popup__button');
let savedTextButton = '';

console.log(emailSignupInput, emailSigninInput)
export class Validator {
  constructor() {
    emailSigninInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkForm(signinForm);
    });
    passSigninInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkForm(signinForm);
    });
    emailSignupInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkForm(signupForm);
    });
    passSignupInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkForm(signupForm);
    });
    nameSignupInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkForm(signupForm);
    })
    searchInput.addEventListener('input', (event) => {
      this.handleValidate(event);
      this.checkForm(searchForm);
    })
    signinForm.addEventListener('submit', this.submitForm);
    this.resetForms();
  }
  handleValidate (event) {
    this.resetError(event.target);
  }
  validate(element) {
    const errorMessages = {
      isempty: 'Это обязательное поле',
      notmail: 'Неправильный формат email',
      littlepass: 'Длинна пароля должна быть не менее 8 символов',
      notname: 'Неправильный формат имени. Пример: \'Петр\'',
      littlename: 'Должно быть от 2 до 30 символов'
    };
    let errorElement = document.querySelector(`.error__${element.name}`);
    if (!element.checkValidity()) {
      errorElement.textContent = errorMessages.isempty;
      this.activateError(element);
      return false;
    }
    if (element.name == passSigninInput.name || element.name == passSignupInput.name) {
      if (element.value.length < 8) {
        errorElement.textContent = errorMessages.littlepass;
        this.activateError(element);
        return false;
      }
    }
    if (element.name == emailSignupInput.name || element.name == emailSigninInput.name) {
      let emailRegExp = /^([a-z0-9_\-.]{2,})@([\w\-.]+)\.([a-z]{2,})$/;
      if (!emailRegExp.test(element.value)) {
        errorElement.textContent = errorMessages.notmail;
        this.activateError(element);
        return false;
      }
    }
    if (element.name == nameSignupInput.name) {
      let nameRegExp = /^([А-ЯЁ][а-яё]+([\-/{1}]?[А-Я]{1}?[а-я]+?)?)$/;
      if (!nameRegExp.test(element.value)) {
        errorElement.textContent = errorMessages.notname;
        this.activateError(element);
        return false;
      }
      if (element.value.length < 2 || element.value.length > 30) {
        errorElement.textContent = errorMessages.littlename;
        this.activateError(element);
        return false;
      }
    }
    return true;
  }
  resetForms() {
    signinForm.reset();
    signupForm.reset();
    searchForm.reset();
    signinForm.forEach((e) => {
      if (e != submitButton[0]) {
        this.resetError(e);
      }
    })
    signupForm.forEach((e) => {
      if (e != submitButton[1]) {
        this.resetError(e);
      }
    })

  }
  activateError(element) {
    element.parentNode.classList.add('popup__input-container_invalid');
    this.disableButton;
  }
  resetError(element) {
    element.parentNode.classList.remove('popup__input-container_invalid');
    element.textContent = '';
  }
  enableButton() {
    submitButton.forEach(elem => {
      elem.classList.add('popup__save-button');
      elem.removeAttribute('disabled');
    });
  }
  disableButton() {
    submitButton.forEach(elem => {
      elem.classList.remove('popup__save-button');
      elem.setAttribute('disabled', true);
    });
  }
  checkForm(form) {
    let isValidForm = true;
    const inputs = Array.from(form.elements);
    inputs.forEach(elem => {
      if (!this.validate(elem)) {
        isValidForm = false;
      }
    });
    if (isValidForm) {
      this.enableButton();
      return true;
    } else {
      this.disableButton();
      return false;
    }
  }
  renderLoading(isLoading, button) {
    if (isLoading) {
      savedTextButton = button.textContent;
      console.log(savedTextButton);
      button.textContent = 'Загрузка...';
    } else {
      console.log(savedTextButton);
      button.textContent = savedTextButton;
    }
  }
  submitForm(event) {
    event.preventDefault();
    let checkFormClass = event.target.className;
    if (checkFormClass == signinForm.className) {
      if (validator.checkForm(signinForm)) {
        validator.renderLoading(true, submitButton[0]);
        validator.disableButton();
        connection.signin(emailSigninInput.value, passSigninInput.value)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          const serverErrorMess = document.querySelector('.error__server-error');
          if (err == 401) {
            serverErrorMess.textContent = "Ошибка авторизации. Проверьте правильность введенных данных";
          } else {
            serverErrorMess.textContent = "Ошибка сервера. Попробуйте позднее";
          }
        })
        .finally(() => {
          validator.renderLoading(false, submitButton[0]);
          validator.enableButton();
        })
        console.log('submit event')
      };
    } else if (validator.checkForm(signupForm)) {
      console.log(1234);
    }
  }
}

export const validator = new Validator();