export { getUserFromLocalStorage, setUserToLocalStorage };

function getUserFromLocalStorage() {
  return localStorage.getItem('moireUser')
    ? JSON.parse(localStorage.getItem('moireUser'))
    : false;
}

function setUserToLocalStorage(user) {
  localStorage.setItem('moireUser', JSON.stringify(user));
}
