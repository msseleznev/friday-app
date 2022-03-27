export enum RECOVER_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
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

