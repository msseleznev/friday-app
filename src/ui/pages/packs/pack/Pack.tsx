import React from 'react';
import s from "./Pack.module.css";
import {SuperButton} from "../../../common/superButton/SuperButton";
import {CardPackType} from "../../../../api/api";

type PackPropsType = {
    data: CardPackType
}
const Pack: React.FC<PackPropsType> = ({data}) => {
    return (
        <div className={s.tableContent}>
            <div className={s.name}>{data.name}</div>
            <div className={s.cards}>{data.cardsCount}</div>
            <div className={s.when}>{data.updated}</div>
            <div className={s.when}>{data.created}</div>
            <div>
                <SuperButton red>delete</SuperButton>
                <SuperButton>edit</SuperButton>
                <SuperButton green>learn</SuperButton>
            </div>
        </div>
    );
};

export default Pack;