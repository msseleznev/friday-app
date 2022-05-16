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
import {InputText} from '../../common/InputText/InputText';
import {Checkbox} from '../../common/Checkbox/Checkbox';
import {Button} from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';
import {Paginator} from '../../common/Paginator/Paginator';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSortDown} from '@fortawesome/free-solid-svg-icons/faSortDown';
import {faSortUp} from '@fortawesome/free-solid-svg-icons/faSortUp';


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
    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch, params.sortPacks, params.user_id, params.packName, params.min, params.max, params.pageCount]);

    useEffect(() => {
        if (cardsToShow === PACKS_TYPES.ALL) {
            dispatch(allMyPacks(''));
        } else {
            dispatch(allMyPacks(userId));
        }
    }, [cardsToShow])
    const [nameDir, setNameDir] = useState(faSortUp);
    const [countDir, setCountDir] = useState(faSortUp);
    const [updatedDir, setUpdatedDir] = useState(faSortUp);
    const [createdDir, setCreatedDir] = useState(faSortUp);
    type dirType = typeof faSortUp;

    const sortHandler = (e: React.MouseEvent<HTMLTableHeaderCellElement>, title: string, setHandler: (dir: dirType) => void) => {
        debugger
        if (e.currentTarget.dataset) {
            const trigger = e.currentTarget.dataset.sort;
            dispatch(sortPacks(`${Number(sortParams)}${trigger}`));
            setSortParams(!sortParams);
            if (trigger === title && sortParams) {
                setHandler(faSortUp);
            } else if (trigger === title && !sortParams) {
                setHandler(faSortDown);
            }
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
                        <h4>Packs:</h4>
                        <Radio
                            name={'radio'}
                            options={packsTypes}
                            value={cardsToShow}
                            onChangeOption={setCardsToSHow}
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
                                            onChangeText={setSearchingValue}
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
                            <th onClick={(e) => sortHandler(e, 'name', setNameDir)}
                                data-sort='name'
                                className={style.nameCol}>
                                Name &ensp;
                                <FontAwesomeIcon icon={nameDir}/>
                            </th>
                            <th onClick={(e) => sortHandler(e, 'cardsCount', setCountDir)}
                                data-sort='cardsCount'
                                className={style.cardsCountCol}>
                                Cards &ensp;
                                <FontAwesomeIcon icon={countDir}/>
                            </th>
                            <th onClick={(e) => sortHandler(e, 'updated', setUpdatedDir)}
                                data-sort='updated'
                                className={style.updatedCol}>
                                Last Updated &ensp;
                                <FontAwesomeIcon icon={updatedDir}/>
                            </th>
                            <th onClick={(e) => sortHandler(e, 'created', setCreatedDir)}
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
                        {cardsPacks.map((t) => <TestPack key={t._id} data={t}/>)}
                        </tbody>
                    </table>
                </div>
                <div className={style.paginationBlock}>
                    <Paginator portionSize={5}/>
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

export default TestPacksPage;