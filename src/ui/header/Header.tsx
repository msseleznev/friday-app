import React, {useState} from 'react'
import style from './Header.module.scss'
import {Logo} from '../common/Logo/Logo';
import paperStyle from '../common/styles/classes.module.scss';
import {useAppSelector} from '../../bll/hooks';
import defaultAvatar from '../../assets/images/profile/defaultUser.svg';
import {DropDownMenu} from './DropDownMenu/DropDownMenu';
import {NavLink, useNavigate} from 'react-router-dom';
import {PATH} from '../routes/RoutesApp';


export const Header = () => {
    const [editMode, setEditMode] = useState(false);
    const onSettingsClickHandler = () => {
        editMode ? setEditMode(false) : setEditMode(true)
    };
    const navigate = useNavigate()
    const {name, avatar} = useAppSelector(state => state.profile.user)
    const onClickLogoHandler = () => {
        navigate(PATH.PACKS)
    }
    return (
        <div className={`${style.headerWrapper} ${paperStyle.shadowPaper}`} data-z="paper-1">
            <div className={style.logo}
                 onClick={onClickLogoHandler}>
                <Logo style={{width: '40px', height: '40px'}}/>
                <div className={style.title}>
                    <h1>Cards</h1>
                    <span>learning</span>
                </div>
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
            <div className={style.settingsBlock}>
                <div className={style.avatar}>
                    <img src={avatar ? avatar : defaultAvatar} alt="Avatar"/>
                </div>
                <DropDownMenu/>
            </div>
        </div>
    )
};

