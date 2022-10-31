import React from 'react';
import {useEffect, useState} from "react";
import styles from './app.module.css';
import AppHeader from "../app_header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";


export default function App() {


    return (
        <section>
            <div className={styles.App}>
                <AppHeader/>
                <main>
                    <div className={styles.mainBurger}>
                        <BurgerIngredients />
                        <BurgerConstructor items={[{name:'test'}]}/>
                    </div>
                </main>
            </div>
        </section>
    );

}

