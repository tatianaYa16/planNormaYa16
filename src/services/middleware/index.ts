import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware, MiddlewareAPI} from "@reduxjs/toolkit"
import {RootState} from "../types";
import {wsError, wsMessage, wsOpen} from "../actions/feed";

export type TwsActionTypes = {
    wsInit: ActionCreatorWithPayload<string>,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return store=> {
        let socket: WebSocket | null = null
        let url = ''
        let isConnected = false
        let reconnectTimer = 0

        return next => action => {
            const { dispatch } = store;
            const {wsInit, onOpen, onClose, onError, onMessage, wsConnecting} = wsActions;

            if (wsInit.match(action)) {
                url = action.payload
                if (socket) { socket.close() }
                socket = new WebSocket(url)
                isConnected = true
                clearTimeout(reconnectTimer)
                dispatch(wsConnecting())
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsOpen());
                }

                socket.onerror = (event) => {
                    dispatch(wsError(event.type));
                }

                socket.onmessage = (event) => {
                    const { data } = event
                    const parsedData = JSON.parse(data)
                    dispatch(wsMessage(parsedData))
                }

                socket.onclose = event => {
                    dispatch(onClose())

                    if (isConnected) {
                        dispatch(wsConnecting())
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsInit(url))
                        }, 3000)
                    }
                }

                // if (wsDisconnect.match(action)) {
                //     clearTimeout(reconnectTimer)
                //     isConnected = false
                //     reconnectTimer = 0
                //     socket.close()
                //     dispatch(onClose())
                // }
            }

            next(action)
        }
    }
}
// import {
//     TWSOrderActions
// } from "../actions/feed";
// import {Middleware, MiddlewareAPI} from "redux";
// import {AppDispatch, RootState} from "../types";
//
// export const socketMiddleware = (
//     wsUrl: string,
//     wsActions: TWSOrderActions,
// ): Middleware => {
//     return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
//         let socket: WebSocket | null = null;
//         console.log('socketMiddleware');
//         return (next) => (action) => {
//             const {dispatch} = store;
//             const {type, payload} = action;
//             const {wsInit, onOpen, onClose, onError, onOrders} = wsActions;
//
//             if (type === wsInit) {
//                 wsUrl = payload;
//                 socket = new WebSocket(wsUrl);
//             }
//
//             if (socket) {
//                 console.log('onopen');
//                 socket.onopen = (event) => {
//                     dispatch({type: onOpen, payload: event});
//                 };
//
//                 socket.onerror = (event) => {
//                     dispatch({type: onError, payload: event});
//                 };
//
//                 socket.onclose = (event) => {
//                     dispatch({type: onClose, payload: event});
//                 };
//
//                 socket.onmessage = (event) => {
//                     console.log('onmessage');
//                     const {data} = event;
//                     const parsedData = JSON.parse(data);
//                     dispatch({type: onOrders, payload: parsedData});
//                 };
//             }
//             if (wsDisconnect.match(action)) {
//                 clearTimeout(reconnectTimer)
//                 isConnected = false
//                 reconnectTimer = 0
//                 socket.close()
//                 dispatch(onClose())
//             }
//
//             next(action);
//         };
//     }) as Middleware;
// };