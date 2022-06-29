import React, {useEffect, useState} from 'react';
import styles from ".//burger_constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';

BurgerConstructor.propTypes = {
    items: PropTypes.array
};

export default function BurgerConstructor(props) {
    const [orderCost, setOrderCost] = useState(0);

    console.log("BurgerConstructor :" + props.items);
    return (
        <section>
            <div className={styles.ingredients}>
                {props.items.map((ingredient, index) => (
                    <div>
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
            <div className={styles.order}>
                <p className={styles.orderCost}>
                    {orderCost}
                </p>
                <CurrencyIcon type="primary"/>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
};