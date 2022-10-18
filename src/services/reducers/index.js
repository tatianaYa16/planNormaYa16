import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './burger-ingredients'
import {burgerConstructorReducer} from './burger-constructor'
import {userReducer} from "./user";
import {feedReducer} from "./feed";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    userReducer: userReducer,
    feed:feedReducer
});