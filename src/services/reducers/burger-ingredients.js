import {
    INGREDIENTS_FAILED,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS
} from "../actions/burger-ingredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
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
        }
        default:
            return state;
    }
}