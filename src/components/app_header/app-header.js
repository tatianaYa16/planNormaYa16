import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {NavLink, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";

export default function AppHeader() {
    const {isAuth} = useSelector(state => state.userReducer);
    const isLogin = useRouteMatch('/login');
    const isProfile = useRouteMatch('/user-profile');
    const isConstructor = useRouteMatch({path: '/', exact: true});
    const isOrders = useRouteMatch({path: '/profile/orders'});
    return (
        <header className={styles.header}>
            <div className={styles.headerItem}>
                <NavLink exact={true} to={"/"}
                         className={isConstructor ? styles.header_link_active : ''}>
                    <BurgerIcon type="primary"/>
                    <span className="text text_type_main-default ml-2">Конструктор</span>
                </NavLink>
                <NavLink to={"/profile/orders"}
                         className={isOrders ? styles.header_link_active : ''}>
                    <ListIcon type="secondary"/>
                    <span className="text text_type_main-default ml-2">Лента заказов</span>
                </NavLink>
            </div>
            <Logo/>
            <div className={styles.headerItem}>
                <NavLink exact={true} to={"/profile"}
                         className={(isLogin || isAuth) ? styles.header_link_active : ''}>
                    <ProfileIcon type="primary"/>
                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
                </NavLink>
            </div>
        </header>
    )
}
