import axios, {AxiosError} from 'axios';
import {AppActionsType, setAppError} from '../bll/app/app-reducer';
import {Dispatch} from 'redux';

export const handleRequestError = (error: any, dispatch: Dispatch<AppActionsType>) => {
    const data = error?.response?.data
    if (axios.isAxiosError(error) && data) {
        dispatch(setAppError(data.error || 'Some error occurred'));
    } else (dispatch(setAppError('Some error occurred')));
}