import {setIsLoggedIn} from '../auth/login/login-reducer';
import {setUserData} from '../profile/profile-reducer';
import {authAPI} from '../../api/api';
import {AppThunk, NullableType} from '../store';

export enum APP_ACTIONS_TYPE {
    SET_APP_ERROR = 'app/SET_APP_ERROR',
    SET_APP_IS_INITIALIZE = 'app/SET_APP_IS_INITIALIZE',
    SET_IS_APP_FETCHING = 'app/SET_IS_APP_FETCHING',
}

const initialState = {
    appError: '' as NullableType<string>, //предлагаю всем использовать один общий state для хранения ошибок и соответственно setAppError AC
    appIsInitialize: false,
    isAppFetching: false
};
export type AppInitialStateType = typeof initialState

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case APP_ACTIONS_TYPE.SET_APP_ERROR:
        case APP_ACTIONS_TYPE.SET_APP_IS_INITIALIZE:
        case APP_ACTIONS_TYPE.SET_IS_APP_FETCHING:
            return {
                ...state, ...action.payload
            };
        default:
            return state
    }
};


export type AppActionsType =
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppIsInitialize>
    | ReturnType<typeof setIsAppFetching>


// A C T I O N S
export const setAppError = (appError: string) => ({
        type: APP_ACTIONS_TYPE.SET_APP_ERROR,
        payload: {appError}
    } as const
);
export const setAppIsInitialize = (appIsInitialize: boolean) => ({
        type: APP_ACTIONS_TYPE.SET_APP_IS_INITIALIZE,
        payload: {appIsInitialize}
    } as const
);
export const setIsAppFetching = (isAppFetching: boolean) => ({
        type: APP_ACTIONS_TYPE.SET_IS_APP_FETCHING,
        payload: {isAppFetching}
    } as const
);


// T H U N K S
export const initializeApp = (): AppThunk => dispatch => {
    authAPI.me()
        .then(data => {
            dispatch(setUserData(data))
            dispatch(setIsLoggedIn(true))
        })
        .catch(e => {
            let error;
            if (e.response) {
                if (e.response.data) {
                    error = e.response.data.error
                } else {
                    error = e.message + ', more details in the console'
                }
            }
            console.log('Error: ', {...e})
            console.log(error)
        })
        .finally(() => {
            dispatch(setAppIsInitialize(true))
        })
};



