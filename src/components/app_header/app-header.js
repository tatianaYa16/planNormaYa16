import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export default function AppHeader() {

    return (
        <header className={styles.header}>
            <div className={styles.headerItem}>
                <BurgerIcon type="primary"/>
                <p className="text text_type_main-default">
                    Конструктор
                </p>
                <ListIcon type="primary"/>
                <p className="text text_type_main-default">
                    Лента заказов
                </p>
            </div>
            <Logo/>
            <div className={styles.headerItem}>
                <ProfileIcon type="primary"/>
                <p className="text text_type_main-default">
                    Личный кабинет
                </p>
            </div>

        </header>
    )
}
