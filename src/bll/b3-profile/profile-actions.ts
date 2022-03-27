export enum PROFILE_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
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

