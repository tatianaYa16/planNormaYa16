import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Action, ActionCreator, Dispatch} from 'redux';
import {TBurgerConstructorActions} from '../actions/burger-constructor';
import {TBurgerIngredientActions} from '../actions/burger-ingredients';
import {TUserActions} from "../actions/user";
import {TFeedActions} from "../actions/feed";
import {rootReducer} from "../reducers";
import {store} from "../store";

type TApplicationActions =
    | TBurgerConstructorActions
    | TBurgerIngredientActions
    | TUserActions
    | TFeedActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;


//export type AppDispatch= typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, // return value type
    RootState, // app state type
    never, // extra argument type
    TApplicationActions // action type
    >;


//export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

//export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType, // return value type
//     RootState, // app state type
//     never, // extra argument type
//     TApplicationActions // action type
//     >;