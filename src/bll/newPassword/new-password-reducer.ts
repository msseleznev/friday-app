

export enum NEW_PASSWORD_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
}

const initialState = {}
type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: NewPasswordReducerType): InitialStateType => {
    switch (action.type) {
        case NEW_PASSWORD_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}


type TestType = {
    type: NEW_PASSWORD_ACTIONS_TYPE.TEST_ACTION
}
export type NewPasswordReducerType = TestType

export const TestAC = () => {
    return {
        type: NEW_PASSWORD_ACTIONS_TYPE.TEST_ACTION,
    }
}