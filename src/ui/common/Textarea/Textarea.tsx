import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, TextareaHTMLAttributes} from 'react'
import s from './Textarea.module.scss'

type DefaultTextAreaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>


type SuperInputTextPropsType = DefaultTextAreaPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    customStyle?: string
}

export const Textarea: React.FC<SuperInputTextPropsType> = (
    {
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, name, title,
        customStyle,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    };

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`;
    const finalInputClassName = `${error ? `${s.errorTextarea} ${s.superTextarea}` : s.superTextarea} ${className}`;

    return (
        <div className={customStyle ? `${customStyle} ${s.textAreaWrapper}` : s.textAreaWrapper}>
            <textarea name={name}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   className={finalInputClassName}
                   {...restProps}
            />
            {error && <div className={finalSpanClassName}>{error}</div>}
        </div>
    )
};

