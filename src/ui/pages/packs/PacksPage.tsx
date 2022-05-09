import React from 'react';
import s from './Packs.module.css'
import {SuperButton} from "../../common/superButton/SuperButton";
import {SuperDoubleRange} from "../../common/superDoubleRange/SuperDoubleRange";

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
                    <div className={s.gridBlock}>
                        Grid
                        <div className={s.gridHeader}>
                            <div>Name</div>
                            <div>Cards</div>
                            <div>Last Updated</div>
                            <div>Created by</div>
                            <div>Actions</div>
                        </div>

                    </div>
                    <div className={s.paginationBlock}>Pagination</div>

                </div>

            </div>
        </div>
    );
};

export default PacksPage;