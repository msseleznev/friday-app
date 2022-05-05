import style from './ErrorBar.module.css'

type ErrorBarPropsType = {
    error: string
}

export const ErrorBar = ({error}: ErrorBarPropsType) => {
    return (
        <div className={style.errorBarWrapper}>
            {error}
        </div>
    )
}