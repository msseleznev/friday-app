import React from 'react'
import style from './Header.module.scss'
import paperStyle from '../common/styles/classes.module.scss';
import {useAppDispatch, useAppSelector} from '../../bll/hooks';
import defaultAvatar from '../../assets/images/profile/defaultUser.svg';
import {DropDownMenu} from './DropDownMenu/DropDownMenu';
import {NavLink, useNavigate} from 'react-router-dom';
import {PATH} from '../routes/RoutesApp';
import {Skeleton} from '../common/Skeleton/Skeleton';
import {logoutTC} from '../../bll/auth/login/login-reducer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import Logo from '../../assets/images/Logo.png';


export const Header = () => {
    const navigate = useNavigate()
    const {avatar} = useAppSelector(state => state.profile.user);
    const isAppFetching = useAppSelector(state => state.app.isAppFetching);
    const onClickLogoHandler = () => {
        navigate(PATH.PACKS)
    };
    const dispatch = useAppDispatch();
    const onLogoutClickHandler = () => dispatch(logoutTC());
    return (
        <div className={`${style.headerWrapper} ${paperStyle.shadowPaper}`} data-z="paper-1">
            {isAppFetching && <Skeleton/>}
            <div className={style.logoBlock}>
                <img src={Logo} alt={'Logo'}
                     onClick={onClickLogoHandler}/>
            </div>
            <div className={style.tab}>
                <NavLink to={PATH.PACKS} className={nav => nav.isActive ? style.active : ''}>
                    Packs list
                </NavLink>
            </div>
            <div className={style.tab}>
                <NavLink to={PATH.PROFILE} className={nav => nav.isActive ? style.active : ''}>
                    Profile
                </NavLink>
            </div>
            <div className={style.tab}>
                <NavLink to={PATH.ABOUT} className={nav => nav.isActive ? style.active : ''}>
                    About
                </NavLink>
            </div>
            <div className={style.settingsBlock}>
                <div className={style.avatar}>
                    <img src={avatar ? avatar : defaultAvatar} alt="Avatar"/>
                </div>
                <DropDownMenu/>
            </div>
            <div className={style.tabLogout} onClick={onLogoutClickHandler}>
                <NavLink to={'#'}>
                    Logout &nbsp;&nbsp; <FontAwesomeIcon icon={faRightFromBracket}/>
                </NavLink>
            </div>
        </div>
    )
};

