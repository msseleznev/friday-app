import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './PacksPage.module.scss';
import {useAppDispatch, useAppSelector, useDebounce} from '../../../bll/hooks';
import {
    allMyPacks,
    getPacksByPage,
    getPacksTC,
    searchMinMaxCards,
    searchPacks,
    setPageCount,
    sortPacks,
} from '../../../bll/packs/packs-reducer';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../routes/RoutesApp';
import {Radio} from '../../common/Radio/Radio';
import {DoubleRangeCardsPacks} from './doubleRangeCardsPacks/DoubleRangeCardsPacks';
import {InputTextSecondary} from '../../common/InputTextSecondary/InputTextSecondary';
import paperStyle from '../../common/styles/classes.module.scss';
import {ButtonSecondary} from '../../common/ButtonSecondary/ButtonSecondary';
import Pack from './Pack/Pack';
import {Paginator} from '../../common/Paginator/Paginator';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSortDown} from '@fortawesome/free-solid-svg-icons/faSortDown';
import {faSortUp} from '@fortawesome/free-solid-svg-icons/faSortUp';
import {Skeleton} from '../../common/Skeleton/Skeleton';
import {NothingFound} from '../../common/NothingFound/NothingFound';
import {ModalForPacks} from "./modalForPacks/ModalForPacks";


enum PACKS_TYPES {
    ALL = 'All',
    MY = 'My'
}

const PacksPage = () => {
    const cardsPacks = useAppSelector(state => state.packs.cardPacks);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const params = useAppSelector(state => state.packs.params);
    const userId = useAppSelector(state => state.profile.user._id);
    const isAppFetching = useAppSelector(state => state.app.isAppFetching);
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const [searchingValue, setSearchingValue] = useState<string>('');
    const dispatch = useAppDispatch();


    const [modalActive, setModalActive] = useState<boolean>(false);
    const packsTypes = [PACKS_TYPES.ALL, PACKS_TYPES.MY];
    const [cardsToShow, setCardsToSHow] = useState<PACKS_TYPES>(packsTypes[1]);
    useEffect(() => {
        if (params.user_id) {
            setCardsToSHow(PACKS_TYPES.MY)
        } else {
            setCardsToSHow(PACKS_TYPES.ALL)
        }
        return () => {
            dispatch(searchPacks(''))
        }
    }, []);

    //filtering of packs: MY or ALL
    const onChangeRadioHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value as PACKS_TYPES;
        setCardsToSHow(value);
        if (e.currentTarget.value === PACKS_TYPES.ALL) {
            dispatch(allMyPacks(''));
        } else {
            dispatch(allMyPacks(userId));
        }
        dispatch(searchMinMaxCards(0, 0))
        dispatch(sortPacks(''))
    };
    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch, params.sortPacks, params.user_id, params.packName, params.min, params.max, params.pageCount]);

    //functionality for sorting
    const [sortName, setSortName] = useState<boolean>(false);
    const [sortCount, setSortCount] = useState<boolean>(false);
    const [sortUpdate, setSortUpdate] = useState<boolean>(false);
    const [sortCreate, setSortCreate] = useState<boolean>(false);

    const [nameDir, setNameDir] = useState(faSortUp);
    const [countDir, setCountDir] = useState(faSortUp);
    const [updatedDir, setUpdatedDir] = useState(faSortUp);
    const [createdDir, setCreatedDir] = useState(faSortUp);
    type dirType = typeof faSortUp;

    const sortHandler = (e: React.MouseEvent<HTMLTableHeaderCellElement>,
                         title: string,
                         setHandler: (dir: dirType) => void,
                         setSortHandler: (sortDir: boolean) => void,
                         sortDir: boolean) => {
        if (e.currentTarget.dataset) {
            const trigger = e.currentTarget.dataset.sort;
            dispatch(sortPacks(`${Number(sortDir)}${trigger}`));
            if (trigger === title && sortDir) {
                setHandler(faSortUp);
            } else if (trigger === title && !sortDir) {
                setHandler(faSortDown);
            }
        }
        setSortHandler(!sortDir);
    };
    //debounced live search
    const innerDebounceCallback = (value: string) => {
        dispatch(searchPacks(value))
    };
    const debouncedSearch = useDebounce(innerDebounceCallback, 800);
    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setSearchingValue(e.currentTarget.value)
        debouncedSearch(value)
    };
    const onChangePage = (pageNumber: number) => {
        dispatch(getPacksByPage(pageNumber))
    };
    const onChangePageSize = (pageCount: number) => {
        dispatch(setPageCount(pageCount));
    };

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>;
    }


    return (
        <>
            <div className={style.packsWrapper}>
                <div className={`${style.packsContainer} ${paperStyle.shadowPaper}`} data-z="paper">
                    {isAppFetching && <Skeleton/>}
                    <div className={style.settingsBlock}>
                        <div className={style.radioBlock}>
                            <h4>Packs:</h4>
                            <Radio
                                name={'radio'}
                                options={packsTypes}
                                value={cardsToShow}
                                onChange={onChangeRadioHandler}
                            />
                        </div>
                        <div className={style.doubleRangeBlock}>
                            <h4>Cards:</h4>
                            <div className={style.doubleRange}>
                                <DoubleRangeCardsPacks/>
                            </div>
                        </div>
                        <div className={style.inputBlock}>
                            <InputTextSecondary type='text'
                                                value={searchingValue}
                                                onChange={onSearchHandler}
                                                placeholder={'Search'}
                                                className={style.input}/>
                        </div>
                        <div className={style.button}>
                            <ButtonSecondary className={style.primaryButton}
                                             onClick={() => setModalActive(true)}>
                                Add pack
                            </ButtonSecondary>
                        </div>
                    </div>
                    <div className={style.tableBlock}>
                        <table>
                            <thead>
                            <tr>
                                <th onClick={(e) => sortHandler(e, 'name', setNameDir, setSortName, sortName)}
                                    data-sort='name'
                                    className={style.nameCol}>
                                    Name &ensp;
                                    <FontAwesomeIcon icon={nameDir}/>
                                </th>
                                <th onClick={(e) => sortHandler(e, 'cardsCount', setCountDir, setSortCount, sortCount)}
                                    data-sort='cardsCount'
                                    className={style.cardsCountCol}>
                                    Cards &ensp;
                                    <FontAwesomeIcon icon={countDir}/>
                                </th>
                                <th onClick={(e) => sortHandler(e, 'updated', setUpdatedDir, setSortUpdate, sortUpdate)}
                                    data-sort='updated'
                                    className={style.updatedCol}>
                                    Last Updated &ensp;
                                    <FontAwesomeIcon icon={updatedDir}/>
                                </th>
                                <th onClick={(e) => sortHandler(e, 'created', setCreatedDir, setSortCreate, sortCreate)}
                                    data-sort='created'
                                    className={style.userNameCol}>
                                    Created by &ensp;
                                    <FontAwesomeIcon icon={createdDir}/>
                                </th>
                                <th className={style.actions}>
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {cardsPacks.length === 0 && !isAppFetching ?
                                <NothingFound value={params.packName}/> :
                                cardsPacks.map((t) => <Pack key={t._id} data={t}/>)}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.paginationBlock}>
                        <Paginator portionSize={5}
                                   currentPage={params.page}
                                   pageSize={params.pageCount}
                                   totalItemsCount={cardPacksTotalCount}
                                   onChangePage={onChangePage}
                                   onChangePageSize={onChangePageSize}/>

                    </div>
                </div>
            </div>
            <ModalForPacks modalActive={modalActive} setModalActive={setModalActive}/>
        </>
    );
};

export default PacksPage;