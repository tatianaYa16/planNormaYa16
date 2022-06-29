import React from 'react';
import {ConstructorElement, DragIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from "../ingredient-details/ingredient-details"
import Modal from "../modal/modal";

BurgerConstructor.propTypes = {
    items: PropTypes.array.isRequired
};

const MenuTab = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={styles.menu}>
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
        <div onClick={props.onClick} id={props.item._id} className={styles.ingredientCard}>
            <img src={props.item.image_large} className={styles.img}/>
            <div className={styles.price}>
                <p className="text text_type_digits-default">{props.item.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={styles.name + ' text text_type_main-small '}>
                {props.item.name}
            </p>
        </div>
    )
}

export default function BurgerIngredients(props) {
    const buns = props.items.filter(item => item.type === "bun");
    const mains = props.items.filter(item => item.type === "main");
    const sauces = props.items.filter(item => item.type === "sauce");

    const [visibleModal, setVisibleModal] = React.useState(false);
    const [selectedIngredient, setSelectedIngredient] = React.useState({});

    const handleOpenModal = (e) => {
        const target = e.currentTarget;
        const id = target.getAttribute('id');
        setSelectedIngredient(props.items.find((item) => item._id === id));
        setVisibleModal(true);
    }

    const handleCloseModal = () => {
        setVisibleModal(false);
    }

    return (
        <section>
            <div className='pt-10 pb-10'>
                <p className="text text_type_main-large text_left">
                    Соберите бургер
                </p>
                <MenuTab/>
                <div className={styles.ingredients}>
                    <div>
                        <p className="text text_type_main-medium text_left">
                            Булки
                        </p>
                        <div className={styles.ingredientItem}>
                            {buns.map((bun) => (
                                <Ingridient key={bun._id} item={bun} onClick={handleOpenModal}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium text_left">
                            Соусы
                        </p>
                        <div className={styles.ingredientItem}>
                            {sauces.map((sauce) => (
                                <Ingridient key={sauce._id} item={sauce} onClick={handleOpenModal}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium text_left">
                            Начинки
                        </p>
                        <div className={styles.ingredientItem}>
                            {mains.map((main) => (
                                <Ingridient key={main._id} item={main} onClick={handleOpenModal}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
                {visibleModal && selectedIngredient &&
                    <Modal onClose={handleCloseModal} headerText="Детали ингредиента">
                        <IngredientDetails item={selectedIngredient}/>
                    </Modal>
                }
        </section>
    )
};