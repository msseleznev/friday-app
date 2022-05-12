import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './Checkbox.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeChecked && onChangeChecked(e.currentTarget.checked);
    };

    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

    return (
        <>
            <div className={s.checkbox}>
                <input type="checkbox"
                       onChange={onChangeCallback}
                       className={finalInputClassName}
                       {...restProps}
                       id="chekcbox1"/>
                <label htmlFor="chekcbox1">
                    <span className={s.checkboxIcon}></span>
                    {children && <span className={s.spanClassName}>{children}</span>}</label>
            </div>
        </>
    )
};