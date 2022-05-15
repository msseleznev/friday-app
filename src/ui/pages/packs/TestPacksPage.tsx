import React, {useEffect, useState} from 'react';
import style from './TestPacksPage.module.scss';
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import {allMyPacks, createPackTC, getPacksTC, sortPacks,} from '../../../bll/packs/packs-reducer';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../routes/RoutesApp';
import {Radio} from '../../common/Radio/Radio';
import {DoubleRangeCardsPacks} from '../../common/doubleRangeCardsPacks/DoubleRangeCardsPacks';
import {InputTextSecondary} from '../../common/InputTextSecondary/InputTextSecondary';
import paperStyle from '../../common/styles/classes.module.scss';
import {ButtonSecondary} from '../../common/ButtonSecondary/ButtonSecondary';
import TestPack from './TestPack/TestPack';

enum PACKS_TYPES {
    ALL = 'All',
    MY = 'My'
}

const TestPacksPage = () => {
    const cardsPacks = useAppSelector(state => state.packs.cardPacks);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const params = useAppSelector(state => state.packs.params);
    const userId = useAppSelector(state => state.profile.user._id);
    const isAppFetching = useAppSelector(state => state.app.isAppFetching);
    const [sortParams, setSortParams] = useState<boolean>(false);
    const [searchingValue, setSearchingValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [isPrivate, setPrivate] = useState<boolean>(false);
    const [packName, setPackName] = useState<string>('');
    const packsTypes = [PACKS_TYPES.ALL, PACKS_TYPES.MY];
    const [cardsToShow, setCardsToSHow] = useState<PACKS_TYPES>(packsTypes[0]);

    const createPackHandler = () => {
        dispatch(createPackTC({name: packName, private: isPrivate}));
        setPackName('');
        setPrivate(false);
        setModalActive(false);
    };
    const myPacksHandler = () => {
        dispatch(allMyPacks(userId));
    };
    const allPacksHandler = () => {
        dispatch(allMyPacks(''));
    };
    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch, params.sortPacks, params.user_id, params.packName, params.min, params.max, params.pageCount]);

    const sortHandler = (e: any) => {
        if (e.target.dataset) {
            const trigger = e.currentTarget.dataset.sort;
            dispatch(sortPacks(`${Number(sortParams)}${trigger}`));
            setSortParams(!sortParams);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>;
    }


    return (
        <div className={style.packsWrapper}>
            <div className={`${style.packsContainer} ${paperStyle.shadowPaper}`} data-z="paper">
                <div className={style.settingsBlock}>
                    <div className={style.radioBlock}>
                        <h4>Show packs cards:</h4>
                        <Radio
                            name={'radio'}
                            options={packsTypes}
                            value={cardsToShow}
                            onChangeOption={setCardsToSHow}
                        />
                    </div>
                    <div className={style.doubleRangeBlock}>
                        <h4>Number of cards:</h4>
                        <DoubleRangeCardsPacks/>
                    </div>
                    <div className={style.inputBlock}>
                        <span>
                            Search:&nbsp;
                        </span>
                        <InputTextSecondary className={style.input}/>
                        <div className={style.button}>
                            <ButtonSecondary className={style.primaryButton}
                                             onClick={() => setModalActive(true)}>
                                Add pack
                            </ButtonSecondary>
                        </div>
                    </div>
                </div>
                <div className={style.tableBlock}>


                    <table>
                        <thead>
                        <tr>
                            <th onClick={sortHandler} data-sort='name'
                                className={style.nameCol}>
                                Name
                            </th>
                            <th onClick={sortHandler} data-sort='name'
                                className={style.cardsCountCol}>
                                Cards
                            </th>
                            <th onClick={sortHandler} data-sort='updated'
                                className={style.updatedCol}>
                                Last Updated
                            </th>
                            <th onClick={sortHandler} data-sort='created'
                                className={style.userNameCol}>
                                Created by
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {cardsPacks.map((t) => <TestPack key={t._id} data={t}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TestPacksPage;