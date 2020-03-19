import './style.css';
import { functions as funcs } from './js/utils/scripts';
import { constants, selectors, regExps } from './js/constans/constans';
import errorConstants from './js/constans/error-constans';

const config = {
  funcs,
  constants,
  regExps,
  selectors,
  errorConstants,
};
funcs.header(config).render();
funcs.eventListener(config);
funcs.newsCardList(config);
