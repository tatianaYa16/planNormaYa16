import {
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_REMOVE_INGREDIENT,
    CONSTRUCTOR_MOVE_INGREDIENT
} from '../actions/burger-constructor';

const initialState = {
    order: null,
    ingredients: [],
    bun: null,
    totalPrice: 0
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTRUCTOR_ADD_BUN: {
            return {
                ...state,
                bun: action.bun
            }
        }
        case CONSTRUCTOR_ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.item]
            }
        }
        case CONSTRUCTOR_REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uuid !== action.id)
            }
        }
        case CONSTRUCTOR_MOVE_INGREDIENT: {
            let ingredients = [...state.ingredients];
            const dragIngredient= ingredients[action.dragIndex];
            ingredients.splice(action.dragIndex, 1);
            ingredients.splice(action.hoverIndex, 0, dragIngredient);
            return {
                ...state,
                ingredients: ingredients
            }
        }
        default:
            return state;
    }
}
