import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Header.module.css'
import {PATH} from "../routes/RoutesApp";

type ActiveClassNameType = {
    isActive: boolean
}

export const setClassName = ({isActive}: ActiveClassNameType) => isActive ? s.active : s.link

function Header() {
    return (
        <div className={s.header}>
            <NavLink to={PATH.LOGIN} className={setClassName}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION} className={setClassName}>Registration</NavLink>
            <NavLink to={PATH.PROFILE} className={setClassName}>Profile</NavLink>
            <NavLink to={PATH.RECOVER} className={setClassName}>Recover</NavLink>
            <NavLink to={PATH.NEW_PASSWORD} className={setClassName}>New-Password</NavLink>
            <NavLink to={PATH.TEST} className={setClassName}>Test</NavLink>
            {/*<div className={s.menu}></div>*/}
        </div>
    )
}

export default Header
