import {TOrder} from "../types/types";
import {createReducer} from "@reduxjs/toolkit";
import {wsClose, wsConnecting, wsError, wsMessage} from "../actions/feed";


// import {
//     WS_CONNECTION_SUCCESS,
//     WS_CONNECTION_ERROR,
//     WS_CONNECTION_CLOSED,
//     WS_ORDER_GET,
//     TFeedActions
// } from '../actions/feed';
// import { TFeedState } from '../types/types';
//

export type TFeedState = {
    wsConnected: boolean;
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
};

const feedInitialState: TFeedState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
};

export const feedReducer = createReducer(feedInitialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.wsConnected = true;
        })
        .addCase(wsError, (state) => {
            state.wsConnected = false;
        })
        .addCase(wsClose, (state) => {
            state.wsConnected = false;
        })
        .addCase(wsMessage, (state, action) => {
            state.wsConnected = false;
            state.orders =  action.payload.orders;
            state.total =  action.payload.total;
            state.totalToday =  action.payload.totalToday;
        })
})
//
// export const feedReducer = (state = feedInitialState, action: TFeedActions): TFeedState => {
//     switch (action.type) {
//         case WS_CONNECTION_SUCCESS: {
//
//             return {
//                 ...state,
//                 wsConnected: true,
//             };
//             console.log('WS_CONNECTION_SUCCESS');
//         }
//
//         case WS_CONNECTION_ERROR: {
//
//             return {
//                 ...state,
//                 wsConnected: false,
//             };
//         }
//
//         case WS_CONNECTION_CLOSED: {
//
//             return {
//                 ...state,
//                 wsConnected: false,
//             };
//         }
//
//         case WS_ORDER_GET: {
//
//             return {
//                 ...state,
//                 orders: action.payload.orders,
//                 total: action.payload.total,
//                 totalToday: action.payload.totalToday
//             };
//             console.log(state.orders);
//         }
//
//         default: {
//
//             return state;
//         }
//     }
// };