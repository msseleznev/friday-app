import {setIsLoggedIn} from '../auth/login/login-reducer';
import {setUserData} from '../profile/profile-reducer';
import {authAPI} from '../../api/api';
import {AppThunk, NullableType} from '../store';
import {MESSAGES_FOR_SUCCESS_BAR} from '../../ui/common/SnackBar/SnackBar';

export enum APP_ACTIONS_TYPE {
    SET_APP_ERROR = 'app/SET_APP_ERROR',
    SET_APP_IS_INITIALIZE = 'app/SET_APP_IS_INITIALIZE',
    SET_IS_APP_FETCHING = 'app/SET_IS_APP_FETCHING',
    SET_APP_MESSAGE = 'app/SET_APP_MESSAGE',
}

const initialState = {
    appError: '' as NullableType<string>,
    appMessage: '' as MESSAGES_FOR_SUCCESS_BAR,
    appIsInitialize: false,
    isAppFetching: false
};
export type AppInitialStateType = typeof initialState

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case APP_ACTIONS_TYPE.SET_APP_ERROR:
        case APP_ACTIONS_TYPE.SET_APP_IS_INITIALIZE:
        case APP_ACTIONS_TYPE.SET_IS_APP_FETCHING:
        case APP_ACTIONS_TYPE.SET_APP_MESSAGE:
            return {
                ...state, ...action.payload
            };
        default:
            return state
    }
};


export type AppActionsType =
    | SetAppErrorActionType
    | ReturnType<typeof setAppIsInitialize>
    | ReturnType<typeof setIsAppFetching>
    | ReturnType<typeof setAppMessage>

export type SetAppErrorActionType = ReturnType<typeof setAppError>

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
export const setAppMessage = (appMessage: MESSAGES_FOR_SUCCESS_BAR) => ({
        type: APP_ACTIONS_TYPE.SET_APP_MESSAGE,
        payload: {appMessage}
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
        })
        .finally(() => {
            dispatch(setAppIsInitialize(true))
        })
};



