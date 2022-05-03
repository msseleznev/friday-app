
export enum RECOVER_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
}


const initialState = {}
type InitialStateType = typeof initialState

export const recoverReducer = (state: InitialStateType = initialState, action: RecoverReducerType): InitialStateType => {
    switch (action.type) {
        case RECOVER_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}


type TestType = {
    type: RECOVER_ACTIONS_TYPE.TEST_ACTION
}
export type RecoverReducerType = TestType

export const TestAC = () => {
    return {
        type: RECOVER_ACTIONS_TYPE.TEST_ACTION,
    }
}