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

export const removeUserName = () => {
  localStorage.removeItem('name');
}
export const saveUserName = (name) => {
  localStorage.setItem('name', name);
}
export const getUserName = () => {
  return localStorage.getItem('name');
}

export const removeHue = () => {
  localStorage.removeItem('hue');
}
export const saveHue = (hue) => {
  localStorage.setItem('hue', hue);
}
export const getHue = () => {
  return localStorage.getItem('hue');
}
