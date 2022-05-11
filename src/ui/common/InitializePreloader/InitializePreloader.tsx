import React from "react";
import style from './InitializePreloader.module.scss';


export const InitializePreloader = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.balls}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}



