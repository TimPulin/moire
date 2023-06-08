export { getUserAccessKeyFromLocalStorage, setUserAccessKeyToLocalStorage };

function getUserAccessKeyFromLocalStorage() {
  return localStorage.getItem('userAccessKey')
    ? localStorage.getItem('userAccessKey')
    : '';
}

function setUserAccessKeyToLocalStorage(userAccessKey) {
  localStorage.set('userAccessKey', userAccessKey);
}
