import React from 'react';
import {searchMaxCards, searchMinCards} from "../../../bll/packs/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {SuperDoubleRange} from "../superDoubleRange/SuperDoubleRange";

export const DoubleRangeCardsPacks = () => {
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const dispatch = useAppDispatch()
    const doubleRangeValueHandler = (minValue: number, maxValue: number) => {
        dispatch(searchMinCards(minValue))
        dispatch(searchMaxCards(maxValue))
    }

    return (
        <div>
            <SuperDoubleRange
                min={minCardsCount}
                max={maxCardsCount}
                onMouseLeaveHandler={doubleRangeValueHandler}
            />
        </div>
    );
};
