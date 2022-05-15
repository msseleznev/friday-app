import React, {useEffect, useState} from 'react';
import {searchMinMaxCards} from "../../../bll/packs/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {SuperDoubleRange} from "../superDoubleRange/SuperDoubleRange";

export const DoubleRangeCardsPacks = () => {
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)


    const dispatch = useAppDispatch()

    const [value, setValue] = useState<[number, number]>([0, 0])

    useEffect(() => {
        setValue([minCardsCount, maxCardsCount])
    }, [maxCardsCount])

    const onMouseUpHandler = () => {
        dispatch(searchMinMaxCards(value[0], value[1]))
    }

    return (
        <div>
            <SuperDoubleRange
                value={value}
                onChangeRange={setValue}
                min={minCardsCount}
                max={maxCardsCount}
                onMouseUpRange={onMouseUpHandler}
            />
        </div>
    );
};
