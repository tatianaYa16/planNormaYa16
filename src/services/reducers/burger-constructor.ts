import {
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_REMOVE_INGREDIENT,
    CONSTRUCTOR_MOVE_INGREDIENT,
    MODAL_CLOSE,
    MODAL_OPEN,
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILED
} from '../constants';

import {TBurgerConstructorActions} from "../actions/burger-constructor";
import {ITypeIngredient} from "../../utils/types";

export type TBurgerConstructor = {
    orderNumber?: number;
    ingredients: ReadonlyArray<ITypeIngredient>
    bun?:ITypeIngredient
    totalPrice: number;
    modal: boolean;
    orderRequest: boolean;
    orderFailed: boolean;
};
const initialState:TBurgerConstructor = {
    orderNumber: undefined,
    ingredients: [],
    bun: undefined,
    totalPrice: 0,
    modal: false,
    orderRequest: false,
    orderFailed: false
}

export const burgerConstructorReducer = (state = initialState, action:TBurgerConstructorActions):TBurgerConstructor => {
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
            const dragIngredient = ingredients[action.dragIndex];
            ingredients.splice(action.dragIndex, 1);
            ingredients.splice(action.hoverIndex, 0, dragIngredient);
            return {
                ...state,
                ingredients: ingredients
            }
        }
        case ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false,
                orderFailed: false
            }
        }
        case ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            }
        }
        case MODAL_CLOSE: {
            return {
                ...state,
                orderNumber: undefined,
                ingredients: [],
                bun: undefined,
                modal: false
            }
        }
        case MODAL_OPEN: {
            return {
                ...state,
                modal: true
            }
        }
        default:
            return state;
    }
}
