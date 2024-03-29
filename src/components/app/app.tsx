import React, {useState, useEffect, useMemo} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import LoginPage from "../../pages/login/login";
import HomePage from "../../pages/home/home";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import Profile from "../../pages/profile/profile";
import Modal from "../modal/modal";
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
import IngredientDetails from "../app-header/ingredient-details/ingredient-details";
import {FeedPage} from "../../pages/order-feed/order-feed";
import {OrderPage} from "../../pages/order-page/order-page";
import FeedDetails from "../feed-details/feed-details";
import {useDispatch, useSelector} from "../../services/hooks";
import {ILocation} from "../../utils/types";


export default function App() {
    const location = useLocation<ILocation>();
    const dispatch = useDispatch();
    const history = useHistory();

    const {ingredients} = useSelector((state) => state.burgerIngredients);
    // const [background, setBackground] = useState(false);

    useEffect(() => {
        if (ingredients.length <= 0) {
            dispatch(getIngredientsThunk());
        }
    }, [dispatch, ingredients]);

    const background = location.state?.background;
    const number = location.state && location.state.number;
    const orders = location.state && location.state.orders;

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
                        <Route path='/feed' exact={true}>
                            <FeedPage/>
                        </Route>
                        <ProtectedRoute path={`/profile/orders/:id`} exact={true}>
                            <OrderPage />
                        </ProtectedRoute>
                        <Route path='/feed/:id' exact={true} children={<OrderPage/>}/>
                        <Route path='/ingredients/:id' exact={true} children={<IngredientDetails/>}/>
                        <ProtectedRoute path="/profile" exact={false}>
                            <Profile/>
                        </ProtectedRoute>
                    </Switch>
                    {background && (
                        <Route path='/feed/:id'>
                            <Modal
                                headerText={`#${number}`}
                                onClose={handleClose}>
                                <FeedDetails orders={orders}/>
                            </Modal>
                        </Route>
                    )}
                    {background && (
                        <ProtectedRoute path='/profile/orders/:id' exact={true}>
                            <Modal
                                headerText={`#${number}`}
                                onClose={handleClose}>
                                <FeedDetails orders={orders} />
                            </Modal>
                        </ProtectedRoute>
                    )}

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

