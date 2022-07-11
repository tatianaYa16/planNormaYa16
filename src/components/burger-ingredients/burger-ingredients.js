import React, {useEffect} from 'react';
import {ConstructorElement, DragIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from "../ingredient-details/ingredient-details"
import Modal from "../modal/modal";

import {useDispatch, useSelector} from "react-redux";
import {getIngredientsFromServer, INGREDIENT_MODAL_CLOSE, INGREDIENT_MODAL_OPEN} from "../../services/actions/burger-ingredients";
import Ingredient from "./ingredient";

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

export default function BurgerIngredients(props) {
    const {ingredients, modal, selectedIngredient} = useSelector(state => ({
        ingredients: state.burgerIngredients.ingredients,
        modal: state.burgerIngredients.modal,
        selectedIngredient:state.burgerIngredients.ingredient
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredientsFromServer());
    }, [dispatch]);

    const buns = ingredients.filter(item => item.type === "bun");
    const mains = ingredients.filter(item => item.type === "main");
    const sauces = ingredients.filter(item => item.type === "sauce");

    const handleOpenModal = (e) => {
        const target = e.currentTarget;
        const id = target.getAttribute('id');
        dispatch({
            type: INGREDIENT_MODAL_OPEN,
            ingredient: ingredients.find((item) => item._id === id)
        });

    }

    const handleCloseModal = () => {
        dispatch({type: INGREDIENT_MODAL_CLOSE})
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
                                <Ingredient key={bun._id} item={bun} onClick={handleOpenModal}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium text_left">
                            Соусы
                        </p>
                        <div className={styles.ingredientItem}>
                            {sauces.map((sauce) => (
                                <Ingredient key={sauce._id} item={sauce} onClick={handleOpenModal}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium text_left">
                            Начинки
                        </p>
                        <div className={styles.ingredientItem}>
                            {mains.map((main) => (
                                <Ingredient key={main._id} item={main} onClick={handleOpenModal}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {modal && selectedIngredient &&
                <Modal onClose={handleCloseModal} headerText="Детали ингредиента">
                    <IngredientDetails item={selectedIngredient}/>
                </Modal>
            }
        </section>
    )
};