import React, {useMemo} from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {NavLink, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";

export default function AppHeader() {
    const {isAuth} = useSelector((state:any) => state.userReducer);
    const isLogin = !!useRouteMatch('/login');
    const isForgetPassword = !!useRouteMatch('/forgot-password');
    const isResetPassword = !!useRouteMatch('/reset-password');
    const isRegister = !!useRouteMatch('/register');

    const path = useMemo(() => {
        if (isLogin) {
            return '/login';
        }
        if (isForgetPassword) {
            return '/forgot-password';
        }
        if (isResetPassword) {
            return '/reset-password';
        }
        if(isRegister){
            return '/register';
        }

        return '/profile';

    }, [isLogin, isForgetPassword, isResetPassword]);
    return (
        <header className={styles.header}>
            <div className={styles.headerItem}>
                <NavLink exact={true} to={"/"}
                         activeClassName={styles.header_link_active}
                         className={styles.header_link + ' pr-5 '}>
                    <BurgerIcon type="primary"/>
                    <span className="text text_type_main-default ml-2">Конструктор</span>
                </NavLink>
                <NavLink to={"/feed"}
                         activeClassName={styles.header_link_active}
                         className={styles.header_link + ' pr-5 '}>
                    <ListIcon type="secondary"/>
                    <span className="text text_type_main-default ml-2">Лента заказов</span>
                </NavLink>
            </div>
            <Logo/>

            <NavLink exact={true} to={{pathname: path}}
                     activeClassName={styles.header_link_active}
                     className={styles.header_link + ' pr-5 '}>
                <ProfileIcon type="primary"/>
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </NavLink>

        </header>
    )
}
