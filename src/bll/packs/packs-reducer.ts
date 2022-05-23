import {CardPackType, CreatePackParams, EditPackParams, packsAPI, PacksParamsType} from "../../api/api";
import {AppThunk} from "../store";
import {setAppError, setAppMessage, setIsAppFetching} from '../app/app-reducer';
import axios from 'axios';
import {setCards} from "../learn/learnReducer";
import {MESSAGES_FOR_SUCCESS_BAR} from '../../ui/common/SnackBar/SnackBar';


export enum PACKS_ACTIONS_TYPE {
    GET_PACKS = 'GET_PACKS',
    GET_SEARCHING_PACKS = 'GET_SEARCHING_PACKS',
    SET_DOUBLE_RANGE_VALUES = 'SET_DOUBLE_RANGE_VALUES',
    GET_MIN_MAX_CARDS = 'GET_MIN_CARDS',
    SORT_PACKS = 'SORT_PACKS',
    ALL_MY_PACKS = 'ALL_MY_PACKS',
    SET_CARD_PACKS_TOTAL_COUNT = 'SET_CARD_PACKS_TOTAL_COUNT',
    SET_PAGE = 'SET_PAGE',
    SET_PAGE_COUNT = 'SET_PAGE_SIZE',
}

const initialState = {
    cardPacks: [] as CardPackType[],
    minCardsCount: 0,
    maxCardsCount: 0,
    cardPacksTotalCount: 0,
    params: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '',
        page: 1,
        pageCount: 10,
        user_id: ''
    } as PacksParamsType,
}
type InitialStateType = typeof initialState


export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case PACKS_ACTIONS_TYPE.GET_PACKS:
            return {...state, cardPacks: action.cardPacks}
        case PACKS_ACTIONS_TYPE.GET_SEARCHING_PACKS:
            return {...state, params: {...state.params, packName: action.packName}}
        case PACKS_ACTIONS_TYPE.SET_DOUBLE_RANGE_VALUES:
            return {...state, minCardsCount: action.min, maxCardsCount: action.max}
        case PACKS_ACTIONS_TYPE.GET_MIN_MAX_CARDS:
            return {...state, params: {...state.params, min: action.min, max: action.max}}
        case PACKS_ACTIONS_TYPE.SORT_PACKS:
            return {...state, params: {...state.params, sortPacks: action.sortPacks}}
        case PACKS_ACTIONS_TYPE.ALL_MY_PACKS:
            return {...state, params: {...state.params, user_id: action.id}}
        case PACKS_ACTIONS_TYPE.SET_CARD_PACKS_TOTAL_COUNT:
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case PACKS_ACTIONS_TYPE.SET_PAGE:
            return {...state, params: {...state.params, page: action.page}}
        case PACKS_ACTIONS_TYPE.SET_PAGE_COUNT:
            return {...state, params: {...state.params, pageCount: action.pageCount}}
        default:
            return state
    }
}

const getPacks = (cardPacks: CardPackType[]) => {
    return {
        type: PACKS_ACTIONS_TYPE.GET_PACKS,
        cardPacks,
    } as const
}
export const allMyPacks = (id: string) => {
    return {
        type: PACKS_ACTIONS_TYPE.ALL_MY_PACKS,
        id
    } as const
}
export const searchPacks = (packName: string) => {
    return {
        type: PACKS_ACTIONS_TYPE.GET_SEARCHING_PACKS,
        packName,
    } as const
}
export const setDoubleRangeValues = (min: number, max: number) => {
    return {
        type: PACKS_ACTIONS_TYPE.SET_DOUBLE_RANGE_VALUES,
        min, max
    } as const
}
export const searchMinMaxCards = (min: number, max: number) => {
    return {
        type: PACKS_ACTIONS_TYPE.GET_MIN_MAX_CARDS,
        min,
        max
    } as const
}
export const sortPacks = (sortPacks: string) => {
    return {
        type: PACKS_ACTIONS_TYPE.SORT_PACKS,
        sortPacks,
    } as const
}
export const setCardPacksTotalCount = (cardPacksTotalCount: number) => {
    return {
        type: PACKS_ACTIONS_TYPE.SET_CARD_PACKS_TOTAL_COUNT,
        cardPacksTotalCount,
    } as const
}
export const setPage = (page: number) => {
    return {
        type: PACKS_ACTIONS_TYPE.SET_PAGE,
        page,
    } as const
}
export const setPageCount = (pageCount: number) => {
    return {
        type: PACKS_ACTIONS_TYPE.SET_PAGE_COUNT,
        pageCount,
    } as const
}
export type PacksActionsType =
    | ReturnType<typeof getPacks>
    | ReturnType<typeof sortPacks>
    | ReturnType<typeof allMyPacks>
    | ReturnType<typeof searchPacks>
    | ReturnType<typeof searchMinMaxCards>
    | ReturnType<typeof setDoubleRangeValues>
    | ReturnType<typeof setCardPacksTotalCount>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>


//THUNKS
export const getPacksTC = (): AppThunk => (dispatch, getState) => {
    const params = getState().packs.params
    dispatch(setIsAppFetching(true))
    packsAPI.getPacks(params)
        .then((res) => {
            dispatch(setDoubleRangeValues(res.data.minCardsCount, res.data.maxCardsCount))
            dispatch(getPacks(res.data.cardPacks))
            dispatch(setCardPacksTotalCount(res.data.cardPacksTotalCount))
            dispatch(setPage(1));
            dispatch(setCards([])) //сброс обучения
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(() => {
            dispatch(setIsAppFetching(false))
        })
}

export const createPackTC = (params: CreatePackParams): AppThunk => dispatch => {
    packsAPI.createPack(params)
        .then((res) => {
            dispatch(getPacksTC())
            dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.NEW_PACK_SUCCESSFULLY_ADDED))
        })
        .catch((e) => {
            console.log('Error: ', {...e})
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        })
}

export const deletePackTC = (_id: string): AppThunk => dispatch => {
    packsAPI.deletePack(_id)
        .then((res) => {
            dispatch(getPacksTC())
            dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.PACK_SUCCESSFULLY_REMOVED))
        })
        .catch((e) => {
            console.log('Error: ', {...e})
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        })
}
export const editPackTC = (params: EditPackParams): AppThunk => dispatch => {
    packsAPI.editPack(params)
        .then(() => {
            dispatch(getPacksTC())
            dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.PACK_CHANGED_SUCCESSFULLY))
        })
        .catch((e) => {
            console.log('Error: ', {...e})
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        })
}

export const getPacksByPage = (pageNumber:number): AppThunk => (dispatch, getState) => {
    const {page,...params} = getState().packs.params;
    const payload = {page: pageNumber, ...params}
    dispatch(setIsAppFetching(true))
    packsAPI.getPacks(payload)
        .then((res) => {
            dispatch(setDoubleRangeValues(res.data.minCardsCount, res.data.maxCardsCount))
            dispatch(getPacks(res.data.cardPacks))
            dispatch(setCardPacksTotalCount(res.data.cardPacksTotalCount))
            dispatch(setPage(pageNumber))
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(() => {
            dispatch(setIsAppFetching(false))
        })
}

