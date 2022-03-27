export enum REGISTRATION_ACTIONS_TYPE {
    TEST_ACTION = 'TEST_ACTION',
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

