import styleModule from './Logo.module.scss'
type LogoPropsType = {
    style: { width: string, height: string }
}
export const Logo = ({style}: LogoPropsType) => {
    return (
        <div style={style} className={styleModule.logoWrapper}>
            <div className={styleModule.container}>
                <div className={styleModule.card} data-z={'3'}></div>
                <div className={styleModule.card} data-z={'2'}></div>
                <div className={styleModule.card} data-z={'1'}></div>
            </div>
        </div>
    )
}