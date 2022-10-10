import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Action, ActionCreator, Dispatch} from 'redux';
import {store} from '../store';
import {TBurgerConstructorActions} from '../actions/burger-constructor';
import {TBurgerIngredientActions} from '../actions/burger-ingredients';
import {TUserActions} from "../actions/user";

type TApplicationActions = | TBurgerConstructorActions | TBurgerIngredientActions |TUserActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = Dispatch<TApplicationActions>;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
    >;