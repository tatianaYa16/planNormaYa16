import {BASE_URL} from "../../utils/configs";
import {checkResponse, saveTokens} from "../../utils/response-utils";
import {getCookie} from "../../utils/cookieUtils";
import {
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAILED,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILED,
    LOGOUT_USER_REQUEST,
    GET_USER_REQUEST,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILED

} from '../constants';

import {AppDispatch, AppThunk} from "../types";
import {ITypeIngredient, TUser} from "../../utils/types";
import {IConstructorRemoveIngredient} from "./burger-constructor";
import {ActionCreator} from "redux";
import {Token, TResponseBody} from "../api";

export type TUserActions = | IForgotPasswordFailed
    | IResetPasswordFailed
    | IRegisterFailed
    | ILoginFailed
    | ILogoutFailed
    | IGetUserFailed
    | IPostUserFailed
    | IForgotPasswordSuccess
    | IResetPasswordRequest
    | IGetUserRequest
    | IGetUserSuccess
    | IResetPasswordSuccess
    | IRegisterUserRequest
    | IRegisterUserSuccess
    | ILoginUserRequest
    | ILoginUserSuccess
    | ILogoutUserRequest
    | ILogoutUserSuccess
    | IPostUserRequest
    | IPostUserSuccess;

export interface IPostUserSuccess {
    readonly type: typeof POST_USER_SUCCESS;
    readonly  user: TUser;
}

export const postUserSuccess = (user: TUser): IPostUserSuccess => {
    return {
        type: POST_USER_SUCCESS,
        user: user
    };
}

export interface ILoginUserSuccess {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly  user: TUser;
    readonly  accessToken: string;
    readonly  refreshToken: string;
}

export const loginUserSuccess = (user: TUser, accessToken: string, refreshToken: string): ILoginUserSuccess => {
    return {
        type: LOGIN_USER_SUCCESS,
        user: user,
        refreshToken: refreshToken,
        accessToken: accessToken
    };
}

export interface IRegisterUserSuccess {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly  user: TUser;
    readonly  accessToken: string;
    readonly  refreshToken: string;
}

export const registerUserSuccess = (user: TUser, accessToken: string, refreshToken: string): IRegisterUserSuccess => {
    return {
        type: REGISTER_USER_SUCCESS,
        user: user,
        refreshToken: refreshToken,
        accessToken: accessToken
    };
}

export interface IPostUserRequest {
    readonly type: typeof POST_USER_REQUEST;
}

export const postUserRequest = (): IPostUserRequest => {
    return {type: POST_USER_REQUEST};
}

export interface ILogoutUserSuccess {
    readonly type: typeof LOGOUT_USER_SUCCESS;
}

export const logoutUserSuccess = (): ILogoutUserSuccess => {
    return {type: LOGOUT_USER_SUCCESS};
}

export interface ILogoutUserRequest {
    readonly type: typeof LOGOUT_USER_REQUEST;
}

export const logoutUserRequest = (): ILogoutUserRequest => {
    return {type: LOGOUT_USER_REQUEST};
}

export interface ILoginUserRequest {
    readonly type: typeof LOGIN_USER_REQUEST;
}

export const loginUserRequest = (): ILoginUserRequest => {
    return {type: LOGIN_USER_REQUEST};
}

export interface IRegisterUserRequest {
    readonly type: typeof REGISTER_USER_REQUEST;
}

export const registerUserRequest = (): IRegisterUserRequest => {
    return {type: REGISTER_USER_REQUEST};
}

export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export const resetPasswordSuccess = (): IResetPasswordSuccess => {
    return {type: RESET_PASSWORD_SUCCESS};
}

export interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS;
    readonly  user: TUser;
}

export const getUserSuccess = (user: TUser): IGetUserSuccess => {
    return {
        type: GET_USER_SUCCESS,
        user: user
    };
}

export interface IGetUserRequest {
    readonly type: typeof GET_USER_REQUEST;
}

export const getUserRequest = (): IGetUserRequest => {
    return {type: GET_USER_REQUEST};
}

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export const resetPasswordRequest = (): IResetPasswordRequest => {
    return {type: RESET_PASSWORD_REQUEST};
}

export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export const forgotPasswordSuccess = (): IForgotPasswordSuccess => {
    return {type: FORGOT_PASSWORD_SUCCESS};
}

export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export const forgotPasswordFailed = (): IForgotPasswordFailed => {
    return {type: FORGOT_PASSWORD_FAILED};
}

export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export const resetPasswordFailed = (): IResetPasswordFailed => {
    return {type: RESET_PASSWORD_FAILED};
}

export interface IRegisterFailed {
    readonly type: typeof REGISTER_USER_FAILED;
}

export const registerFailed = (): IRegisterFailed => {
    return {type: REGISTER_USER_FAILED};
}

export interface ILoginFailed {
    readonly type: typeof LOGIN_USER_FAILED;
}

export const loginFailed = (): ILoginFailed => {
    return {type: LOGIN_USER_FAILED};
}

export interface ILogoutFailed {
    readonly type: typeof LOGOUT_USER_FAILED;
}

export const logoutFailed = (): ILogoutFailed => {
    return {type: LOGOUT_USER_FAILED};
}

export interface IGetUserFailed {
    readonly type: typeof GET_USER_FAILED;
}

export const getUserFailed = (): IGetUserFailed => {
    return {type: GET_USER_FAILED};
}

export interface IPostUserFailed {
    readonly type: typeof POST_USER_FAILED;
}

export const postUserFailed = (): IPostUserFailed => {
    return {type: POST_USER_FAILED};
}

export const postForgotPassword: AppThunk = (email: string) => {
    return function (dispatch: AppDispatch) {
        const forgotPassword = async (email: string) => {
            await fetch(BASE_URL + 'password-reset',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email: email})
                })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch(forgotPasswordSuccess());
                    } else {
                        dispatch(forgotPasswordFailed())
                    }
                })
                .catch(err => {
                    console.log(err)
                    dispatch(forgotPasswordFailed())
                })
        }
        forgotPassword(email);
    }
}

export const postResetPassword: AppThunk = (password: string, token: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(resetPasswordRequest())
        const resetPassword = async (password: string, token: string) => {
            await fetch(BASE_URL + 'password-reset/reset',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({password: password, token: token})
                })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch(resetPasswordSuccess());
                    } else {
                        dispatch(resetPasswordFailed())
                    }
                })
                .catch(err => {
                    console.log(err)
                    dispatch(resetPasswordFailed())
                })
        }
        resetPassword(password, token);
    }
}


export const postRegisterUser: AppThunk = (password: string, name: string, email: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(registerUserRequest())
        const registerUser = async (password: string, name: string, email: string) => {
            await fetch(BASE_URL + 'auth/register',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({password: password, name: name, email: email})
                })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch(registerUserSuccess(
                            data.user,
                            data.accessToken,
                            data.refreshToken
                        ));
                    } else {
                        dispatch(registerFailed());
                    }
                })
                .catch(err => {
                    console.log("error: " + err)
                    dispatch(registerFailed())
                })
        }
        registerUser(password, name, email);
    }
}

export const postLoginUser = (password: string, email: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(loginUserRequest())
        const loginUser = async (password: string, email: string) => {
            await fetch(BASE_URL + 'auth/login',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({password: password, email: email})
                })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch(loginUserSuccess(
                            data.user,
                            data.accessToken,
                            data.refreshToken
                        ));
                    } else {
                        dispatch(loginFailed());
                    }
                })
                .catch(err => {
                    console.log("error: " + err)
                    dispatch(loginFailed())
                })
        }
        loginUser(password, email);
    }
}

export const postLogout: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch(logoutUserRequest());
        const loginUser = async () => {
            await fetch(BASE_URL + 'auth/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken')
                }),
            })
                .then(res => checkResponse(res))
                .then(res => {
                        if (res && res.success) {
                            dispatch(logoutUserSuccess())
                        } else {
                            dispatch(logoutFailed());
                        }
                    }
                )
                .catch(err => {
                    if (err.message === 'jwt expired') {
                        refreshToken()
                        postLogout();
                    }
                    console.log(err);
                    dispatch(logoutFailed());
                })
        }
        loginUser();
    }
}

export const getUserInfo: AppThunk = () => {
    return function (dispatch) {
        dispatch(getUserRequest())
        const userInfo = async () => {
            await fetch(BASE_URL + 'auth/user', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getCookie('accessToken')}`
                },
            })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch(getUserSuccess(data.user));
                    } else {
                        dispatch(getUserFailed());
                    }
                })
                .catch(err => {
                    if (err.message === 'jwt expired') {
                       // dispatch(refreshToken(getUserInfo()));
                        refreshToken();
                        getUserInfo();
                    }
                    console.log(err)
                    dispatch(getUserFailed())
                })
        }
        userInfo();
    }
}
//afterRefresh: ActionCreator<TUserActions>
const refreshToken = () => (dispatch: AppDispatch) => {
    refreshTokenRequest()
        .then((res) => {
            saveTokens(res);
           // dispatch(afterRefresh());
        })
};

export const refreshTokenRequest = ():Promise<Token>  => {
    return fetch(BASE_URL + 'auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
        .then(checkResponse)
}


export const postUserInfo: AppThunk = (formData: TUser) => {
    return async function (dispatch: AppDispatch) {
        dispatch(postUserRequest());
        const patchUser = async (formData: TUser) => {
            await fetch(BASE_URL + 'auth/user ', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`${getCookie('accessToken')}`
                },
                body: JSON.stringify(formData)
            }).then(checkResponse)
                .then(data => {
                        console.log(data.success);
                        console.log(data.user);
                        if (data && data.success) {
                            dispatch(postUserSuccess(data.user))
                        } else {
                            dispatch(postUserFailed());
                        }
                    }
                )
                .catch(err => {
                    if (err.message === 'jwt expired') {
                       // dispatch(refreshToken(postUserInfo(formData)));
                        refreshToken();
                        postUserInfo(formData);
                    }
                    console.log('jwt');
                    console.log(err);
                    dispatch(postUserFailed());
                })
        }

        patchUser(formData);
    }
}
