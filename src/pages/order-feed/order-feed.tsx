import { FC } from "react";
import styles from './order-feed.module.css'
import {OrderList} from "../../components/order-list/order-list";
import OrderStatus from "../../components/order-status/order-status";

export const FeedPage: FC = () => {

    return (
        <section className={styles.feed + " wrapper container mt-10"}>
            <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
            <div className={styles.content}>
                {<OrderList/>}
                <OrderStatus/>
            </div>
        </section>
    );
};