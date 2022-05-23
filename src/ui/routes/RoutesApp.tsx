import React from 'react';
import { RegistrationPage } from '../pages/registration/RegistrationPage';
import NewPasswordPage from '../pages/newPassword/NewPasswordPage';
import { Error404Page } from '../pages/error/Error404Page';
import { Navigate, Route, Routes } from 'react-router-dom';
import RecoverPage from '../pages/recover/RecoverPage';
import LoginPage from '../pages/login/LoginPage';
import { Profile } from '../pages/profile/Profile';
import PacksPage from '../pages/packs/PacksPage';
import { CardsPage } from '../pages/cards/CardsPage';
import { AboutPage } from '../pages/about/AboutPage';
import { LearnPage } from '../pages/learn/LearnPage';

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    NEW_PASSWORD: '/new-password/*',
    PROFILE: '/profile',
    RECOVER: '/recover',
    PACKS: '/packs',
    CARDS: '/cards/*',
    LEARN: '/learn/*',
    ABOUT: '/about'
};


export const RoutesApp = () => (
    <div className='Routes'>
        <Routes>
            {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу LOGIN*/}
            <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
            <Route path={PATH.LOGIN} element={<LoginPage/>}/>
            <Route path={PATH.REGISTRATION} element={<RegistrationPage/>}/>
            <Route path={PATH.NEW_PASSWORD} element={<NewPasswordPage/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.RECOVER} element={<RecoverPage/>}/>
            <Route path={PATH.PACKS} element={<PacksPage/>}/>
            <Route path={PATH.CARDS} element={<CardsPage/>}/>
            <Route path={PATH.LEARN} element={<LearnPage/>}/>
            <Route path={PATH.ABOUT} element={<AboutPage/>}/>
            {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
            <Route path='*' element={<Error404Page/>}/>
        </Routes>
    </div>
);




