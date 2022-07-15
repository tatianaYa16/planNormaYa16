import {BASE_URL} from '../../utils/configs';
import {checkResponse} from '../../utils/response-utils';

export const CONSTRUCTOR_ADD_BUN = 'CONSTRUCTOR_ADD_BUN';
export const CONSTRUCTOR_ADD_INGREDIENT = 'CONSTRUCTOR_ADD_INGREDIENT';
export const CONSTRUCTOR_REMOVE_INGREDIENT = 'CONSTRUCTOR_REMOVE_INGREDIENT';
export const CONSTRUCTOR_MOVE_INGREDIENT = 'CONSTRUCTOR_MOVE_INGREDIENT';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const MODAL_OPEN = 'MODAL_OPEN';

export const orderFailed = () => {
    return {type: ORDER_FAILED};
}

export const postOrderToServer = (ids) => {
    return function (dispatch) {
        dispatch({
            type: ORDER_REQUEST
        })
        const createOrder = async (ids) => {
            await fetch(BASE_URL + 'orders',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ingredients: ids})
                })
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch({
                            type: ORDER_SUCCESS,
                            orderNumber: data.order.number
                        });
                        dispatch({
                            type: MODAL_OPEN
                        })
                    } else {
                        dispatch(orderFailed())
                    }
                })
                .catch(err => {
                    console.log(err)
                    dispatch(orderFailed())
                })
        }
        createOrder(ids);
    }
}