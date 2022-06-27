import React from 'react';
import {ConstructorElement, DragIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

BurgerConstructor.propTypes = {
    items: PropTypes.array
};

const MenuTab = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{display: 'flex'}}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

const Ingridient = (props) => {
    return (
        <div>
            <img src={props.item.image_large} className={styles.img}/>
            <div className={styles.price}>
                <p className="text text_type_digits-default">{props.item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small">
                {props.item.name}
            </p>
        </div>
    )
}

export default function BurgerIngredients(props) {
    const buns = props.items.filter(item => item.type === "bun");
    const mains = props.items.filter(item => item.type === "main");
    const sauces = props.items.filter(item => item.type === "sauce");

    return (
        <div className={styles.ingredients}>
            <span>Соберите бургер</span>
            <MenuTab/>
            <p className="text text_type_main-medium text_left">
                Булки
            </p>
            <div className={styles.ingredientItem}>
                {buns.map((bun, index) => (
                    <div>
                        <Ingridient key={index} item={bun}/>
                    </div>
                ))}
            </div>
            <p className="text text_type_main-medium text_left">
                Соусы
            </p>
            <div className={styles.ingredientItem}>
                {sauces.map((sauce, index) => (
                    <div>
                        <Ingridient key={index} item={sauce}/>
                    </div>
                ))}
            </div>
            <p className="text text_type_main-medium text_left">
                Начинки
            </p>
            <div className={styles.ingredientItem}>
                {mains.map((main, index) => (
                    <div>
                        <Ingridient key={index} item={main}/>
                    </div>
                ))}
            </div>
        </div>
    )
};