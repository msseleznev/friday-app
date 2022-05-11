import React, {DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState} from 'react'

import style from './EditableSpan.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {CSSTransition} from "react-transition-group";
import {InputText} from '../InputText/InputText';


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperEditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType
}

const EditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus, // игнорировать изменение этого пропса
        onBlur,
        onEnter,
        spanProps,

        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {};

    const onEnterCallback = () => {
        setEditMode(false);

        onEnter && onEnter()
    };
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false);

        onBlur && onBlur(e)
    };
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
        onDoubleClick && onDoubleClick(e)
    };

    const spanClassName = `${style.editSpan} ${className}`;

    return (
        <div className={style.editableSpanWrapper}>
            <CSSTransition in={editMode}
                           timeout={400}
                           classNames={style}
                           unmountOnExit
                           mountOnEnter>
                <div className={style.inputWrapper}>
                    <InputText
                        autoFocus
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}
                        onDoubleClick={onDoubleClickCallBack}
                        error={restProps.error}
                        customStyle={style.inputStyle}

                        {...restProps}
                    />
                </div>
            </CSSTransition>
            <CSSTransition in={!editMode}
                           timeout={500}
                           classNames={style}
                           unmountOnExit
                           mountOnEnter>
                <div className={style.spanWrapper}>
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}
                        {...restSpanProps}
                    >
                        {children || restProps.value}
                        <FontAwesomeIcon className={style.editPen} icon={faPencilAlt}/>
                    </span>
                </div>
            </CSSTransition>
        </div>
    )
}

export default EditableSpan
