import {AppInitialStateType, appReducer, setAppError, setAppIsInitialize, setIsAppFetching} from './app-reducer';
import {NullableType} from '../store';
import {MESSAGES_FOR_SUCCESS_BAR} from '../../ui/common/SnackBar/SnackBar';



let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        appError: '' as NullableType<string>,
        appMessage: '' as MESSAGES_FOR_SUCCESS_BAR,
        appIsInitialize: false,
        isAppFetching: false
    }
});

test('correct appError should be set at state', () => {
    const appError = 'Some error'
    const endState = appReducer(startState, setAppError(appError));

    expect(startState.appError).toBe('');
    expect(endState.appError).toBe(appError);
});
test('correct value of isInitialize should be set at state', () => {
    const endState = appReducer(startState, setAppIsInitialize(true));

    expect(startState.appIsInitialize).toBeFalsy();
    expect(endState.appIsInitialize).toBeTruthy();

});
test('correct value of isAppFetching should be set at state', () => {
    const endState_1 = appReducer(startState, setIsAppFetching(true));
    const endState_2 = appReducer(endState_1, setIsAppFetching(false));
    expect(startState.isAppFetching).toBeFalsy();
    expect(endState_1.isAppFetching).toBeTruthy();
    expect(endState_2.isAppFetching).toBeFalsy()
});
