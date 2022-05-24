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
    const [isPreviewShow, setIsPreviewShow] = useState<boolean>(false)


    const [file64, setFile64] = useState('');


    const onChangePackImage = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const packImage = e.target.files && e.target.files[0];
        if (packImage) {
            setIsPreviewShow(true);
            reader.onloadend = () => {
                setFile64(reader.result as string);
            }
            reader.readAsDataURL(packImage);
        }
    };


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
                    <p>Preview</p>
                    <div className={style.imagePreviewImg}>
                        <img src={file64} alt="Avatar preview"/>
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

