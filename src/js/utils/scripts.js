function isLogin() {
  if (localStorage && localStorage.getItem('token')) {
    return true;
  }
  return false;
}

function checkHttps() {
  const httpsRegExp = /https:\/\//;
  if (httpsRegExp.test(document.location.href)) {
    return 'https://';
  }
  return 'http://';
}
export {
  isLogin,
  checkHttps,
};
