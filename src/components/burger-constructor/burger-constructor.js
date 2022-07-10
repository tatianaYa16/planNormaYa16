import React, {useEffect, useState} from 'react';
import styles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {v4 as uuidv4} from 'uuid';

import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {CONSTRUCTOR_ADD_INGREDIENT, CONSTRUCTOR_ADD_BUN} from '../../services/actions/burger-constructor'
import IngredientItem from "./ingredient-item/ingredient-item";

BurgerConstructor.propTypes = {
    items: PropTypes.array
};

export default function BurgerConstructor(props) {
    const {ingredients, bun} = useSelector(state => ({
        ingredients: state.burgerConstructor.ingredients,
        bun: state.burgerConstructor.bun,
        order: state.burgerConstructor.order
    }));

    const dispatch = useDispatch();

    const [{isHover}, dropIngredients] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch({
                type: CONSTRUCTOR_ADD_INGREDIENT,
                item: {...item, uuid: uuidv4()}
            })
        }
    });

    const [{isHoverBun}, dropBun] = useDrop({
        accept: 'buns',
        collect: monitor => ({
            isHoverBun: monitor.isOver()
        }),
        drop(item) {
            dispatch({
                type: CONSTRUCTOR_ADD_BUN,
                bun: item
            })
        }
    });

    const [orderCost, setOrderCost] = useState(0);
    const [modal, setModal] = useState(false);

    const handleOpenModal = () => {
        setModal(!modal);
    }

    return (
        <section className={styles.constructorMain}>
            <div className={`${styles.buns} pl-10`} ref={dropBun}>
                {bun ? (
                        <ConstructorElement
                            type='top'
                            isLocked={true}
                            text={bun.name + ' (верх)'}
                            price={bun.price}
                            thumbnail={bun.image}
                        />)
                    : ""}
                <div ref={dropIngredients}
                     className={`${styles.ingredients}`}
                >
                    {ingredients.map((ingredient,index) => (
                        <IngredientItem key={ingredient.uuid} index={index} data={ingredient}/>
                    ))}
                </div>
                {bun ? (<ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={bun.name + ' (низ)'}
                    price={bun.price}
                    thumbnail={bun.image}
                />) : (<div/>)}


            </div>
            <div className={styles.order}>
                <p className={styles.orderCost}>
                    {orderCost}
                </p>
                <CurrencyIcon type="primary"/>
                <Button type="primary" size="large" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>

            {modal &&
                <Modal onClose={handleOpenModal}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    )
};