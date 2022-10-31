import {setCookie} from "./cookieUtils";

export const checkResponse = (res:Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const saveTokens = (refreshToken:string, accessToken:string) => {
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

