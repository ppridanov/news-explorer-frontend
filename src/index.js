import './style.css';
import EventListener from './js/components/EventListener';
import MainApi from './js/api/MainApi';
import Popup from './js/components/Popup';
// import EventListener from './js/components/EventListener';
new EventListener()._setEventListener();

const popup = new Popup('#signin-tpl');
