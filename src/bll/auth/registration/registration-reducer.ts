const initialState = {}

//REDUCER

export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
    switch (action.type) {
        case 'TEST':
            return {...state}
        default:
            return state
    }
}


//ACTIONS

export const TestAC = () => ({type: 'TEST'} as const)


//THUNKS


//TYPE
type InitialStateType = typeof initialState
type TestActionType = ReturnType<typeof TestAC>
export type RegistrationActionsType = TestActionType
