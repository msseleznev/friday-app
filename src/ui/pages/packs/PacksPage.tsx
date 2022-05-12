import React, {useEffect, useState} from 'react';
import s from './Packs.module.css'
import {SuperButton} from "../../common/superButton/SuperButton";
import {SuperDoubleRange} from "../../common/superDoubleRange/SuperDoubleRange";
import Pack from "./pack/Pack";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {getPacksTC, searchPacks, sortPacks} from "../../../bll/packs/packs-reducer";
import {SuperInputText} from "../../common/superInputText/SuperInputText";


const PacksPage = () => {
    const cardsPacks = useAppSelector(state => state.packs.cardPacks)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const params = useAppSelector(state => state.packs.params)
    const [sortParams, setSortParams] = useState<boolean>(false)
    const [searchingValue, setSearchingValue] = useState<string>('')
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getPacksTC(params))
    }, [params])
    const sortHandler = (e: any) => {
        if (e.target.dataset) {
            const trigger = e.currentTarget.dataset.sort
            dispatch(sortPacks(`${Number(sortParams)}${trigger}`))
            setSortParams(!sortParams)
        }
    }
    return (
        <div className={s.packsBlock}>
            <div className={s.packsContainer}>
                <div className={s.settingsBlock}>
                    <div>
                        <h4>Show packs cards</h4>
                        <SuperButton>My</SuperButton>
                        <SuperButton>All</SuperButton>
                    </div>
                    <div className={s.doubleRangeContainer}>
                        <h4>Number of cards</h4>
                        <SuperDoubleRange min={minCardsCount} max={maxCardsCount}/>
                    </div>
                </div>
                <div className={s.contentBlock}>
                    <div className={s.searchBlock}>
                        <SuperInputText type='text'
                                        value={searchingValue}
                                        onChangeText={setSearchingValue}
                                        placeholder={'Search'}
                        />
                        <button onClick={()=> dispatch(searchPacks(searchingValue))}>Search</button>
                    </div>
                    <div className={s.tableBlock}>
                        Grid
                        <div className={s.tableHeader}>
                            <div className={s.name}
                                 onClick={sortHandler}
                                 data-sort='name'
                            >Name
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
                        </div>
                        {cardsPacks.map((t) => <Pack key={t._id} data={t}/>)}
                    </div>
                    <div className={s.paginationBlock}>Pagination</div>

                </div>

            </div>
        </div>
    );
};

export default PacksPage;