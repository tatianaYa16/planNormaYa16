import {
    INGREDIENTS_FAILED,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENT_MODAL_CLOSE,
    INGREDIENT_MODAL_OPEN
} from "../actions/burger-ingredients";


const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    modal: false,
    ingredient:null
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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
        }case INGREDIENT_MODAL_CLOSE: {
            return {
                ...state,
                ingredient: null,
                modal: false
            }
        }
        case INGREDIENT_MODAL_OPEN: {
            return {
                ...state,
                modal: true,
                ingredient: action.ingredient
            }
        }
        default:
            return state;
    }
}