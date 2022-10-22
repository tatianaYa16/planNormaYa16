import {FC, useEffect} from 'react';
import styles from '../order-list/order-list.module.css';
import {OrderCard} from "../order-card/order-card";
import {useDispatch, useSelector} from "../../services/hooks";
import {WS_URL_ALL, WS_URL} from "../../utils/configs";
import {TOrder} from "../../services/types/types";
import {wsClose, wsInit} from "../../services/actions/feed";
import {useRouteMatch} from 'react-router-dom';
import {getCookie} from "../../utils/cookieUtils";


export const OrderList: FC = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector((store) => store.feed);
    const isUserOrder = useRouteMatch({path: '/profile/orders/'});
    const token = isUserOrder ? `?token=${getCookie('token')}` : '';

    useEffect(() => {
        dispatch(
            isUserOrder
                ? wsInit(WS_URL + token)
                : wsInit(WS_URL_ALL)
        );

        return () => {
            dispatch(wsClose());
        };
    }, [dispatch]);

    const dataToOrder = (order: TOrder) => {

        return (
            <div className={styles.item} key={order._id}>
                <OrderCard
                    orders={orders}
                    orderID={order._id}
                    number={order.number}
                    time={order.createdAt}
                    name={order.name}
                    ingredients={order.ingredients}
                    status={order.status}
                />
            </div>
        )
    }

    return (
        <div className={styles.list + " custom-scroll mr-15 pr-4"}>
            {(orders.length > 0) ? orders.map(dataToOrder) : null}
        </div>
    );
}