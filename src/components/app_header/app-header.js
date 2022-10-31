import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export default function AppHeader() {

    return (
        <header className={styles.header}>
            {/*<nav className={'${styles.headerIte} mp-4'}>*/}

            <div className={styles.headerItem}>
                <BurgerIcon type="primary"/>
                <p className="text text_type_main-default ml-2">Конструктор</p>
                <ListIcon type="secondary"/>
                <p className="text text_type_main-default ml-2">Лента заказов</p>
            </div>
            <Logo/>
            <div className={styles.headerItem}>
                <ProfileIcon type="primary"/>
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </div>
            {/*</nav>*/}

        </header>
    )
}
