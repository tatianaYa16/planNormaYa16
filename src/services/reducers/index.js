import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './burger-ingredients'
import {burgerConstructorReducer} from './burger-constructor'

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer
});