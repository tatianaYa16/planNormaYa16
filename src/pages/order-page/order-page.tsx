import React, {FC, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import FeedDetails from '../../components/feed-details/feed-details';
import {wsClose, wsInit} from '../../services/actions/feed';
import {useDispatch, useSelector} from '../../services/hooks';
import {WS_URL, WS_URL_ALL} from "../../utils/configs";
import {getCookie} from '../../utils/cookieUtils';

import styles from './order-page.module.css'

export const OrderPage: FC = () => {
    const {orders} = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const isUserOrder = useRouteMatch({path: '/profile/orders/'});
    let accessToken  = getCookie('accessToken');
    accessToken =accessToken?.slice(7, accessToken?.length);
    const token = isUserOrder ? `?token=${accessToken}` : '';

    useEffect(() => {
        console.log('OrderPage');
        dispatch(
            isUserOrder
                ? wsInit(WS_URL + token)
                : wsInit(WS_URL_ALL)
        );

        return () => {
            dispatch(wsClose());
        };
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={`visually-hidden`}>Детали заказа</h1>

            {(orders.length > 0) && <FeedDetails orders={orders}/>}
        </div>
    );
};