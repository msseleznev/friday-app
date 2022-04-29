
export enum LOGIN_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
}

const initialState = {}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: LoginReducerType): InitialStateType => {
    switch (action.type) {
        case LOGIN_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}

type TestType = {
    type: LOGIN_ACTIONS_TYPE.TEST_ACTION
}
export type LoginReducerType = TestType

export const TestAC = () => {
    return {
        type: LOGIN_ACTIONS_TYPE.TEST_ACTION,
    }
}
