import React from 'react';
import s from "./Pack.module.css";
import {SuperButton} from "../../../common/superButton/SuperButton";
import {CardPackType} from "../../../../api/api";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../../bll/hooks";

type PackPropsType = {
    data: CardPackType
}
const Pack: React.FC<PackPropsType> = ({data}) => {

    const userId = useAppSelector(state => state.profile.user._id)

    //redirect to cards
    const navigate = useNavigate()
    const redirectToLogin = () => navigate(`/cards/${data._id}`)

    //server data conversion
    const updated = data.updated.slice(0, 10).split("-").reverse().join(".")
    const userName = data.user_name.split("@")[0]


    return (
        <div className={s.tableContent}>
            <div className={s.name} onClick={redirectToLogin}>{data.name}</div>
            <div className={s.cards}>{data.cardsCount}</div>
            <div className={s.when}>{updated}</div>
            <div className={s.when}>{userName}</div>
            <div className={s.actions}>
                {data.user_id === userId && <SuperButton red>delete</SuperButton>}
                {data.user_id === userId &&<SuperButton>edit</SuperButton>}
                <SuperButton green>learn</SuperButton>
            </div>
        </div>
    );
};

export default Pack;