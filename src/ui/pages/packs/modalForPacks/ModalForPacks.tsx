import React, {ChangeEvent, useRef, useState} from 'react';
import style from "../PacksPage.module.scss";
import Modal from "../../../common/Modal/Modal";
import {InputText} from "../../../common/InputText/InputText";
import {Checkbox} from "../../../common/Checkbox/Checkbox";
import {Button} from "../../../common/Button/Button";
import {createPackTC} from "../../../../bll/packs/packs-reducer";
import {useAppDispatch} from "../../../../bll/hooks";

type ModalForPacksPropsType = {
    modalActive: boolean
    setModalActive: (setModalActive: boolean) => void
}

export const ModalForPacks: React.FC<ModalForPacksPropsType> = (
    {
        modalActive,
        setModalActive,
    }) => {

    const dispatch = useAppDispatch();
    const inRef = useRef<HTMLInputElement>(null);

    const [isPrivate, setPrivate] = useState<boolean>(false);
    const [packName, setPackName] = useState<string>('');

    // const onChangePackImage = (e: ChangeEvent<HTMLInputElement>) => {
    //     const formData = new FormData();
    //     const reader = new FileReader();
    //
    //     const packImage = e.target.files && e.target.files[0];
    //
    //     if (packImage) {
    //         formData.append('packImageFile', packImage, packImage.name);
    //
    //         if (howUploadPhoto === UPLOAD_METHODS.AS_FILE) {
    //             reader.onloadend = () => {
    //                 reader.result && setNewAvatar64(reader.result as string);
    //             };
    //             reader.readAsDataURL(avatarFile)
    //         } else {
    //             reader.readAsText(avatarFile);
    //             setNewAvatarURL(window.URL.createObjectURL(avatarFile))
    //         }
    //     }
    // };



    const createPackHandler = () => {
        dispatch(createPackTC({name: packName, private: isPrivate}));
        setPackName('');
        setPrivate(false);
        setModalActive(false);
    };



    return (
        <div className={style.modalBlock}>
            <Modal active={modalActive} setActive={setModalActive}>
                <h4>Create pack</h4>
                <p>Enter name</p>
                <InputText value={packName}
                           onChangeText={setPackName}
                           className={style.packTitleInputBlock}/>
                <Checkbox onChangeChecked={setPrivate}
                          checked={isPrivate}
                          className={style.checkboxInputBlock}>
                    private pack
                </Checkbox>
                <Button disabled={packName === ''}
                        onClick={createPackHandler}>
                    Create pack
                </Button>
            </Modal>
        </div>
    );
};

