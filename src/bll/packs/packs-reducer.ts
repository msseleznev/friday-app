import {CardPackType, packsAPI, PacksParamsType} from "../../api/api";
import {AppThunk} from "../store";
import {Dispatch} from "redux";


export enum PACKS_ACTIONS_TYPE {
    GET_PACKS = 'GET_PACKS',
    SORT_PACKS = 'SORT_PACKS',

}

const initialState = {
    cardPacks: [] as CardPackType[],
    params: {
        packName: '',
        min: 10,
        max: 100,
        sortPacks: '',
        page: 1,
        pageCount: 10,
    } as PacksParamsType,
}
type InitialStateType = typeof initialState


export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case PACKS_ACTIONS_TYPE.GET_PACKS:
            return {...state, cardPacks: action.cardPacks}
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
export const sortPacks = (sortPacks: string) => {
    return {
        type: PACKS_ACTIONS_TYPE.SORT_PACKS,
        sortPacks,
    } as const
}
export type PacksActionsType =
    | ReturnType<typeof getPacks>
    | ReturnType<typeof sortPacks>


//THUNKS
export const getPacksTC = (params: PacksParamsType): AppThunk => (dispatch: Dispatch<PacksActionsType>) => {
    packsAPI.getPacks(params)
        .then((res) => {
            dispatch(getPacks(res.data.cardPacks))
        })
        .catch((e) => {
            console.log('Error: ', {...e})
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        })
}
