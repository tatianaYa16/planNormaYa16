import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app_header/app-header";
import {Route, Switch} from "react-router-dom";
import LoginPage from "../../pages/login/login";
import HomePage from "../../pages/home/home";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import Profile from "../../pages/profile/profile";


export default function App() {
    return (
        <section>
            <div className={styles.App}>
                <AppHeader/>
                <main className={styles.mainBurger}>
                    <Switch>
                        <Route path="/register" exact={true}>
                            <RegisterPage/>
                        </Route>
                        <Route path="/" exact={true}>
                            <HomePage/>
                        </Route>
                        <Route path="/login" exact={true}>
                            <LoginPage/>
                        </Route>
                        <Route path="/forgot-password" exact={true}>
                            <ForgotPasswordPage/>
                        </Route>
                        <Route path="/reset-password" exact={true}>
                            <ResetPasswordPage/>
                        </Route>
                        <ProtectedRoute  path="/profile" exact={true}>
                            <Profile/>
                        </ProtectedRoute>
                    </Switch>
                </main>
            </div>
        </section>
    );

}

