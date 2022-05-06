import style from './ErrorBar.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {useDispatch} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {setAppError} from '../../../bll/app/app-reducer';
import {NullableType} from '../../../bll/store';


type ErrorBarPropsType = {
    error: string
}

export const ErrorBar = ({error}: ErrorBarPropsType) => {
    //property on which the display of the ErrorBar depends
    const [isShowError, setIsShowError] = useState(false);
    const dispatch = useDispatch();
    const nodeRef = useRef(null);

    //synchronization appError and isShowError
    useEffect(() => {
        if (!!error) {
            setIsShowError(true)
        }
    }, [error]);

    //closing ErrorBar by click and than clear appError after some time
    let closeTimerId = useRef<NullableType<ReturnType<typeof setTimeout>>>(null);
    const onCloseErrorBarHandler = () => {
        setIsShowError(false);
        closeTimerId.current = setTimeout(() => {
            dispatch(setAppError(''))
        }, 300)
    };

    //closing ErrorBar after some time
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setIsShowError(false);
        }, 4000);
        return () => {
            clearTimeout(timeoutID);
            clearTimeout(closeTimerId.current as ReturnType<typeof setTimeout>);
        }
    }, []);

    //clear appError after some time
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            dispatch(setAppError(''))
        }, 4400);
        return () => {
            clearTimeout(timeoutID);
            dispatch(setAppError(''))
        }
    }, []);


    return (
        <CSSTransition
            in={isShowError}
            timeout={300}
            classNames={style}
            unmountOnExit
            mountOnEnter
            nodeRef={nodeRef}
        >
            <div className={style.errorBarWrapper}
                 ref={nodeRef}>
                <div className={style.errorIcon}>
                    <FontAwesomeIcon icon={faCircleExclamation}/>
                </div>
                <p>{error}</p>
                <div className={style.closeErrorBar}
                     onClick={onCloseErrorBarHandler}>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
            </div>
        </CSSTransition>
    )
};