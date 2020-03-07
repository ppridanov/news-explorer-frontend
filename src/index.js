import './style.css';
import EventListener from './js/components/EventListener';
import Popup from './js/components/Popup';
import isLogged from './js/utils/scripts'
import Validator from './js/components/Validator';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';

// import EventListener from './js/components/EventListener';
new EventListener()._setEventListener();

isLogged();
new Header().render();
