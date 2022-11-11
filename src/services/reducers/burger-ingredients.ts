import {
    INGREDIENTS_FAILED,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENT_MODAL_CLOSE,
    INGREDIENT_MODAL_OPEN
} from "../constants";
import {TBurgerIngredientActions} from "../actions/burger-ingredients";
import {ITypeIngredient} from "../../utils/types";


export type TBurgerIngredientState = {
    ingredients: ReadonlyArray<ITypeIngredient>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    modal: boolean,
    ingredient?: ITypeIngredient
};

export const initialState: TBurgerIngredientState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    modal: false,
    ingredient: undefined
};

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientActions): TBurgerIngredientState => {
    switch (action.type) {
        case INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            }
        }
        case INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients
            }
        }
        case INGREDIENT_MODAL_CLOSE: {
            return {
                ...state,
                ingredient: undefined,
                modal: false
            }
        }
        case INGREDIENT_MODAL_OPEN: {
            return {
                ...state,
                modal: true
            }
        }
        default:
            return state;
    }
}