import React, {useMemo} from 'react';
import styles from "./ingredient-details.module.css";
import {ITypeIngredient} from "../../utils/types";
import {useSelector} from "../../services/hooks";

export default function IngredientDetails() {
    const getLastParam = (url: string) => {
        let parms: string[] = url.split("/");
        return parms[parms.length - 1];
    }

    const idSelectedIngredient = getLastParam(window.location.pathname);
    const {ingredients} = useSelector(state => state.burgerIngredients);
    console.log("ingredients");
    console.log("ingredients");
    console.log("idSelectedIngredient " + idSelectedIngredient);

    let ingredient = useMemo(() => {
        let temp = ingredients.find((item) => item._id === idSelectedIngredient);
        if (temp != undefined) {
            return temp;
        }
        console.log("temp = undefined)");
        return {image_large: "", name: "", calories: "", proteins: "", fat: "", carbohydrates: ""}
    }, [ingredients, idSelectedIngredient]);


    return (
        <div className={styles.main}>
            <img src={ingredient.image_large} className={styles.img}/>
            <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
            <div className={styles.pfcGroup + ' mt-10 '}>
                <div className={styles.pfc + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Калории,ккал</span>
                    <span
                        className="text text_color_inactive text_type_digits-default mt-2">{ingredient.calories}</span>
                </div>
                <div className={styles.pfc + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Белки, г</span>
                    <span
                        className="text text_color_inactive text_type_digits-default mt-2">{ingredient.proteins}</span>
                </div>
                <div className={styles.pfc + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Жиры, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{ingredient.fat}</span>
                </div>
                <div className={styles.pfc + ' mr-5'}>
                    <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                    <span
                        className="text text_color_inactive text_type_digits-default mt-2">{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}