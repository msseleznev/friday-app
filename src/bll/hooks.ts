import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppStateType, AppDispatch, AppThunk } from './store';
import {useCallback, useRef} from 'react';


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector


export const useDebounce = (callback: any, delay: number) => {
    const timer = useRef(null as any)

    const debouncedCallback = useCallback((...args:any) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])
    return debouncedCallback;
}