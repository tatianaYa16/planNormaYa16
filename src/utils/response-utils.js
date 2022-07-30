import {setCookie} from "./cookieUtils";

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const saveTokens = (refreshToken, accessToken) => {
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

