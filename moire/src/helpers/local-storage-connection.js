export { getUserFromLocalStorage, setUserToLocalStorage };
const emptyUser = {
  id: null,
  userAccessKey: '',
};

function getUserFromLocalStorage() {
  return localStorage.getItem('moireUser')
    ? JSON.parse(localStorage.getItem('moireUser'))
    : emptyUser;
}

function setUserToLocalStorage(user) {
  localStorage.setItem('moireUser', JSON.stringify(user));
}
