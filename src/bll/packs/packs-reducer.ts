import {CardPackType, packsAPI, PacksParamsType} from "../../api/api";
import {AppThunk} from "../store";
import {Dispatch} from "redux";


export enum PACKS_ACTIONS_TYPE {
    GET_PACKS = 'GET_PACKS',
    GET_SEARCHING_PACKS = 'GET_SEARCHING_PACKS',
    GET_MIN_CARDS = 'GET_MIN_CARDS',
    GET_MAX_CARDS = 'GET_MAX_CARDS',
    SORT_PACKS = 'SORT_PACKS',
}

const initialState = {
    cardPacks: [] as CardPackType[],
    params: {
        packName: '',
        min: 0,
        max: 100,
        sortPacks: '',
        page: 1,
        pageCount: 20,
    } as PacksParamsType,
}
type InitialStateType = typeof initialState


export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case PACKS_ACTIONS_TYPE.GET_PACKS:
            return {...state, cardPacks: action.cardPacks}
        case PACKS_ACTIONS_TYPE.GET_SEARCHING_PACKS:
            return {...state, params: {...state.params, packName: action.packName}}
        case PACKS_ACTIONS_TYPE.GET_MIN_CARDS:
            return {...state, params: {...state.params, min: action.min}}
        case PACKS_ACTIONS_TYPE.GET_MAX_CARDS:
            return {...state, params: {...state.params, max: action.max}}
        case PACKS_ACTIONS_TYPE.SORT_PACKS:
            return {...state, params: {...state.params, sortPacks: action.sortPacks}}
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
export const searchPacks = (packName: string| undefined) => {
    return {
        type: PACKS_ACTIONS_TYPE.GET_SEARCHING_PACKS,
        packName,
    } as const
}
export const searchMinCards = (min: number) => {
    return {
        type: PACKS_ACTIONS_TYPE.GET_MIN_CARDS,
        min
    } as const
}
export const searchMaxCards = (max: number) => {
    return {
        type: PACKS_ACTIONS_TYPE.GET_MAX_CARDS,
        max
    } as const
}
export const sortPacks = (sortPacks: string) => {
    return {
        type: PACKS_ACTIONS_TYPE.SORT_PACKS,
        sortPacks,
    } as const
}
export type PacksActionsType =
    | ReturnType<typeof getPacks>
    | ReturnType<typeof sortPacks>
    | ReturnType<typeof searchPacks>
    | ReturnType<typeof searchMinCards>
    | ReturnType<typeof searchMaxCards>


//THUNKS
export const getPacksTC = (params: PacksParamsType): AppThunk => (dispatch: Dispatch<PacksActionsType>) => {
    packsAPI.getPacks(params)
        .then((res) => {
            dispatch(getPacks(res.data.cardPacks))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        })
}
