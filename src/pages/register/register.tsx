import style from "./register.module.css";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {postRegisterUser} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {getCookie} from "../../utils/cookieUtils";
import {Button, PasswordInput} from "../../utils/components";
import {useForm} from "../../hook/useForm";


const RegisterPage = () => {
    const history = useHistory();
    const dispatch:any =  useDispatch();
    const {isAuth, registerUserRequest} = useSelector((state:any) => state.userReducer);

    useEffect(() => {
        if (registerUserRequest)
            history.push('/login');
        if (isAuth)
            history.push('/')
        if (getCookie('accessToken'))
            history.push('/');
    }, [registerUserRequest, history]);

    const [formData, setFormData] = useState({
        password: "",
        name: "",
        email: ""
    })

    const {values, handleChange, setValues} = useForm({});
    // const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const handleFormSubmit = (e:FormEvent) => {
       e.preventDefault();
        dispatch(postRegisterUser(formData.password, formData.name, formData.email));
    }

    if (isAuth) {
        return (<Redirect to={{pathname: '/'}}/>)
    }

    return (
        <div className={style.container}>
            <div className={style.login_container}>
                <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
                <form onSubmit={handleFormSubmit} className="form" action="">
                    <div className="form_item mb-6">
                        <Input
                            placeholder="Имя"
                            name={"name"}
                            onChange={handleChange}
                            size={"default"}
                            type={"text"}
                            value={formData.name}
                        />
                    </div>
                    <div className="form_item mb-6">
                        <Input
                            name={"email"}
                            placeholder="E-mail"
                            size={"default"}
                            type={"email"}
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div className="form__item mb-6">
                        <PasswordInput
                            size={"default"}
                            type={"password"}
                            name={"password"}
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div className={`${style.form_button} mb-20`}>
                        <Button type={"primary"} size="medium">Зарегистрироваться</Button>
                    </div>
                </form>
                <div className={style.login_links}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Уже зарегистрированы? <Link to={`/login`} className="text text_color_accent">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage;