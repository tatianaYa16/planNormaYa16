import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './burger-ingredients'

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer
});