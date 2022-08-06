import {BASE_URL} from "../../utils/configs";
import {checkResponse, saveTokens} from "../../utils/response-utils";
import {getCookie} from "../../utils/cookieUtils";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';


export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const POST_USER_FAILED = 'POST_USER_FAILED';
export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';


export const forgotPasswordFailed = () => {
    return {type: FORGOT_PASSWORD_FAILED};
}
export const resetPasswordFailed = () => {
    return {type: RESET_PASSWORD_FAILED};
}
export const registerFailed = () => {
    return {type: REGISTER_USER_FAILED};
}
export const loginFailed = () => {
    return {type: LOGIN_USER_FAILED};
}
export const logoutFailed = () => {
    return {type: LOGOUT_USER_FAILED};
}
export const getUserFailed = () => {
    return {type: GET_USER_FAILED};
}
export const postUserFailed = () => {
    return {type: POST_USER_FAILED};
}

export const postForgotPassword = (email) => {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })
        const forgotPassword = async (email) => {
            await fetch(BASE_URL + 'password-reset',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email: email})
                })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch({
                            type: FORGOT_PASSWORD_SUCCESS
                        });
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

export const postResetPassword = (password, token) => {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })
        const resetPassword = async (password, token) => {
            await fetch(BASE_URL + 'password-reset/reset',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({password: password, token: token})
                })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch({
                            type: RESET_PASSWORD_SUCCESS
                        });
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


export const postRegisterUser = (password, name, email) => {
    return function (dispatch) {
        dispatch({
            type: REGISTER_USER_REQUEST
        })
        const registerUser = async (password, name, email) => {
            await fetch(BASE_URL + 'auth/register',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({password: password, name: name, email: email})
                })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch({
                            type: REGISTER_USER_SUCCESS,
                            payload: {
                                user: data.user,
                                accessToken: data.accessToken,
                                refreshToken: data.refreshToken
                            }
                        });
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

export const postLoginUser = (password, email) => {
    return function (dispatch) {
        dispatch({
            type: LOGIN_USER_REQUEST
        })
        const loginUser = async (password, email) => {
            await fetch(BASE_URL + 'auth/login',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({password: password, email: email})
                })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch({
                            type: LOGIN_USER_SUCCESS,
                            payload: {
                                user: data.user,
                                accessToken: data.accessToken,
                                refreshToken: data.refreshToken
                            }
                        });
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

export const postLogout = () => {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_USER_REQUEST
        })
        const loginUser = async () => {
            await fetch(BASE_URL + 'auth/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken')
                })
            })
                .then(res => checkResponse(res))
                .then(res => {
                        if (res && res.success) {
                            dispatch({
                                type: LOGOUT_USER_SUCCESS
                            })
                        } else {
                            dispatch(logoutFailed());
                        }
                    }
                )
                .catch(err => {
                    if (err.message === 'jwt expired') {
                        dispatch(refreshToken(postLogout()));
                    }
                    console.log(err);
                    dispatch(logoutFailed());
                })
        }
        loginUser();
    }
}

export const getUserInfo = () => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })
        const userInfo = async () => {
            await fetch(BASE_URL + 'auth/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': getCookie('accessToken')
                }
            })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        console.log(data);
                        dispatch({
                            type: GET_USER_SUCCESS,
                            payload: {
                                user: data.user
                            }
                        })
                    } else {
                        dispatch(getUserFailed())
                    }
                })
                .catch(err => {
                    if (err.message === 'jwt expired') {
                        dispatch(refreshToken(getUserInfo()));
                    }
                    console.log(err)
                    dispatch(getUserFailed())
                })
        }
        userInfo();
    }
}

const refreshToken = (afterRefresh) => (dispatch) => {
    refreshTokenRequest()
        .then((res) => {
            saveTokens(res.refreshToken, res.accessToken);
            dispatch(afterRefresh);
        })
};

export const refreshTokenRequest = () => {
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


export const postUserInfo = (formData) => {
    return async function (dispatch) {
        dispatch({type: POST_USER_REQUEST});
        const patchUser = async () => {
            await fetch(BASE_URL + 'auth/user ', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': getCookie('accessToken')
                },
                body: JSON.stringify(formData)
            })
                .then(data => {
                        if (data && data.success) {
                            dispatch({
                                type: POST_USER_SUCCESS,
                                payload: {
                                    user: data.user
                                }
                            })
                        } else {
                            dispatch(postUserFailed());
                        }
                    }
                )
                .catch(err => {
                    if (err.message === 'jwt expired') {
                        dispatch(refreshToken(patchUser()));
                    }
                    console.log(err);
                    dispatch(postUserFailed());
                })
        }

        patchUser(formData);
    }
}
