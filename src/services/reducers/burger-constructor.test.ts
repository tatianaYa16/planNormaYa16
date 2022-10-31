import {burgerConstructorReducer, initialState} from "./burger-constructor";
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
import {AnyAction} from "redux";
import {
    IConstructorAddBun,
    IConstructorAddIngredient, IConstructorMoveIngredient,
    IConstructorRemoveIngredient
} from "../actions/burger-constructor";
import {ITypeIngredient} from "../../utils/types";

describe('initialState reducer', () => {

    const bun: ITypeIngredient = {
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
    };

    const ingredient: ITypeIngredient = {
        uuid: 321321321,
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
    };

    test('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {} as AnyAction)).toEqual(initialState);
    })

    it('Should handle CONSTRUCTOR_ADD_BUN', () => {
        const action: IConstructorAddBun = {
            type: CONSTRUCTOR_ADD_BUN,
            bun
        };
        const expectedState = {
            ...initialState,
            bun: bun
        };

        expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);

    })

    it('Should handle CONSTRUCTOR_ADD_INGREDIENT', () => {
        const action: IConstructorAddIngredient = {
            type: CONSTRUCTOR_ADD_INGREDIENT,
            item: bun
        };
        const expectedState = {
            ...initialState,
            ingredients: [bun]
        };

        expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);
    })

    it('Should handle CONSTRUCTOR_REMOVE_INGREDIENT', () => {
        const action: IConstructorRemoveIngredient = {
            type: CONSTRUCTOR_REMOVE_INGREDIENT,
            id: 123123123
        };

        const expectedState = {
            ...initialState,
            ingredients: []
        };

        expect(burgerConstructorReducer({
            orderNumber: undefined,
            ingredients: [bun],
            bun: undefined,
            totalPrice: 0,
            modal: false,
            orderRequest: false,
            orderFailed: false
        }, action)).toEqual(expectedState);
    })

    it('Should handle CONSTRUCTOR_MOVE_INGREDIENT', () => {
        const action: IConstructorMoveIngredient = {
            type: CONSTRUCTOR_MOVE_INGREDIENT,
            dragIndex: 1,
            hoverIndex: 0
        };

        const expectedState = {
            ...initialState,
            ingredients: [bun, ingredient]
        };

        expect(burgerConstructorReducer({
            ...initialState,
            ingredients: [ingredient, bun]
        }, action)).toEqual(expectedState);
    })


})