import {
    INGREDIENTS_FAILED,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENT_MODAL_CLOSE,
    INGREDIENT_MODAL_OPEN
} from "../constants";
import { initialState, burgerIngredientsReducer } from './burger-ingredients';
import {AnyAction} from "redux";
import {ITypeIngredient} from "../../utils/types";
import {IIngredientsSuccess} from "../actions/burger-ingredients";

describe('burgerIngredients reducer', () => {
    const dataIngredients: ITypeIngredient[] = [{
        uuid: 123123123,
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }];

    it('Should return the initial state', () => {
        expect(burgerIngredientsReducer(undefined, {} as AnyAction)).toEqual({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: false,
            modal: false,
            ingredient: undefined
        });
    });

    test('should handle INGREDIENTS_REQUEST', () => {
        expect(
            burgerIngredientsReducer(undefined, {
                type: INGREDIENTS_REQUEST,
            })
        ).toEqual(
            {
                ingredients: [],
                ingredientsRequest: true,
                ingredientsFailed: false,
                modal: false,
                ingredient: undefined
            }
        )
    })

    test('should handle INGREDIENTS_FAILED', () => {
        expect(
            burgerIngredientsReducer(undefined, {
                type: INGREDIENTS_FAILED,
            })
        ).toEqual(
            {
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: true,
                modal: false,
                ingredient: undefined
            }
        )
    })

    test('should handle INGREDIENT_MODAL_CLOSE', () => {
        expect(
            burgerIngredientsReducer(undefined, {
                type: INGREDIENT_MODAL_CLOSE,
            })
        ).toEqual(
            {
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredient: undefined,
                modal: false
            }
        )
    })

    test('should handle INGREDIENT_MODAL_OPEN', () => {
        expect(
            burgerIngredientsReducer(undefined, {
                type: INGREDIENT_MODAL_OPEN,
            })
        ).toEqual(
            {
                ingredients: [],
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredient: undefined,
                modal: true
            }
        )
    })



    test('should handle INGREDIENTS_SUCCESS', () => {
        const action:IIngredientsSuccess = {
            type: INGREDIENTS_SUCCESS,
            ingredients:dataIngredients
        };
        expect(
            burgerIngredientsReducer(undefined, action)
        ).toEqual(
            {
                ingredients: dataIngredients,
                ingredientsRequest: false,
                ingredientsFailed: false,
                modal: false,
                ingredient: undefined
            }
        )

    })


});