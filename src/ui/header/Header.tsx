import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Header.module.css'
import {PATH} from "../routes/RoutesApp";
import {useAppSelector} from "../../bll/store";

type ActiveClassNameType = {
    isActive: boolean
}

export const setClassName = ({isActive}: ActiveClassNameType) => isActive ? s.active : s.link


function Header() {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
//не пинайте за говнокод)
    return <>
        {!isLoggedIn ?
            <div className={s.header}>
                <NavLink to={PATH.LOGIN} className={setClassName}>Login</NavLink>
                <NavLink to={PATH.REGISTRATION} className={setClassName}>Registration</NavLink>
                <NavLink to={PATH.RECOVER} className={setClassName}>Recover</NavLink>
                {/*<div className={s.menu}></div>*/}
            </div>
            :
            <div className={s.header}>
                <NavLink to={PATH.PROFILE} className={setClassName}>Profile</NavLink>
                <NavLink to={PATH.NEW_PASSWORD} className={setClassName}>New-Password</NavLink>
                <NavLink to={PATH.TEST} className={setClassName}>Test</NavLink>
            </div>
        }
    </>
}

export default Header
