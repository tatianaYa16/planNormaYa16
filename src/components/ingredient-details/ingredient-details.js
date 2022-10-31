import React from 'react';
import styles from "./ingredient-details.module.css";
import PropTypes from 'prop-types';
import BurgerConstructor from "../burger-constructor/burger-constructor";

IngredientDetails.propTypes = {
    item: PropTypes.object.isRequired
};

export default function IngredientDetails(props) {
    return (
        <div className={styles.main}>
            <img src={props.item.image_large} className={styles.img}/>
            <p className="text text_type_main-medium mt-4">{props.item.name}</p>
            <div className={styles.pfcGroup + ' mt-10 '}>
                <div className={styles.pfc + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Калории,ккал</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{props.item.calories}</span>
                </div>
                <div className={styles.pfc + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Белки, г</span>
                    <span
                        className="text text_color_inactive text_type_digits-default mt-2">{props.item.proteins}</span>
                </div>
                <div className={styles.pfc + ' mr-5 '}>
                    <span className="text text_color_inactive text_type_main-default">Жиры, г</span>
                    <span className="text text_color_inactive text_type_digits-default mt-2">{props.item.fat}</span>
                </div>
                <div className={styles.pfc + ' mr-5'}>
                    <span className="text text_color_inactive text_type_main-default">Углеводы, г</span>
                    <span
                        className="text text_color_inactive text_type_digits-default mt-2">{props.item.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}