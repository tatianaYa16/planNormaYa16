import React, {useEffect, useRef, useMemo} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details"
import Modal from "../modal/modal";

import {useDispatch, useSelector} from "react-redux";
import {
    getIngredientsFromServer,
    INGREDIENT_MODAL_CLOSE,
    INGREDIENT_MODAL_OPEN
} from "../../services/actions/burger-ingredients";
import Ingredient from "./ingredient";

import {useInView} from 'react-intersection-observer';

BurgerConstructor.propTypes = {
    items: PropTypes.array.isRequired
};

export default function BurgerIngredients(props) {
    const {ingredients, modal, selectedIngredient} = useSelector(state => ({
        ingredients: state.burgerIngredients.ingredients,
        modal: state.burgerIngredients.modal,
        selectedIngredient: state.burgerIngredients.ingredient
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredientsFromServer());
    }, [dispatch]);


    const ingredientsContainer = useRef(null);

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

    const handlerScroll = () => {

    }

    const [inViewSauceRef, inViewSauce] = useInView({
        threshold: 0.5
    });

    const [inViewBunRef, inViewBun] = useInView({
        threshold: 0.5,
    });

    const currentTab = useMemo(() => {
        if (!inViewBun && !inViewSauce)
            return 'mains'
        if (!inViewBun && inViewSauce)
            return 'sauces';
        return 'buns';
    }, [inViewSauce, inViewBun]);

    const sauceRef = useRef(null);
    const mainsRef = useRef(null);
    const bunsRef = useRef(null);

    const scrollSauces =()=>{
        sauceRef.current.scrollIntoView();
    }

    const scrollBuns =()=>{
        bunsRef.current.scrollIntoView();
    }

    const scrollMains =()=>{
        mainsRef.current.scrollIntoView();
    }

    return (
        <section>
            <div className='pt-10 pb-10'>
                <p className="text text_type_main-large text_left">
                    Соберите бургер
                </p>

                <div className={styles.menu}>
                    <Tab value="buns" active={currentTab === 'buns'} onClick={scrollBuns}>
                        Булки
                    </Tab>
                    <Tab value="sauces" active={currentTab === 'sauces'} onClick={scrollSauces}>
                        Соусы
                    </Tab>
                    <Tab value="mains" active={currentTab === 'mains'} onClick={scrollMains}>
                        Начинки
                    </Tab>
                </div>

                <div className={styles.ingredients}
                     ref={ingredientsContainer}
                     onScroll={handlerScroll}>
                    <div ref={inViewBunRef}>
                        <p  ref={bunsRef}
                            className="text text_type_main-medium text_left">
                            Булки
                        </p>
                        <div className={styles.ingredientItem}>
                            {buns.map((bun) => (
                                <Ingredient key={bun._id} item={bun} onClick={handleOpenModal}/>
                            ))}
                        </div>
                    </div>
                    <div ref={inViewSauceRef}>
                        <p className="text text_type_main-medium text_left"
                        ref={sauceRef}>
                            Соусы
                        </p>
                        <div className={styles.ingredientItem}>
                            {sauces.map((sauce) => (
                                <Ingredient key={sauce._id} item={sauce} onClick={handleOpenModal}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p  ref={mainsRef}
                            className="text text_type_main-medium text_left">
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