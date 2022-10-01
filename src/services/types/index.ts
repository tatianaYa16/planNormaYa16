import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator, Dispatch} from 'redux';
import {store} from '../store';
import {TBurgerConstructorActions} from '../actions/burger-constructor';
import {TBurgerIngredientActions} from '../actions/burger-ingredients';

type TApplicationActions = | TBurgerConstructorActions | TBurgerIngredientActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = Dispatch<TApplicationActions>; //typeof store.dispatch;

export type AppThunk<ReturnType = void> =
    ActionCreator<
        ThunkAction<ReturnType, Action, RootState, TApplicationActions>
        >;