import React, {ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState} from "react";
import style from "./user-profile.module.css";
import {EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUserInfo, postUserInfo} from "../../../services/actions/user";
import {Button} from "../../../utils/components";
import {NavLink, Redirect, Switch, Route, useRouteMatch} from 'react-router-dom';
import {OrderList} from "../../order-list/order-list";
import {useDispatch, useSelector} from "../../../services/hooks";
import {TUser} from "../../../services/api";

const UserProfile = () => {
    const {user, getUserSuccess} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [isChangedInput, setChangedInput] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch])

    useEffect(() => {
        if (getUserSuccess) {
            setFormData({
                ...formData,
                email: user.email,
                name: user.name
            })
        }
        console.log(formData);
    }, [user])


    const handleOnChange = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement
        setFormData({...formData, [target.name]: target.value});
        setChangedInput(true);
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(formData)
        dispatch(postUserInfo(formData as TUser));
        setChangedInput(false);
    }

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setFormData({
            email: user.email,
            name: user.name,
            password: ""
        })
        setChangedInput(false);
    }

    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/orders`} exact={true}>
                <OrderList/>
            </Route>
            <Route path={`${path}`} exact={true}>
                <div>
                    <form onSubmit={handleSubmit} className={`${style.form}`}>
                        <div className="mb-6">
                            <Input
                                placeholder="Имя"
                                name={"name"}
                                onChange={handleOnChange}
                                size={"default"}
                                type={"text"}
                                icon={"EditIcon"}
                                value={formData.name}
                            />
                        </div>
                        <div className="mb-6">
                            <EmailInput onChange={handleOnChange} value={formData.email} name={'email'}/>
                        </div>
                        <div className="mb-6">
                            <Input
                                placeholder="Пароль"
                                name={"password"}
                                onChange={handleOnChange}
                                errorText={'Ошибка какая то'}
                                size={"default"}
                                type={"password"}
                                icon={"EditIcon"}
                                value={formData.password}
                            />
                        </div>
                        {isChangedInput && (
                            <div className={`${style.form_buttons} mb-20`}>
                                <Button type={"primary"} size="medium">Сохранить</Button>
                                <Button type={"secondary"} size="medium" onClick={handleCancel}>Отмена</Button>
                            </div>
                        )}
                    </form>
                </div>
            </Route>

        </Switch>
    )
}
export default UserProfile;