import React from 'react'
import s from "./Modal.module.css"


type ModalPropsType = {
    active: boolean
    setActive: (setModalActive: boolean) => void
    children: React.ReactNode;
}

const Modal: React.FC<ModalPropsType> = (
    {
        active,
        setActive,
        children
    }) => {
    return (
        <div className={active ? `${s.modal} ${s.active}` : s.modal} onClick={() => setActive(false)}>
            <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>

        </div>
    );
};

export default Modal;