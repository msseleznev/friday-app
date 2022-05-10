import React from 'react';
import s from "./Pack.module.css";
import {SuperButton} from "../../../common/superButton/SuperButton";
import {CardPackType} from "../../../../api/api";
import {useNavigate} from "react-router-dom";

type PackPropsType = {
    data: CardPackType
}
const Pack: React.FC<PackPropsType> = ({data}) => {


    const navigate = useNavigate()
    const redirectToLogin = () => navigate(`/cards/${data._id}`)

    return (
        <div className={s.tableContent}>
            <div className={s.name} onClick={redirectToLogin}>{data.name}</div>
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