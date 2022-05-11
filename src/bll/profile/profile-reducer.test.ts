import {ProfileInitialStateType, profileReducer, setUserData} from './profile-reducer';
import {UserType} from '../../api/api';

let startState: ProfileInitialStateType;

beforeEach(() => {
    startState = {
        user: {} as UserType,
        isProfileFetching: false
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
