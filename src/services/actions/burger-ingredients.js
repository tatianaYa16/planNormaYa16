export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_FAILED = 'INGREDIENTS_FAILED';

const url = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredientsFromServer = () => {
    return function (dispatch) {
        dispatch({
            type: INGREDIENTS_REQUEST
        })
        const getIngredients = async () => {
            await fetch(url)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error(`Error occurred: ${res.status}`);
                })
                .then(data => {
                    if (data && data.success) {
                        dispatch({
                            type: INGREDIENTS_SUCCESS,
                            ingredients: data.data,
                        })
                    } else {
                        dispatch({type: INGREDIENTS_FAILED})
                    }
                })
                .catch(err => {
                    console.log(err)
                    dispatch({type: INGREDIENTS_FAILED})
                })
        }
        getIngredients();
    }
}