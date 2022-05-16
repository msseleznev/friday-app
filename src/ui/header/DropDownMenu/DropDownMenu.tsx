import React, {memo, useState} from 'react'
import style from './DropDownMenu.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../routes/RoutesApp';
import {faBookOpenReader} from '@fortawesome/free-solid-svg-icons/faBookOpenReader';
import {logoutTC} from '../../../bll/auth/login/login-reducer';
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown';
import {CSSTransition} from 'react-transition-group';

export const DropDownMenu = memo(() => {
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();
    const onLogoutClickHandler = () => dispatch(logoutTC());
    const {name} = useAppSelector(state => state.profile.user)
    const onSettingsClickHandler = () => {
        editMode ? setEditMode(false) : setEditMode(true)
    };
    return (
        <div tabIndex={0}
             onBlur={() => setEditMode(false)}
             className={style.dropdownWrapper}>
            <div className={style.nameAndToggle}
                 onClick={onSettingsClickHandler}>
                {name ? name : 'nickName'} <FontAwesomeIcon icon={faAngleDown}
                                                            className={style.angleDown}/>
            </div>
            <CSSTransition in={editMode}
                           classNames={style}
                           timeout={600}
                           unmountOnExit
                           mountOnEnter>
                <div className={style.dropdownBody}>
                    <NavLink to={PATH.PROFILE}
                             className={nav =>  nav.isActive ? `${style.menuItem} ${style.active}` : style.menuItem}>
                        Profile
                        <span>
                <FontAwesomeIcon icon={faUser}/>
            </span>
                    </NavLink>
                    <NavLink to={PATH.PACKS}
                             className={nav =>  nav.isActive ? `${style.menuItem} ${style.active}` : style.menuItem}>
                        Packs list
                        <span>
                <FontAwesomeIcon icon={faBookOpenReader}/>
            </span>
                    </NavLink>
                    <div className={style.menuItem} onClick={onLogoutClickHandler}>
                <span>
                Logout
                </span>
                        <span>
                <FontAwesomeIcon icon={faRightFromBracket}/>
            </span>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
});

