import React from 'react';
import style from './AboutPage.module.scss';
import paperStyle from '../../common/styles/classes.module.scss';
import {Navigate} from 'react-router-dom';
import pack from '../../../assets/images/about/AddPack.png';
import card from '../../../assets/images/about/AddCard.png';
import learn from '../../../assets/images/about/Learn.png';
import {Logo} from '../../common/Logo/Logo';
import {PATH} from '../../routes/RoutesApp';
import {useAppSelector} from '../../../bll/hooks';

export const AboutPage = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>;
    }
    return (
        <div className={style.aboutBlock}>
            <div className={`${style.aboutContainer} ${paperStyle.shadowPaper}`}
                 data-z='paper'>
                <Logo style={{width: '80px', height: '80px'}}/>
                <h2 className={style.aboutAppDescription}>'Cards learning' is a flashcard app for
                    studying.</h2>
                <h1 className={style.titleHow}>How It Works</h1>
                <div className={style.how}>
                    <div className={style.column}>
                        <h3>1. Create your pack</h3>
                        <p>Press <span style={{color: '#42A5F5'}}>'add pack'</span> button to add a new pack.<br/> Name
                            it.<br/> You can make
                            it private, so only you can see this pack.
                        </p>
                        <img src={pack} alt={'packImg'}/>
                    </div>
                    <div className={style.column}>
                        <h3>2. Create cards to learn</h3>
                        <p>In your pack you can press <span style={{color: '#42A5F5'}}>'add card'</span> to add a new
                            card to your pack.<br/>When
                            you do it, you can write 'question' and 'answer' of a card</p>
                        <img src={card} alt={'cardImg'}/>
                    </div>
                    <div className={style.column}>
                        <h3>3. Learn</h3>
                        <p>If you have cards in a pack, you can press <span style={{color: '#4CAF50'}}>'learn'</span> to
                            study your
                            cards.<br/></p>
                        <img src={learn} alt={'learnImg'}/>
                    </div>
                </div>
                <div className={style.creators}>
                    <p>This app created by:</p>
                    <div className={style.links}>
                        <div className={style.linkColumn}>
                            <a target={'_blank'} href={'https://msseleznev.github.io/portfolio/'}>Mike Seleznev</a>
                            <a target={'_blank'} href={''}>Roma Sushevskij</a>
                        </div>
                        <div className={style.linkColumn}>
                            <a target={'_blank'} href={''}>Ivan Andreev</a>
                            <a target={'_blank'} href={''}>Vlad Izhelya</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};