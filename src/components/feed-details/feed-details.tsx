import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

import { TLocation } from '../../services/types/types';
import { getOrderData, getOrderStatus } from '../../utils/common';
import styles from './feed-details.module.css';
import {IFeedDetails} from "../../utils/components";
import {ITypeIngredient} from "../../utils/types";

const FeedDetailsPrice: FC<{children:string}> = ({ children }) => {
    return (
        <div className={`${styles.price}`}>
            <p className='text text_type_digits-default mr-2'>{children}</p>
            <CurrencyIcon type='primary' />
        </div>
    );
};

const FeedDetails: FC<IFeedDetails> = ({ orders }) => {
    const location = useLocation<TLocation>();
    const isLocationStateNumber = location.state ? true : false;

    const { id } = useParams<{ id: string }>();
    const order = orders!.find((item) => item._id === id);
    const orderStatus = getOrderStatus(order!.status);
    const orderTime = getOrderData(order!.createdAt);

    const { ingredients } = useSelector((state) => state.burgerIngredients);

    // общий массив ингредиентов ордера
    const idIngredients = order!.ingredients;

    // уникальные ингредиенты
    const orderIngredients = ingredients.filter((ingredient) =>
        idIngredients.includes(ingredient._id));

    let totalPrice = 0;

    const dataToOrderIngredient = (orderIngredient: ITypeIngredient, index: number) => {
        const count = idIngredients.filter((idIngredient) => idIngredient === orderIngredient._id).length;


        (orderIngredient.type === 'bun')
            ? totalPrice += orderIngredient!.price * 2
            : totalPrice += orderIngredient!.price * count;

        return (
            <div className={styles.ingredient} key={index}>
                <div className={styles.ingredient_preview}>
                    <img
                        src={orderIngredient.image}
                        alt={orderIngredient.name}
                    />
                </div>

                <p className={`${styles.desc} text text_type_main-default ml-4`}>{orderIngredient.name}</p>

                <FeedDetailsPrice>
                    {`${count} x ${orderIngredient.price}`}
                </FeedDetailsPrice>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {!isLocationStateNumber &&
                <p className={'text text_type_digits-default mt-6'}>#{order?.number}</p>
            }

            <p className='text text_type_main-medium mt-10'>{order?.name}</p>
            <p className={`text text_type_main-default mt-3`} style={{ color: orderStatus.color }}>{orderStatus.name}</p>
            <p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>

            <ul className={styles.ingredients}>
                {orderIngredients.map(dataToOrderIngredient)}
            </ul>

            <div className={styles.time_price}>
                <p className='text text_type_main-default text_color_inactive'>
                    {orderTime}
                </p>

                <FeedDetailsPrice>
                    {`${totalPrice}`}
                </FeedDetailsPrice>
            </div>
        </div>
    );
};

export default FeedDetails;