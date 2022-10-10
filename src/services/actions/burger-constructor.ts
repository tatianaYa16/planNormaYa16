import {BASE_URL} from '../../utils/configs';
import {checkResponse} from '../../utils/response-utils';
import {TResponseBody} from '../api';
import {ITypeIngredient} from "../../utils/types";


import {
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_REMOVE_INGREDIENT,
    CONSTRUCTOR_MOVE_INGREDIENT,
    MODAL_CLOSE,
    MODAL_OPEN,
    ORDER_FAILED,
    ORDER_REQUEST,
    ORDER_SUCCESS
} from '../constants';

import {AppDispatch, AppThunk} from "../types";

export interface IConstructorAddBun {
    readonly type: typeof CONSTRUCTOR_ADD_BUN;
    readonly bun: ITypeIngredient
}

export interface IOrderFailed {
    readonly type: typeof ORDER_FAILED;
}

export interface IOrderRequest {
    readonly type: typeof ORDER_REQUEST;
}

export interface IModalOpen {
    readonly type: typeof MODAL_OPEN;
}

export interface IModalClose {
    readonly type: typeof MODAL_CLOSE;
}

export interface IOrderSuccess {
    readonly type: typeof ORDER_SUCCESS;
    readonly orderNumber: number;
}

export interface IConstructorAddIngredient {
    readonly type: typeof CONSTRUCTOR_ADD_INGREDIENT;
    readonly item: ITypeIngredient;
}

export interface IConstructorRemoveIngredient {
    readonly type: typeof CONSTRUCTOR_REMOVE_INGREDIENT;
    readonly id: number;
}

export interface IConstructorMoveIngredient {
    readonly type: typeof CONSTRUCTOR_MOVE_INGREDIENT;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}


export type TBurgerConstructorActions =
    | IConstructorAddIngredient
    | IOrderSuccess
    | IModalClose
    | IModalOpen
    | IOrderRequest
    | IOrderFailed
    | IConstructorAddBun
    | IConstructorRemoveIngredient
    | IConstructorMoveIngredient;

export const constructorRemoveIngredient = (id:number):IConstructorRemoveIngredient => {
    return {
        type:CONSTRUCTOR_REMOVE_INGREDIENT,
        id
    }
}

export const constructorMoveIngredient = (dragIndex:number, hoverIndex:number):IConstructorMoveIngredient => {
    return {
        type:CONSTRUCTOR_MOVE_INGREDIENT,
        dragIndex,
        hoverIndex
    }
}


export const constructorAddIngredient = (item: ITypeIngredient): IConstructorAddIngredient => {
    return {
        type: CONSTRUCTOR_ADD_INGREDIENT,
        item
    };
}
export const constructorAddBun = (bun: any): IConstructorAddBun => {
    return {
        type: CONSTRUCTOR_ADD_BUN,
        bun
    };
}

export const orderFailed = (): IOrderFailed => {
    return {type: ORDER_FAILED};
}
export const orderRequest = (): IOrderRequest => {
    return {type: ORDER_REQUEST};
}

export const modalOpen = (): IModalOpen => {
    return {type: MODAL_OPEN};
}

export const modalClose = (): IModalClose => {
    return {type: MODAL_CLOSE};
}

export const orderSuccess = (orderNumber: number): IOrderSuccess => {
    return {
        type: ORDER_SUCCESS,
        orderNumber
    };
}

export const createOrder = async (ids: ReadonlyArray<Number>): Promise<TResponseBody<'order', any>> =>
    await fetch(BASE_URL + 'orders', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredients: ids})
    })
        .then(checkResponse)
        .then(data => data);


export const postOrderThunk: AppThunk = (ids: ReadonlyArray<Number>) => (dispatch: AppDispatch) => {
    dispatch(orderRequest());
    createOrder(ids).then(data => {
        if (data && data.success) {
            dispatch(orderSuccess(data.order.number));
            dispatch(modalOpen());
        } else {
            dispatch(orderFailed());
        }
    }).catch(err => {
        console.log(err)
        dispatch(orderFailed())
    });
};
