import React from "react";
import style from "./profile.module.css";
import UserProfile from "../../components/profile/user-profile/user-profile"
import MenuProfile from "../../components/profile/menu-profile/menu-profile";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {OrderList} from "../../components/order-list/order-list";

const ProfilePage = () => {
    let match: {path: string} = useRouteMatch();

    return (
        <div className={style.container}>
            <div className={`${style.profile_container} mt-30 pr-5 pl-5`}>
                <MenuProfile/>
                <Switch>
                    <Route path={`${match.path}/orders`} component={OrderList}/>
                    <Route path={`${match.path}`} component={UserProfile} exact/>
                </Switch>
            </div>
        </div>
    )
}

export default ProfilePage;