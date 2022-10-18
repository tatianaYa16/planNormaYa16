import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from "./reducers";
import {socketMiddleware} from "./middleware";
import {WS_URL} from "../utils/configs";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, configureStore, createAction} from "@reduxjs/toolkit";
import {TOrders} from "./types/types";

import {
    wsInit as FeedWsInit,
    wsConnecting as FeedWsConnecting ,
    wsOpen as FeedWsOpen,
    wsClose as FeedWsClose,
    wsMessage as FeedWsMessage,
    wsError as  FeedWsError
} from './actions/feed';

const wsFeedActions = {
    wsInit: FeedWsInit,
    wsConnecting: FeedWsConnecting,
    onOpen: FeedWsOpen,
    onClose: FeedWsClose,
    onError: FeedWsError,
    onMessage: FeedWsMessage
}

declare global {
    interface Window {
        // @ts-ignore
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const feedMiddleware = socketMiddleware(wsFeedActions);
export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(feedMiddleware)
    }
})

export type RootState = ReturnType<typeof rootReducer>;
export const container = document.getElementById('root');