import {BASE_URL} from '../../utils/configs';
import {checkResponse} from '../../utils/response-utils';

import {
    INGREDIENTS_FAILED,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENT_MODAL_CLOSE,
    INGREDIENT_MODAL_OPEN
} from "../constants";
import {ITypeIngredient} from "../../utils/types";
import {TResponseBody} from "../api";
import {AppDispatch, AppThunk} from "../types";

export interface IIngredientsFailed {
    readonly type: typeof INGREDIENTS_FAILED;
}

export interface IIngredientsRequest {
    readonly type: typeof INGREDIENTS_REQUEST;
}

export interface IIngredientModalClose {
    readonly type: typeof INGREDIENT_MODAL_CLOSE;
}

export interface IIngredientModalOpen {
    readonly type: typeof INGREDIENT_MODAL_OPEN;
}

export interface IIngredientsSuccess {
    readonly type: typeof INGREDIENTS_SUCCESS;
    readonly  ingredients: ReadonlyArray<ITypeIngredient>
}

export type TBurgerIngredientActions =
    | IIngredientsSuccess
    | IIngredientModalOpen
    | IIngredientModalClose
    | IIngredientsFailed
    | IIngredientsRequest;

export const ingredientsFailed = (): IIngredientsFailed => {
    return {type: INGREDIENTS_FAILED};
}

export const ingredientsRequest = (): IIngredientsRequest => {
    return {type: INGREDIENTS_REQUEST};
}

export const ingredientModalOpen = (): IIngredientModalOpen => {
    return {type: INGREDIENT_MODAL_OPEN};
}

export const ingredientModalClose = (): IIngredientModalClose => {
    return {type: INGREDIENT_MODAL_CLOSE};
}

export const ingredientsSuccess = (ingredients: ReadonlyArray<ITypeIngredient>): IIngredientsSuccess => {
    return {
        type: INGREDIENTS_SUCCESS,
        ingredients
    };
}


export const getIngredientsThunk: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(ingredientsRequest())
    getIngredients().then(data => {
        if (data && data.success) {
            dispatch(ingredientsSuccess(data.data));
        } else {
            dispatch(ingredientsFailed())
        }
    }).catch(err => {
        console.log(err)
        dispatch(ingredientsFailed())
    });
};

export const getIngredients = async (): Promise<TResponseBody<'data', any>> =>
    await fetch(BASE_URL + 'ingredients')
        .then(checkResponse)
        .then(data => data);
