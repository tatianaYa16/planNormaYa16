import React, {useState, useEffect, useMemo} from 'react';
import styles from './app.module.css';
import AppHeader from "../app_header/app-header";
import LoginPage from "../../pages/login/login";
import HomePage from "../../pages/home/home";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import Profile from "../../pages/profile/profile";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {
    Switch,
    Route,
    useHistory,
    useLocation
} from "react-router-dom";
import {
    getIngredientsThunk,
    ingredientModalClose
} from "../../services/actions/burger-ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ILocation} from "../../utils/types";


export default function App() {
    const location: any = useLocation();
    const dispatch: any = useDispatch();
    const history = useHistory();

    const {ingredients} = useSelector((state: any) => state.burgerIngredients);
    // const [background, setBackground] = useState(false);

    useEffect(() => {
        if (ingredients.length <= 0) {
            dispatch(getIngredientsThunk());
        }
    }, [dispatch, ingredients]);

    // useEffect(() => {
    //     let background = history.action === 'PUSH' && location.state && location.state.background;
    //     if (location.state) {
    //         if (location.state.hasOwnProperty('background')) {
    //             background = location.state.background;
    //         }
    //     }
    //     setBackground(background);
    // }, [location.state, history.action]);

    const background = location.state?.background;

    const handleClose = () => {
        dispatch(ingredientModalClose());
        history.goBack();
    }


    return (
        <section>
            <div className={styles.App}>
                <AppHeader/>
                <main className={styles.mainBurger}>
                    <Switch location={background || location}>
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
                        <Route path={"/ingredients/:id"} exact={true} children={<IngredientDetails/>}/>
                        <ProtectedRoute path="/profile" exact={true}>
                            <Profile/>
                        </ProtectedRoute>
                    </Switch>
                    {background && <Route path="/ingredients/:id" children={
                        <Modal onClose={handleClose} headerText={'Детали ингредиента'}>
                            <IngredientDetails/>
                        </Modal>
                    }/>}
                </main>
            </div>
        </section>
    );

}

