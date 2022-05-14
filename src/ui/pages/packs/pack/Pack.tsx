import React, { useState } from 'react';
import s from './Pack.module.css';
import { CardPackType } from '../../../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../bll/hooks';
import { deletePackTC, editPackTC } from '../../../../bll/packs/packs-reducer';
import { Button } from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import { InputText } from '../../../common/InputText/InputText';
import { cardsActions } from '../../../../bll/cards/cards-reducer';


type PackPropsType = {
  data: CardPackType
}
const Pack: React.FC<PackPropsType> = ({ data }) => {

  const userId = useAppSelector(state => state.profile.user._id);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [newPackName, setNewPackName] = useState(data.name);

  const deletePackHandler = () => {
    dispatch(deletePackTC(data._id));
  };
  const editPackHandler = () => {
    setModalActive(true);
  };

  const getNewPackName = () => {
    dispatch(editPackTC({ _id: data._id, name: newPackName }));
    setModalActive(false);
  };


  //redirect to cards
  const navigate = useNavigate();
  const openPack = () => {
    dispatch(cardsActions.setQuestionSearch(''));
    dispatch(cardsActions.setAnswerSearch(''));
    dispatch(cardsActions.setPackName(data.name));
    dispatch(cardsActions.setPackId(data._id));
    navigate(`/cards/${data._id}`);
  };

  //server data conversion
  const updated = data.updated.slice(0, 10).split('-').reverse().join('.');
  const userName = data.user_name.split('@')[0];


  return (
    <div className={s.tableContent}>
      <div className={s.name} onClick={openPack}>{data.name}</div>
      <div className={s.cards}>{data.cardsCount}</div>
      <div className={s.when}>{updated}</div>
      <div className={s.when}>{userName}</div>
      <div className={s.actions}>
        {data.user_id === userId &&
        <Button red onClick={deletePackHandler}>delete</Button>}
        {data.user_id === userId && <Button onClick={editPackHandler}>edit</Button>}
        <Button green>learn</Button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <h3 style={{ margin: 10 }}>Edit name</h3>
        <InputText value={newPackName} onChangeText={setNewPackName} />
        <Button style={{ marginTop: 20 }} onClick={getNewPackName}>Edit</Button>
      </Modal>
    </div>
  );
};

export default Pack;