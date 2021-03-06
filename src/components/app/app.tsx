import React from 'react';
import {useEffect, useState} from "react";
import styles from './app.module.css';
import AppHeader from "../app_header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";


export default function App() {
    const url = 'https://norma.nomoreparties.space/api/ingredients';

    useEffect(() => {
        const getIngredients = async () => {
            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log("length " + data.data.length);
                    setState({...state, data: data.data, isLoading: false})
                })
                .catch(e => {
                    alert("catch");
                    setState({...state, hasError: true, isLoading: false});
                });
        }
        getIngredients();
    }, []);
    const [state, setState] = React.useState({
        isLoading: true, hasError: false,
        data: []
    })
    const {data, isLoading, hasError} = state;
    return (
        <div className={styles.App}>
            <AppHeader/>
            <main>
            <div className={styles.mainBurger}>
                <BurgerIngredients items={data}/>
                <div>
                    {isLoading && 'Загрузка...'}
                    {hasError && 'Произошла ошибка'}
                    {!isLoading &&
                        !hasError &&
                        data.length &&
                        <BurgerConstructor items={data}/>}
                </div>
            </div>
            </main>
        </div>
    );

}

