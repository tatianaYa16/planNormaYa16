import React, {useEffect, useState} from 'react';
import styles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

BurgerConstructor.propTypes = {
    items: PropTypes.array
};

export default function BurgerConstructor(props) {
    const [orderCost, setOrderCost] = useState(0);
    const [modal, setModal] = useState(false);

    const handleOpenModal = () => {
        setModal(!modal);
    }

    return (
        <section className={styles.constructorMain}>
            <div className={styles.buns +'pl-10'}>
                <ConstructorElement
                    type={props.items[0].type}
                    isLocked={true}
                    text={props.items[0].name + ' верх'}
                    price={props.items[0].price}
                    thumbnail={props.items[0].image}
                />
                <div className={styles.ingredients}>
                    {props.items.map((ingredient) => (
                        <div key={ingredient._id}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                type={ingredient.type}
                                isLocked={false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                    ))}
                </div>
                <ConstructorElement
                    type={props.items[0].type}
                    isLocked={true}
                    text={props.items[0].name + ' низ'}
                    price={props.items[0].price}
                    thumbnail={props.items[0].image}
                />


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
                    <OrderDetails />
                </Modal>
            }
        </section>
    )
};