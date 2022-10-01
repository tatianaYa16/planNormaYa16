import React, {useMemo, useState} from 'react';
import styles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
// @ts-ignore
import {v4 as uuidv4} from 'uuid';

import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {useHistory} from "react-router-dom";
import {
    postOrderThunk,
    constructorAddBun,
    modalClose,
    constructorAddIngredient
} from '../../services/actions/burger-constructor'
import IngredientItem from "./ingredient-item/ingredient-item";
import {ITypeIngredient} from "../../utils/types";
import {Button} from "../../utils/components";
import {userReducer} from "../../services/reducers/user";

BurgerConstructor.propTypes = {
    items: PropTypes.array
};

export default function BurgerConstructor() {
    const {isAuth, ingredients, bun, modal, orderNumber} = useSelector(
        (state: any) => ({
            ingredients: state.burgerConstructor.ingredients,
            bun: state.burgerConstructor.bun,
            orderNumber: state.burgerConstructor.orderNumber,
            modal: state.burgerConstructor.modal,
            isAuth: state.userReducer.isAuth
        }));

    const dispatch: any = useDispatch();
    const history = useHistory();

    const [{isHover}, dropIngredients] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop: (item: ITypeIngredient) => {
            dispatch(constructorAddIngredient({...item, uuid: uuidv4()}));
        }
    });

    const [{isHoverBun}, dropBun] = useDrop({
        accept: 'buns',
        collect: monitor => ({
            isHoverBun: monitor.isOver()
        }),
        drop(item) {
            dispatch(constructorAddBun(item));
        }
    });

    const totalPrice = useMemo(() => {
        let price = ingredients.reduce((sum: number, item: ITypeIngredient) => {
            return item.price + sum;
        }, 0);
        price += bun && bun.price * 2;
        return price;
    }, [ingredients, bun])

    const handleCloseModal = () => {
        dispatch(modalClose());
    }

    const handleOpenModal = () => {
        if (!bun) return alert('Добавте сначала булочку.');
        console.log(isAuth);
        if (!isAuth) return history.push('/login');
        const ids = [...ingredients.map((item: ITypeIngredient) => item._id), bun._id, bun._id];
        dispatch(postOrderThunk(ids));
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
                     className={`${styles.ingredients}`}>
                    {ingredients.map((ingredient: ITypeIngredient, index: number) => (
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
                    {totalPrice?totalPrice:0}
                </p>
                <CurrencyIcon type="primary"/>
                <Button type="primary" size="large" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>

            {modal &&
                <Modal onClose={handleCloseModal}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>
            }
        </section>
    )
};