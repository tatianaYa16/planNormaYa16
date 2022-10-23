import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';

import styles from './order-card.module.css';
import {IOrderCard, IOrderCardIngredients} from "../../services/types/types";
import {useSelector} from "../../services/hooks";
import {ITypeIngredient} from "../../utils/types";
import {getOrderData} from "../../utils/common";

const OrderCardPrice: FC<{ children: number }> = ({children}) => {
    return (
        <div className={`${styles.price}`}>
            <p className='text text_type_digits-default mr-2'>{children}</p>
            <CurrencyIcon type='primary'/>
        </div>
    );
};

const OrderCardIngredients: FC<IOrderCardIngredients> = ({idIngredients}) => {
    const {ingredients} = useSelector((state) => state.burgerIngredients);

    const orderIngredients = ingredients.filter((ingredient) =>
        idIngredients.includes(ingredient._id)
    );

    let totalPrice = 0;

    const dataToIngredientPreview = (orderIngredient: ITypeIngredient, index: number) => {
        const count = idIngredients.filter((idIngredient) => idIngredient === orderIngredient._id).length;
        (orderIngredient.type === 'bun')
            ? totalPrice += orderIngredient!.price * 2
            : totalPrice += orderIngredient!.price * count;

        return (
            <div className={styles.ingredient}  key={index}>
                <div className={styles.ingredient_preview}>
                    <img
                        src={orderIngredient.image}
                        alt={orderIngredient.name}
                    />

                    {(orderIngredient.type !== 'bun' && count > 1) &&
                        <span className={`${styles.ingredient_count} text text_type_main-default`}>+{count}</span>
                    }
                </div>
            </div>
        );
    };


    return (
        <>
            <div className={styles.ingredients}>
                {orderIngredients.map(dataToIngredientPreview)}
            </div>
            <OrderCardPrice>{totalPrice}</OrderCardPrice>
        </>
    );
};


export const OrderCard: FC<IOrderCard> = ({
                                              orders,
                                              orderID,
                                              number,
                                              time,
                                              name,
                                              ingredients,
                                              status
                                          }) => {
    const orderTime = getOrderData(time);
    const location = useLocation();
    return (
        <Link to={{
            pathname: `${location.pathname}/${orderID}`,
            state: {background: location, number: number, orders: orders}
        }}>

            <div className={styles.card}>
                <div className={styles.info}>
                    <p className={`text text_type_digits-default pb-6`}>
                        #{number}
                    </p>
                    <p className='text text_type_main-default text_color_inactive'>
                        {orderTime}
                    </p>
                </div>
                <p className='text text_type_main-medium pr-6 pl-6'>{name}</p>
                <div className={styles.info}>
                    <OrderCardIngredients idIngredients={ingredients}/>
                </div>
            </div>
        </Link>
    );
};