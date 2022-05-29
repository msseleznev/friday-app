import React, {ChangeEvent, useRef, useState} from 'react';
import style from "./ModalForPacks.module.scss"
import Modal from "../../../common/Modal/Modal";
import {InputText} from "../../../common/InputText/InputText";
import {Checkbox} from "../../../common/Checkbox/Checkbox";
import {Button} from "../../../common/Button/Button";
import {createPackTC} from "../../../../bll/packs/packs-reducer";
import {useAppDispatch} from "../../../../bll/hooks";
import {ButtonSecondary} from "../../../common/ButtonSecondary/ButtonSecondary";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons/faDownload";
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';

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


    const [file64, setFile64] = useState('');

    const isPreviewShow = file64 !== ""


    const onChangePackImage = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const packImage = e.target.files && e.target.files[0];
        if (packImage) {
            reader.onloadend = () => {
                setFile64(reader.result as string);
            }
            reader.readAsDataURL(packImage);
        }
    };


    const createPackHandler = () => {
        dispatch(createPackTC({name: packName, private: isPrivate, deckCover: file64}));
        setPackName('');
        setPrivate(false);
        setModalActive(false);
        setFile64('')
    };


    return (
        <div className={style.modalBlock}>
            <Modal active={modalActive} setActive={setModalActive}>
                <h4>Create pack</h4>
                <p>Enter name</p>
                <InputText value={packName}
                           onChangeText={setPackName}
                           className={style.packTitleInputBlock}/>
                <div className={style.optionsBlock}>
                    <Checkbox onChangeChecked={setPrivate}
                              checked={isPrivate}>
                        private pack
                    </Checkbox>
                    <input ref={inRef}
                           type="file"
                           onChange={onChangePackImage}
                    />
                    <ButtonSecondary className={style.downloadButton}
                                     onClick={() => inRef.current && inRef.current.click()}>
                        <span>upload image</span>
                        <FontAwesomeIcon icon={faDownload}/>
                    </ButtonSecondary>
                </div>
                {isPreviewShow && <div className={style.imagePreview}>
                    <p>
                        <span>Preview</span>
                        <FontAwesomeIcon icon={faXmark}
                                         onClick={() => setFile64('')}
                        className={style.closeIcon}/>
                    </p>
                    <div className={style.imagePreviewImg}>
                        <img src={file64} alt="New pack preview"/>
                    </div>
                </div>}
                <Button disabled={packName === ''}
                        onClick={createPackHandler}>
                    Create pack
                </Button>
            </Modal>
        </div>
    );
};

