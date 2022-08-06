import React, {useEffect, useState} from "react";
import style from "./user-profile.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo, postUserInfo} from "../../../services/actions/user";

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


    const handleOnChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
        setChangedInput(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postUserInfo(formData));
        setChangedInput(false);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setFormData({
            email: user.email,
            name: user.name,
            password: ""
        })
        setChangedInput(false);
    }

    return (
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
    )
}
export default UserProfile;