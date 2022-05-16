import React, {useEffect, useState} from 'react';
import s from './Packs.module.css';
import {Pack} from './pack/Pack';
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import {
  allMyPacks,
  createPackTC,
  getPacksTC, searchMinMaxCards,
  searchPacks,
  setPage,
  setPageCount,
  sortPacks,
} from '../../../bll/packs/packs-reducer';
import Modal from '../../common/Modal/Modal';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../routes/RoutesApp';
import {Checkbox} from '../../common/Checkbox/Checkbox';
import {Button} from '../../common/Button/Button';
import {InputText} from '../../common/InputText/InputText';
import {DoubleRangeCardsPacks} from '../../common/doubleRangeCardsPacks/DoubleRangeCardsPacks';
import {Paginator} from '../../common/Paginator/Paginator';
import {Preloader} from '../../common/Preloader/Preloader';


const PacksPage = () => {
    const cardsPacks = useAppSelector(state => state.packs.cardPacks);
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
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

    const createPackHandler = () => {
        dispatch(createPackTC({name: packName, private: isPrivate}));
        setPackName('');
        setPrivate(false);
        setModalActive(false);
    };
    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch, params.sortPacks, params.user_id, params.packName, params.min, params.max, params.pageCount]);

    const myPacksHandler = () => {
        dispatch(allMyPacks(userId));
        dispatch(searchMinMaxCards(0, 0))
        dispatch(sortPacks(''))
    };
    const allPacksHandler = () => {
        dispatch(allMyPacks(''));
        dispatch(searchMinMaxCards(0, 0))
        dispatch(sortPacks(''))
    };

    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch, params]);

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
        <div className={s.packsBlock}>
            <div className={s.packsContainer}>
                <div className={s.settingsBlock}>
                    <div>
                        <h4>Show packs cards</h4>
                        <Button green onClick={myPacksHandler}>My</Button>
                        <Button onClick={allPacksHandler}>All</Button>
                    </div>
                    <div className={s.doubleRangeContainer}>
                        <h4>Number of cards</h4>
                        <DoubleRangeCardsPacks/>
                    </div>
                </div>
                <div className={s.contentBlock}>
                    <div className={s.searchBlock}>
                        <InputText type='text'
                                   value={searchingValue}
                                   onChangeText={setSearchingValue}
                                   placeholder={'Search'}
                        />
                        <Button className='align-self:center'
                                onClick={() => dispatch(searchPacks(searchingValue))}>Search</Button>
                    </div>
                        <div className={s.tableBlock}>
                            <div className={s.tableHeader}>
                                <div className={s.name}
                                     onClick={sortHandler}
                                     data-sort='name'>Name
                                </div>
                                <div className={s.cards}
                                     onClick={sortHandler}
                                     data-sort='cardsCount'>Cards
                                </div>
                                <div className={s.when}
                                     onClick={sortHandler}
                                     data-sort='updated'>Last Updated
                                </div>
                                <div className={s.when}
                                     onClick={sortHandler}
                                     data-sort='created'>Created by
                                </div>
                                <div className={s.actions}>Actions
                                    <Button onClick={() => setModalActive(true)}>Add pack</Button>
                                </div>
                            </div>
                          {isAppFetching ? <Preloader size={'40px'} color={'#42A5F5'}/> :
                              cardsPacks.map((t) => <Pack key={t._id} data={t}/>)}
                        </div>
                    <div className={s.paginationBlock}>
                        <Paginator portionSize={5}/>
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <h4 style={{margin: 10}}>Create pack</h4>
                <p>Enter name</p>
                <InputText style={{marginBottom: 10}} value={packName}
                           onChangeText={setPackName}/>
                <Checkbox onChangeChecked={setPrivate} checked={isPrivate}>private pack</Checkbox>
                <Button style={{marginTop: 20}} disabled={packName === ''}
                        onClick={createPackHandler}>Create
                    pack</Button>
            </Modal>
        </div>
    );
};

export default PacksPage;