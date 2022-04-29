
export enum REGISTRATION_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
}

const initialState = {}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationReducerType): InitialStateType => {
    switch (action.type) {
        case REGISTRATION_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}


type TestType = {
    type: REGISTRATION_ACTIONS_TYPE.TEST_ACTION
}
export type RegistrationReducerType = TestType

export const TestAC = () => {
    return {
        type: REGISTRATION_ACTIONS_TYPE.TEST_ACTION,
    }
}