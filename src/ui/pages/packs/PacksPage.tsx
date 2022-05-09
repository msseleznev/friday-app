import React from 'react';
import s from './Packs.module.css'
import {SuperButton} from "../../common/superButton/SuperButton";
import {SuperDoubleRange} from "../../common/superDoubleRange/SuperDoubleRange";
import Pack from "./pack/Pack";

const testData = [
    {
        _id: "5eb6cef84",
        user_id: "5eb543f6be",
        name: "One",
        cardsCount: 25,
        created: "2020-05-09",
        updated: "2020-05-09"
    },
    {
        _id: "5eb6cef840b7b0d8122d",
        user_id: "5eb543f6bea3ad21480f1ee7",
        name: "Two",
        cardsCount: 4,
        created: "2020-09",
        updated: "2020-09"
    },
    {
        _id: "5eb6cefbf1cf0d8122d",
        user_id: "5eb543f6bea3ad21480f1ee7",
        name: "Three",
        cardsCount: 10,
        created: "2021",
        updated: "2022"
    }

]


const PacksPage = () => {


    return (
        <div className={s.packsBlock}>
            <div className={s.packsContainer}>
                <div className={s.settingsBlock}>
                    <div>
                        <h4>Show packs cards</h4>
                        <SuperButton>My</SuperButton>
                        <SuperButton>All</SuperButton>
                    </div>
                    <div>
                        <h4>Number of cards</h4>
                        <SuperDoubleRange/>
                    </div>
                </div>
                <div className={s.contentBlock}>
                    <div className={s.searchBlock}>Search</div>
                    <div className={s.tableBlock}>
                        Grid
                        <div className={s.tableHeader}>
                            <div className={s.name}>Name</div>
                            <div className={s.cards}>Cards</div>
                            <div className={s.when}>Last Updated</div>
                            <div className={s.when}>Created by</div>
                            <div>Actions</div>
                        </div>
                        {testData.map((t)=> <Pack key = {t._id} data={t}/>)}
                    </div>
                    <div className={s.paginationBlock}>Pagination</div>

                </div>

            </div>
        </div>
    );
};

export default PacksPage;