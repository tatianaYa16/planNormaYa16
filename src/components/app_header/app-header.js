import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {NavLink} from "react-router-dom";

export default function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.headerItem}>
                <NavLink exact={true} to={"/"}>
                    <BurgerIcon type="primary"/>
                    <span className="text text_type_main-default ml-2">Конструктор</span>
                </NavLink>
                <NavLink to={"/profile/orders"}>
                    <ListIcon type="secondary"/>
                    <span className="text text_type_main-default ml-2">Лента заказов</span>
                </NavLink>
            </div>
            <Logo/>
            <div className={styles.headerItem}>
                <NavLink exact={true} to={"/profile"}>
                    <ProfileIcon type="primary"/>
                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
                </NavLink>
            </div>
        </header>
    )
}
