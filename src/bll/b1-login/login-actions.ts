export enum LOGIN_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
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

