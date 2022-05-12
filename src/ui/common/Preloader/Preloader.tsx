import React from "react";
import styleModule from './Preloader.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

type PreloaderPropsType = {
    size: string
    color: string
}


export const Preloader = ({size, color}: PreloaderPropsType) => {
    return (
        <div className={styleModule.preloaderBlock}>
            <FontAwesomeIcon style={{fontSize: size, color: color}} className={styleModule.preloaderIcon}
                             icon={faSpinner}/>
        </div>
    );
}



