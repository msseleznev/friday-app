import React from 'react';
import s from "./Pack.module.css";
import {CardPackType} from "../../../../api/api";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../bll/hooks";
import {deletePackTC} from "../../../../bll/packs/packs-reducer";
import {Button} from "../../../common/Button/Button";


type PackPropsType = {
    data: CardPackType
}
const Pack: React.FC<PackPropsType> = ({data}) => {

    const userId = useAppSelector(state => state.profile.user._id)
    const dispatch = useAppDispatch()

    const deletePackHandler = () => {
        dispatch(deletePackTC(data._id))
    }


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
                {data.user_id === userId && <Button red onClick={deletePackHandler}>delete</Button>}
                {data.user_id === userId &&<Button>edit</Button>}
                <Button green>learn</Button>
            </div>
        </div>
    );
};

export default Pack;