import React, {useEffect, useState} from 'react';
import s from './Packs.module.css'
import {SuperButton} from "../../common/superButton/SuperButton";
import {SuperDoubleRange} from "../../common/superDoubleRange/SuperDoubleRange";
import Pack from "./pack/Pack";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {allMyPacks, createPackTC, getPacksTC, sortPacks} from "../../../bll/packs/packs-reducer";
import Modal from "../../common/Modal/Modal";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesApp";
import {Checkbox} from "../../common/Checkbox/Checkbox";
import {Button} from "../../common/Button/Button";
import {InputText} from "../../common/InputText/InputText";


const PacksPage = () => {
    const cardsPacks = useAppSelector(state => state.packs.cardPacks)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const params = useAppSelector(state => state.packs.params)
    const userId = useAppSelector(state => state.profile.user._id)
    const [sortParams, setSortParams] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const [modalActive, setModalActive] = useState<boolean>(false)
    const [isPrivate, setPrivate] = useState<boolean>(false)
    const [packName, setPackName] = useState<string>("")

    const createPackHandler = () => {
        dispatch(createPackTC({name: packName, private: isPrivate}))
        setPackName('')
        setPrivate(false)
        setModalActive(false)
    }
    const myPacksHandler = () => {
        dispatch(allMyPacks(userId))
    }
    const allPacksHandler = () => {
        dispatch(allMyPacks(''))
    }

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, params])

    const sortHandler = (e: any) => {
        if (e.target.dataset) {
            const trigger = e.currentTarget.dataset.sort
            dispatch(sortPacks(`${Number(sortParams)}${trigger}`))
            setSortParams(!sortParams)
        }
    }
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }


    return (
        <div className={s.packsBlock}>
            <div className={s.packsContainer}>
                <div className={s.settingsBlock}>
                    <div>
                        <h4>Show packs cards</h4>
                        <SuperButton onClick={myPacksHandler}>My</SuperButton>
                        <SuperButton onClick={allPacksHandler}>All</SuperButton>
                    </div>
                    <div>
                        <h4>Number of cards</h4>
                        <SuperDoubleRange/>
                    </div>
                </div>
                <div className={s.contentBlock}>
                    <div className={s.searchBlock}>Search</div>
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
                            <div>Actions</div>
                            <SuperButton onClick={() => setModalActive(true)}>Add pack</SuperButton>
                        </div>
                        {cardsPacks.map((t) => <Pack key={t._id} data={t}/>)}


                    </div>
                    <div className={s.paginationBlock}>Pagination</div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <h4>Create pack</h4>
                <p>Enter name</p>
                <InputText value={packName} onChangeText={setPackName}></InputText>
                <Checkbox  onChangeChecked={setPrivate} checked={isPrivate}>private pack</Checkbox>
                <Button disabled={packName === ""} onClick={createPackHandler}>Create pack</Button>
            </Modal>
        </div>
    );
};

export default PacksPage;