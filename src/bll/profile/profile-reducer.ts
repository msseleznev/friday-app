import {profileAPI, UserType} from '../../api/api';
import {AppThunk} from '../store';
import {setAppError, setIsAppFetching} from '../app/app-reducer';

export enum PROFILE_ACTIONS_TYPE {
    SET_USER_DATA = 'cards/profile/SET_USER_DATA',
    SET_IS_FETCHING = 'cards/profile/SET_IS_FETCHING',
    SET_EDIT_MODE = 'cards/profile/SET_EDIT_MODE',
}


const initialState = {
    user: {} as UserType,
    editMode:false
};
export type ProfileInitialStateType = typeof initialState

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case PROFILE_ACTIONS_TYPE.SET_USER_DATA:
        case PROFILE_ACTIONS_TYPE.SET_IS_FETCHING:
        case PROFILE_ACTIONS_TYPE.SET_EDIT_MODE:
            return {...state, ...action.payload};
        default:
            return state
    }
};


export type ProfileActionsType =
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setEditMode>

// A C T I O N S
export const setUserData = (user: UserType) => ({
        type: PROFILE_ACTIONS_TYPE.SET_USER_DATA,
        payload: {user}
    } as const
);
export const setIsFetching = (isFetching: boolean) => ({
        type: PROFILE_ACTIONS_TYPE.SET_IS_FETCHING,
        payload: {isFetching}
    } as const
);
export const setEditMode = (editMode: boolean) => ({
        type: PROFILE_ACTIONS_TYPE.SET_EDIT_MODE,
        payload: {editMode}
    } as const
);


// T H U N K S
export const updateProfileUserData = (name: string, avatar?: string): AppThunk => dispatch => {
    dispatch(setIsAppFetching(true));
    profileAPI.update(name, avatar)
        .then(data => {
            dispatch(setUserData(data.updatedUser));
            dispatch(setEditMode(false))
            dispatch(setAppError(''))
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
            dispatch(setAppError(error))
        })
        .finally(() => {
            dispatch(setIsAppFetching(false))
        })
};


