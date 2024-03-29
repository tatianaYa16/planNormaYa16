import React, {useState, FormEvent, ChangeEvent} from "react";
import style from "./login.module.css";
import {Link, Redirect, useLocation} from "react-router-dom";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {postLoginUser} from "../../services/actions/user";
import {PasswordInput, Button} from "../../utils/components";
import {ILocation} from "../../utils/types";
import {useDispatch, useSelector} from "../../services/hooks";

const LoginPage = () => {
    const dispatch = useDispatch();
    const location = useLocation<ILocation>();

    const {isAuth} = useSelector(state => state.userReducer);

    const [formData, setFormData] = useState({
        password: "",
        email: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(postLoginUser(formData.password, formData.email));
    }

    if (isAuth) {
        const path = location?.state?.from.pathname || '/'
        return (<Redirect to={{pathname: path}}/>)
    }
    return (
        <div className={style.container}>
            <div className={style.login_container}>
                <h3 className="text text_type_main-medium mb-6">Вход</h3>
                <form onSubmit={handleFormSubmit} className="form">
                    <div className="form__item mb-6">
                        <Input
                            name={"email"}
                            size={"default"}
                            type={"email"}
                            placeholder="E-mail"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div className="form_item mb-6">
                        <PasswordInput
                            type={"password"}
                            size={"default"}
                            name={"password"}
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div className={`${style.form_button} mb-20`}>
                        <Button type={"primary"} size="medium">Войти</Button>
                    </div>
                </form>
                <div className={style.login_links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вы - новый пользователь?
                        <Link to={"/register"}
                              className="text text_color_accent">
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Забыли пароль?
                        <Link to={"/forgot-password"}
                              className="text text_color_accent">
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;
