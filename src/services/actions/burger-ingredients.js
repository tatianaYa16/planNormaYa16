import {BASE_URL} from '../../utils/configs';
import {checkResponse} from  '../../utils/response-utils';

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_FAILED = 'INGREDIENTS_FAILED';
export const INGREDIENT_MODAL_CLOSE = 'INGREDIENT_MODAL_CLOSE';
export const INGREDIENT_MODAL_OPEN = 'INGREDIENT_MODAL_OPEN';

const url = 'https://norma.nomoreparties.space/api/ingredients';

export const ingredientsFailed= () =>{
    return  {type: INGREDIENTS_FAILED};
}

export const getIngredientsFromServer = () => {
    return function (dispatch) {
        dispatch({
            type: INGREDIENTS_REQUEST
        })
        const getIngredients = async () => {
            await fetch(BASE_URL+'ingredients')
                .then(checkResponse)
                .then(data => {
                    if (data && data.success) {
                        dispatch({
                            type: INGREDIENTS_SUCCESS,
                            ingredients: data.data,
                        })
                    } else {
                        dispatch(ingredientsFailed)
                    }
                })
                .catch(err => {
                    console.log(err)
                    dispatch(ingredientsFailed)
                })
        }
        getIngredients();
    }
}