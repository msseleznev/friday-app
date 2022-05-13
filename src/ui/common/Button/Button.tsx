import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.scss'


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    green?: boolean
}

export const Button: React.FC<SuperButtonPropsType> = (
    {
        red,
        green,
        className,
        ...restProps
    }
) => {
    const finalClassName = `
    ${red ? s.red : s.default} 
    ${green ? s.green : s.default}
    ${className}`;


    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
};

