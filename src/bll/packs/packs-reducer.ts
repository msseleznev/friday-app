import {CardPackType, CreatePackParams, EditPackParams, packsAPI, PacksParamsType} from "../../api/api";
import {AppThunk} from "../store";
import {Dispatch} from "redux";


export enum PACKS_ACTIONS_TYPE {
    GET_PACKS = 'GET_PACKS',
    GET_SEARCHING_PACKS = 'GET_SEARCHING_PACKS',
    SET_DOUBLE_RANGE_VALUES = 'SET_DOUBLE_RANGE_VALUES',
    GET_MIN_CARDS = 'GET_MIN_CARDS',
    GET_MAX_CARDS = 'GET_MAX_CARDS',
    SORT_PACKS = 'SORT_PACKS',
    ALL_MY_PACKS = 'ALL_MY_PACKS',
}

const initialState = {
    cardPacks: [] as CardPackType[],
    minCardsCount: 0,
    maxCardsCount: 100,
    params: {
        packName: '',
        min: 0,
        max: 100,
        sortPacks: '',
        page: 1,
        pageCount: 15,
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
        case PACKS_ACTIONS_TYPE.GET_MIN_CARDS:
            return {...state, params: {...state.params, min: action.min}}
        case PACKS_ACTIONS_TYPE.GET_MAX_CARDS:
            return {...state, params: {...state.params, max: action.max}}
        case PACKS_ACTIONS_TYPE.SORT_PACKS:
            return {...state, params: {...state.params, sortPacks: action.sortPacks}}
        case PACKS_ACTIONS_TYPE.ALL_MY_PACKS:
            return {...state, params: {...state.params, user_id: action.id}}
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
export const searchPacks = (packName: string | undefined) => {
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
    | ReturnType<typeof allMyPacks>
    | ReturnType<typeof searchPacks>
    | ReturnType<typeof searchMinCards>
    | ReturnType<typeof searchMaxCards>
    | ReturnType<typeof setDoubleRangeValues>


//THUNKS
export const getPacksTC = (): AppThunk => (dispatch: Dispatch<PacksActionsType>, getState) => {
    const params = getState().packs.params
    packsAPI.getPacks(params)
        .then((res) => {
            dispatch(setDoubleRangeValues(res.data.minCardsCount, res.data.maxCardsCount))
            dispatch(getPacks(res.data.cardPacks))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        })
}

export const createPackTC = (params: CreatePackParams): AppThunk => dispatch => {
    packsAPI.createPack(params)
        .then((res) => {
            dispatch(getPacksTC())
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
        })
        .catch((e) => {
            console.log('Error: ', {...e})
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        })
}
export const editPackTC = (params: EditPackParams): AppThunk => dispatch => {
    packsAPI.editPack(params)
        .then((res) => {
            dispatch(getPacksTC())
        })
        .catch((e) => {
            console.log('Error: ', {...e})
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        })
}

