// export const defaultApiURI = "https://serene-fortress-81927.herokuapp.com/api/";
// export const defaultImageURI =
//   "https://serene-fortress-81927.herokuapp.com/images/";

export const Constants = {
  defaultApiURI: "https://serene-fortress-81927.herokuapp.com/api/",
  defaultImageURI: "https://serene-fortress-81927.herokuapp.com/images/",
  // defaultApiURI: "http://localhost:5000/api/",
  // defaultImageURI: "http://localhost:5000/images/",
};

export const getParam = (paramName) => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName) || "";
  return paramValue;
};

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim().length === 0) ||
  (typeof value === "object" && Object.keys(value).length === 0);

export const generateErrorMarkup = (message) => {
  return `<h4 class='text-danger col-12 text-center'>${message}</h4>`;
};

export const createCookie = (name, value, days) => {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
};

export const readCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
