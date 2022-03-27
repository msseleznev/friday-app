import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type SuperButtonPropsType = DefaultButtonPropsType & {

    red?: boolean
    green?: boolean
    orange?: boolean

}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, green, orange, className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `
    ${s.default}  
    ${red ? s.red : s.default} 
    ${green ? s.green : s.default} 
    ${orange ? s.orange : s.default}     
    ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}


