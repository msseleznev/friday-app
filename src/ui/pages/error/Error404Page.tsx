import React from 'react'
// import {PATH} from "../Routes";
// import {NavLink} from "react-router-dom";
// import {setClassName} from "../Header";
import s from "./Error404.module.css";
import cat from './cat.png';


export const Error404Page = () => {

    return (
        <div className={s.box}>
            <div>
                <div className={s.child_box1}>404</div>
                <div className={s.child_box2}>Упс! Страница не найдена</div>
                <div className={s.child_box2}>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
                {/*<NavLink to={PATH.PRE_JUNIOR} className={setClassName}>Нажмите для возврата к странице*/}
                {/*    Pre-junior</NavLink>*/}
            </div>
            <img src={cat} alt={cat}/>
        </div>
    )
};

