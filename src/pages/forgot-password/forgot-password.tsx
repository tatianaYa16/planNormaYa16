import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import styles from "./forgot-password.module.css";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postForgotPassword} from "../../services/actions/user";
import {getCookie} from "../../utils/cookieUtils";
import {Button} from "../../utils/components";


const ForgotPasswordPage = () => {
    const history = useHistory();
    const dispatch: any = useDispatch();
    const [email, setEmail] = useState<string>("");

    const {forgotPasswordRequest, isAuth} = useSelector((state: any) => state.userReducer);

    useEffect(() => {
        if (forgotPasswordRequest)
            history.push('/reset-password');
        if (isAuth)
            history.push('/')
        console.log(getCookie('accessToken'));
        if (getCookie('accessToken'))
            history.push('/');
    }, [forgotPasswordRequest, history]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        dispatch(postForgotPassword(email));
    }

    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }

    return (
        <div className={styles.container}>
            <div className={styles.login_container}>
                <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
                <form onSubmit={handleSubmitForm} className="form" action="">
                    <div className="mb-6">
                        <Input
                            name={"email"}
                            size={"default"}
                            type={"email"}
                            value={email}
                            placeholder="Укажите e-mail"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`${styles.form_button} mb-20`}>
                        <Button type={"primary"} size="medium">Восстановить</Button>
                    </div>
                </form>
                <div className={styles.login_links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вспомнили пароль? <Link to={`/login`} className="text text_color_accent">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;
