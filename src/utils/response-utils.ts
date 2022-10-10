import {setCookie} from "./cookieUtils";
import {Token} from "../services/api";

export const checkResponse = (res:Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const saveTokens = (res:Token)=> {
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
}

