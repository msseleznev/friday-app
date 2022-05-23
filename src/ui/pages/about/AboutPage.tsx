import React from 'react';
import style from './AboutPage.module.scss';
import paperStyle from '../../common/styles/classes.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import pack from '../../../assets/images/about/AddPack.png';
import myPack from '../../../assets/images/about/MyPack.png';
import card from '../../../assets/images/about/AddCard.png';
import learn from '../../../assets/images/about/Learn.png';
import { Logo } from '../../common/Logo/Logo';

export const AboutPage = () => {

  const navigate = useNavigate();


  return (
    <div className={style.aboutBlock}>
      <div className={`${style.aboutContainer} ${paperStyle.shadowPaper}`}
           data-z='paper'>
        <Logo style={{ width: '80px', height: '80px' }} />
        <h2 className={style.aboutAppDescription}>'Cards learning' is a flashcard app for
          studying.</h2>
        <h1 className={style.titleHow}>How It Works</h1>
        <div className={style.how}>
          <div className={style.column}>
            <h3>1. Create your pack</h3>
            <p>Press 'add pack' button to add new pack.<br /> Name it.<br /> You can make
              it private, so only you can see this pack.
            </p>
            <img src={pack} alt={'packImg'} />
          </div>
          <div className={style.column}>
            <h3>2. Create cards to learn</h3>
            <p>In your pack you can press 'add card' to add new card to your pack.<br />When
              you do it, you can write 'question' and 'answer' of a card</p>
            <img src={card} alt={'cardImg'} />
          </div>
          <div className={style.column}>
            <h3>3. Learn</h3>
            <p>If you have cards in a pack, you can press 'learn' to study your
              cards.<br /></p>
            <img src={learn} alt={'learnImg'} />
          </div>
        </div>
        <div className={style.creators}>
          <p>This app created by:</p>
          <div className={style.links}>
            <div className={style.linkColumn}>
              <Link to={''}>Mike Seleznev</Link>
              <Link to={''}>Roma Sushevskij</Link>
            </div>
            <div className={style.linkColumn}>
              <Link to={''}>Ivan Andreev</Link>
              <Link to={''}>Vlad Izhelya</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};