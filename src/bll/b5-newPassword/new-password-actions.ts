export enum NEW_PASSWORD_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
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

