import {ProfileInitialStateType, profileReducer, setEditMode, setUserData} from './profile-reducer';
import {UserType} from '../../api/api';

let startState: ProfileInitialStateType;

beforeEach(() => {
    startState = {
        user: {} as UserType,
        editMode: false
    }
});

test('correct user data should be set at state', () => {
    const userData: UserType = {
        _id: '123',
        email: 'r.r@mail.ru',
        name: 'Roman',
        publicCardPacksCount: 2,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: true,
    };
    const endState = profileReducer(startState, setUserData(userData));
    expect(startState.user).toStrictEqual({})
    expect(endState.user).toStrictEqual(userData)
});

test('correct value of editMode should be set at state', () => {
    const endState_1 = profileReducer(startState, setEditMode(true));
    const endState_2 = profileReducer(endState_1, setEditMode(false));
    expect(startState.editMode).toBeFalsy();
    expect(endState_1.editMode).toBeTruthy();
    expect(endState_2.editMode).toBeFalsy()
});