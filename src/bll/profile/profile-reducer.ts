import {profileAPI, UserType} from '../../api/api';
import {AppThunk} from '../store';
import {setAppError} from '../app/app-reducer';
import axios from 'axios';

export enum PROFILE_ACTIONS_TYPE {
    SET_USER_DATA = 'cards/profile/SET_USER_DATA',
    SET_IS_PROFILE_FETCHING = 'cards/profile/SET_IS_PROFILE_FETCHING',
}


const initialState = {
    user: {} as UserType,
    isProfileFetching:false
};
export type ProfileInitialStateType = typeof initialState

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case PROFILE_ACTIONS_TYPE.SET_USER_DATA:
        case PROFILE_ACTIONS_TYPE.SET_IS_PROFILE_FETCHING:
            return {...state, ...action.payload};
        default:
            return state
    }
};


export type ProfileActionsType =
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setIsProfileFetching>

// A C T I O N S
export const setUserData = (user: UserType) => ({
        type: PROFILE_ACTIONS_TYPE.SET_USER_DATA,
        payload: {user}
    } as const
);
export const setIsProfileFetching = (isProfileFetching: boolean) => ({
        type: PROFILE_ACTIONS_TYPE.SET_IS_PROFILE_FETCHING,
        payload: {isProfileFetching}
    } as const
);


// T H U N K S
export const updateProfileUserData = (name: string, avatar?: string): AppThunk => dispatch => {
    dispatch(setIsProfileFetching(true));
    profileAPI.update(name, avatar)
        .then(data => {
            dispatch(setUserData(data.updatedUser));
            dispatch(setAppError(''))
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(() => {
            dispatch(setIsProfileFetching(false))
        })
};


