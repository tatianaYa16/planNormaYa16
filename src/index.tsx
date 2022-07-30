import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./services/reducers";
import {composeWithDevTools} from '@redux-devtools/extension';
import {BrowserRouter} from "react-router-dom";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <DndProvider backend={HTML5Backend}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </DndProvider>
        </React.StrictMode>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
