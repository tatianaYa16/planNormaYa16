import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Action, ActionCreator, Dispatch} from 'redux';
import {store} from '../store';
import {TBurgerConstructorActions} from '../actions/burger-constructor';
import {TBurgerIngredientActions} from '../actions/burger-ingredients';
import {TUserActions} from "../actions/user";
import {TFeedActions} from "../actions/feed";

type TApplicationActions =
    | TBurgerConstructorActions
    | TBurgerIngredientActions
    | TUserActions
    | TFeedActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = Dispatch<TApplicationActions>;

//export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType, // return value type
//     RootState, // app state type
//     never, // extra argument type
//     TApplicationActions // action type
//     >;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;