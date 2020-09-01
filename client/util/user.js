export const removeUserId = () => {
  localStorage.removeItem('uId');
}

export const getUserId = () => {
  if (localStorage.getItem('uId') === null) {
    let uId = Date.now() + Math.floor(Math.random() * 1000);
    localStorage.setItem('uId', uId);
  }
  return localStorage.getItem('uId');
}

