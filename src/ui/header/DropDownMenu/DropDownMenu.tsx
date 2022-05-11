import React, {memo} from 'react'
import style from './DropDownMenu.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../routes/RoutesApp';
import {faBookOpenReader} from '@fortawesome/free-solid-svg-icons/faBookOpenReader';
import {logoutTC} from '../../../bll/auth/login/login-reducer';
import {useAppDispatch} from '../../../bll/hooks';

type DropDownMenuPropsType = {
    setEditMode: (editMode: boolean) => void
    editMode: boolean
}
export const DropDownMenu = memo(({setEditMode, editMode}: DropDownMenuPropsType) => {
    const dispatch = useAppDispatch();
    const onLogoutClickHandler = () => dispatch(logoutTC());
    return (
        <div className={style.dropdownWrapper}
             onBlur={() => setEditMode(false)}
             onClick={() => setEditMode(false)}
             tabIndex={0}>
            <NavLink to={PATH.PROFILE} className={style.menuItem}>
                Profile
                <span>
                <FontAwesomeIcon icon={faUser}/>
            </span>
            </NavLink>
            <NavLink to={'#'} className={style.menuItem}>
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
    )
});

