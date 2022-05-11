import React, {useState} from 'react'
import style from './Header.module.scss'
import {Logo} from '../common/Logo/Logo';
import paperStyle from '../common/styles/classes.module.scss';
import {useAppSelector} from '../../bll/hooks';
import defaultAvatar from '../../assets/images/profile/defaultUser.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown';
import {DropDownMenu} from './DropDownMenu/DropDownMenu';
import {CSSTransition} from "react-transition-group";


export const Header = () => {
    const [editMode, setEditMode] = useState(false);
    const onSettingsClickHandler = () => {
        editMode ? setEditMode(false) : setEditMode(true)
    };
    const {name, avatar} = useAppSelector(state => state.profile.user)
    return (
        <div tabIndex={1} className={`${style.headerWrapper} ${paperStyle.shadowPaper}`} data-z="paper-1">
            <div className={style.logo}>
                <Logo style={{width: '40px', height: '40px'}}/>
                <div className={style.title}>
                    <h1>Cards</h1>
                    <span>learning</span>
                </div>
            </div>
            <div className={style.settingsBlock}>
                <div className={style.avatar}>
                    <img src={avatar ? avatar : defaultAvatar} alt="Avatar"/>
                </div>
                <div className={style.nameAndToggle}
                     onClick={onSettingsClickHandler}>
                    {name ? name : 'nickName'} <FontAwesomeIcon icon={faAngleDown}
                                                                className={style.angleDown}/>
                    <CSSTransition in={editMode}
                                   classNames={style}
                                   timeout={600}
                                   unmountOnExit
                                   mountOnEnter>
                        <DropDownMenu setEditMode={setEditMode} editMode={editMode}/>
                    </CSSTransition>
                </div>
            </div>
        </div>
    )
};

