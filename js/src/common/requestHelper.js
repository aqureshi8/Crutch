import jQuery from 'jquery';

let backendHost;
let cors;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if (hostname === 'crutch.com') {
  backendHost = 'https://www.crutch.com/';
  cors = 'cors';
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8000/';
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function getCsrfToken() {
    return getCookie('csrftoken');
}

export const URL_ROOT = `${backendHost}`;
export const CORS = cors;
export { getCookie, getCsrfToken };