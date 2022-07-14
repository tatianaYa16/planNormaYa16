import styles from "./burger-ingredients.module.css";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";

Ingredient.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default function Ingredient(props) {
    const {ingredients, bun} = useSelector(state => state.burgerConstructor);
    const {image_large, price, name, _id, type} = props.item;

    let counter = ingredients.filter((ingredient) => ingredient._id === _id).length;

    if (type === 'bun'
        && bun
        && bun._id === _id) {
        counter = 2;
    }

    const [{opacity}, refIngredient] = useDrag({
        type: type === 'bun' ? 'buns' : 'ingredients',
        item: props.item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
        <div onClick={props.onClick}
             id={_id}
             className={styles.ingredientCard}
             style={{opacity: opacity}}
             ref={refIngredient}
             draggable
        >
            <div className={styles.counter}>
                {counter ? <Counter count={counter} size="default"/> : ""}
            </div>
            <img src={image_large} className={styles.img}/>
            <div className={styles.price}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={styles.name + ' text text_type_main-small '}>
                {name}
            </p>
        </div>
    )
}