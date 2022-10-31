import React from "react";
import style from "./profile.module.css";
import UserProfile from "../../components/profile/user-profile/user-profile"
import MenuProfile from "../../components/profile/menu-profile/menu-profile";

const ProfilePage = () => {
    return (
        <div className={style.container}>
            <div className={`${style.profile_container} mt-30 pr-5 pl-5`}>
                <MenuProfile/>
                <div className={`${style.profile_content}`}>
                    <UserProfile/>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;