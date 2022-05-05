
export enum NEW_PASSWORD_ACTIONS_TYPE {
    SAVE_NEW_PASSWORD = 'SAVE_NEW_PASSWORD',
}

const initialState = {
    isFetching: false
}
type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: NewPasswordActionsType): InitialStateType => {
    switch (action.type) {
        case NEW_PASSWORD_ACTIONS_TYPE.SAVE_NEW_PASSWORD:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}



export type NewPasswordActionsType = ReturnType<typeof saveNewPassword>

export const saveNewPassword = (isFetching: boolean) => {
    return {
        type: NEW_PASSWORD_ACTIONS_TYPE.SAVE_NEW_PASSWORD,
        isFetching,
    }
}