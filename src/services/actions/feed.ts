import {TOrders} from "../types/types";
import { createAction } from "@reduxjs/toolkit"

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_ORDER_GET: 'WS_ORDER_GET' = 'WS_ORDER_GET';
export const WS_CONNECTION_OPEN: 'WS_CONNECTION_OPEN' = 'WS_CONNECTION_OPEN';


export const wsInit = createAction<string, 'WS_CONNECTION_START'>('WS_CONNECTION_START');
export const wsConnecting = createAction('WS_CONNECTION_SUCCESS');
export const wsOpen = createAction('WS_CONNECTION_OPEN');
export const wsClose = createAction('WS_CONNECTION_CLOSED');
export const wsMessage = createAction<TOrders, 'WS_ORDER_GET'>('WS_ORDER_GET');
export const wsError = createAction<string, 'WS_CONNECTION_ERROR'>('WS_CONNECTION_ERROR');

export type TFeedActions =
    ReturnType<typeof wsInit>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;
