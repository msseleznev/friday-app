import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './ButtonSecondary.module.scss'
import style from '../../pages/login/Login.module.scss';
import paperStyle from '../styles/classes.module.scss';


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const ButtonSecondary: React.FC<SuperButtonPropsType> = (
    {
        red,
        className,
        ...restProps
    }
) => {
    const finalClassName = `${red ? s.red : s.default} ${className}`;


    return (
        <button
             className={`${finalClassName} ${paperStyle.shadowPaper} ${paperStyle.relative}`}
             data-z="paper" data-hover-z="paper-1" data-animated
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
};

