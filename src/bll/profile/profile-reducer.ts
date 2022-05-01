
export enum PROFILE_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
}


const initialState = {}
type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerType): InitialStateType => {
    switch (action.type) {
        case PROFILE_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}


type TestType = {
    type: PROFILE_ACTIONS_TYPE.TEST_ACTION
}
export type ProfileReducerType = TestType

export const TestAC = () => {
    return {
        type: PROFILE_ACTIONS_TYPE.TEST_ACTION,
    }
}

