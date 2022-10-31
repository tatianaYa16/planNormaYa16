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
    POST_USER_FAILED, FORGOT_PASSWORD_REQUEST

} from '../constants';
import {initialState, userReducer} from './user';
import {AnyAction} from "redux";
import {TUserActions} from "../actions/user";
import {TUser} from "../../utils/types";

describe('Auth reducer', () => {
    const user: TUser = {name: "userTest", email: "test@email.com"};
    const userUpdate = {name: "userTestUpdate", email: "testUpdate@email.com"};

    it('Should return the initial state', () => {
        expect(userReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('Should handle FORGOT_PASSWORD_SUCCESS', () => {
        const action: TUserActions = {
            type: FORGOT_PASSWORD_SUCCESS
        };

        const expectedState = {
            ...initialState,
            forgotPasswordRequest: true
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle FORGOT_PASSWORD_FAILED: {\n', () => {
        const action: TUserActions = {
            type: FORGOT_PASSWORD_FAILED
        };

        const expectedState = {
            ...initialState,
            forgotPasswordRequest: false
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle RESET_PASSWORD_SUCCESS', () => {
        const action: TUserActions = {
            type: RESET_PASSWORD_SUCCESS
        };

        const expectedState = {
            ...initialState,
            resetPasswordRequest: true
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle RESET_PASSWORD_FAILED', () => {
        const action: TUserActions = {
            type: RESET_PASSWORD_FAILED
        };

        const expectedState = {
            ...initialState,
            resetPasswordRequest: false
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle REGISTER_USER_SUCCESS', () => {
        const action: TUserActions = {
            type: REGISTER_USER_SUCCESS,
            user,
            accessToken: '134124134',
            refreshToken: 'kfjkjdhgkjhdf324'
        };

        const expectedState = {
            ...initialState,
            registerUserRequest: true
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle REGISTER_USER_FAILED', () => {
        const action:TUserActions = {
            type: REGISTER_USER_FAILED
        };

        const expectedState = {
            ...initialState,
            registerUserRequest: false
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle LOGIN_USER_SUCCESS', () => {
        const action:TUserActions = {
            type: LOGIN_USER_SUCCESS,
            user,
            accessToken: '134124134',
            refreshToken: 'kfjkjdhgkjhdf324'
        };

        const expectedState = {
            ...initialState,
            user:action.user,
            isAuth: true
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle LOGIN_USER_FAILED', () => {
        const action:TUserActions = {
            type: LOGIN_USER_FAILED
        };

        const expectedState = {
            ...initialState,
            isAuth: false
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle GET_USER_SUCCESS', () => {
        const action:TUserActions = {
            type: GET_USER_SUCCESS,
            user
        };

        const expectedState = {
            ...initialState,
            user: action.user,
            getUserFailed: false,
            getUserRequest: false,
            getUserSuccess: true
        };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

});