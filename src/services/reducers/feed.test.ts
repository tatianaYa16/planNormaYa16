import { AnyAction } from 'redux';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_ORDER_GET
} from '../actions/feed';

import { feedInitialState, feedReducer } from './feed';

describe('Feed reducer', () => {
    it('Should return the initial state', () => {
        expect(feedReducer(undefined, {} as AnyAction)).toEqual(feedInitialState);
    });

    it('Should handle WS_CONNECTION_SUCCESS', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS
        };

        const expectedState = {
            ...feedInitialState,
            wsConnected: true,
        };

        expect(feedReducer(feedInitialState, action)).toEqual(expectedState);
    });

    it('Should handle WS_CONNECTION_ERROR', () => {
        const action = {
            type: WS_CONNECTION_ERROR
        };

        const expectedState = {
            ...feedInitialState,
            wsConnected: false,
        };

        expect(feedReducer(feedInitialState, action)).toEqual(expectedState);
    });

    it('Should handle WS_CONNECTION_CLOSED', () => {
        const action = {
            type: WS_CONNECTION_CLOSED
        };

        const expectedState = {
            ...feedInitialState,
            wsConnected: false,
        };

        expect(feedReducer(feedInitialState, action)).toEqual(expectedState);
    });

    it('Should handle WS_ORDER_GET', () => {
        const action = {
            type: WS_ORDER_GET,
            payload: {
                orders: [{
                    ingredients: [
                        '60d3b41abdacab0026a733c6',
                        '60d3b41abdacab0026a733cd'
                    ],
                    _id: '62a9bbb7fa747e001bd5247a',
                    status: 'done',
                    name: 'Space краторный бургер',
                    number: 17641,
                    createdAt: '2022-06-15T11:00:07.109Z',
                    updatedAt: '2022-06-15T11:00:07.456Z'
                }],
                total: 100,
                totalToday: 10
            }

        };

        const expectedState = {
            ...feedInitialState,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday
        };

        expect(feedReducer(feedInitialState, action)).toEqual(expectedState);
    });
});