export default function isLogged() {
  if (localStorage.getItem('token')) {
    console.log(123);
    return true;
  }
  return false;
}
