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
import {TUserActions} from "../actions/user";

import {setCookie, deleteCookie} from "../../utils/cookieUtils";
import {saveTokens} from "../../utils/response-utils";
import {TUser} from "../api";

export type TUserState = {
    forgotPasswordRequest: boolean,
    resetPasswordRequest: boolean,
    registerUserRequest: boolean,
    isAuth: boolean,
    user?: TUser,
    getUserSuccess: boolean,
    getUserRequest: boolean,
    getUserFailed: boolean,
    postUserSuccess: boolean,
    postUserRequest: boolean,
    postUserFailed: boolean,
    accessToken?: boolean,
    refreshToken?: boolean
};
const initialState:TUserState = {
    forgotPasswordRequest: false,
    resetPasswordRequest: false,
    registerUserRequest: false,
    isAuth: false,
    user: undefined,
    getUserSuccess: false,
    getUserRequest: false,
    getUserFailed: false,
    postUserSuccess: false,
    postUserRequest: false,
    postUserFailed: false,
    accessToken: undefined,
    refreshToken: undefined
}

export const userReducer = (state = initialState, action:TUserActions):TUserState => {
    switch (action.type) {
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: true
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordRequest: false
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: true
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false
            }
        }
        case REGISTER_USER_SUCCESS: {
            saveTokens({refreshToken:action.refreshToken,accessToken: action.accessToken});
            return {
                ...state,
                registerUserRequest: true
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerUserRequest: false
            }
        }
        case LOGIN_USER_SUCCESS: {
            saveTokens({refreshToken:action.refreshToken,accessToken: action.accessToken});
            return {
                ...state,
                user: <TUser>{name: action.user.name, email: action.user.email},
                isAuth: true
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                isAuth: false,
                user: undefined
            }
        }
        case LOGOUT_USER_SUCCESS: {
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
            return {
                ...state,
                user: undefined,
                isAuth: false
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                getUserFailed: false,
                getUserRequest: false,
                getUserSuccess: true
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserFailed: false,
                getUserSuccess: false,
                getUserRequest: true
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserFailed: true,
                getUserSuccess: false,
                getUserRequest: false
            }
        }

        case POST_USER_REQUEST: {
            return {
                ...state,
                postUserFailed: false,
                postUserSuccess: false,
                postUserRequest: true
            }
        }
        case POST_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                postUserFailed: false,
                postUserSuccess: true,
                postUserRequest: false
            }
        }
        case POST_USER_FAILED: {
            return {
                ...state,
                postUserFailed: true,
                postUserSuccess: false,
                postUserRequest: false
            }
        }
        default:
            return state;
    }
}