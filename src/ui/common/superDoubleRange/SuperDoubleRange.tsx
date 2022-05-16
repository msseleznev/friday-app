import React, {ChangeEvent, MouseEventHandler, useState} from 'react'
import s from './SuperDoubleRange.module.css'
import styled from "styled-components";

//поправить расчет минимальной дистанции
// добавить отрисовку value над инпутом при движении


type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    onMouseUpRange?: () => void
    value?: [number, number]
    distance?: number  // минимальную дистанция (по умолчанию 10%)
    max?: number
    min?: number
    step?: number
}
let StyledProgress = styled.div<{ progressLeft: number, progressRight: number }>
    ` height: 8px;
      left: ${props => props.progressLeft}%;
      right: ${props => props.progressRight}%;
      position: absolute;
      border-radius: 8px;
      background: rgb(140, 196, 255);;`


export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange,
        value,
        max,
        min,
        distance,
        step,
        onMouseUpRange,
    }
) => {

    const endValue = max ? max : 80
    const startValue = min ? min : 0
    const stepRange = step ? step : 1
    const range = distance ? distance : (endValue - startValue) * 0.1

    //для демонстрации отрисовки
    const [defaultValue, setDefaultValue] = useState([0, 80]);

    const minValue = value ? value[0] : defaultValue[0];
    const maxValue = value ? value[1] : defaultValue[1];


    //изменение заливки между инпутами
    const progressLeft = Math.ceil(((minValue - startValue) / (endValue - startValue)) * 98);
    const progressRight = Math.ceil(98 - ((maxValue - startValue) / (endValue - startValue)) * 98);


    const onChangeCallback = (e: ChangeEvent<HTMLInputElement> & MouseEventHandler<HTMLInputElement>) => {
        let valueInput = +e.currentTarget.value
        if (e.currentTarget.dataset.input) {
            const trigger = e.currentTarget.dataset.input;
            if (trigger === 'min') {
                if (valueInput + range < maxValue)
                    onChangeRange ? onChangeRange([valueInput, maxValue])
                        : setDefaultValue([valueInput, defaultValue[1]])
            } else {
                if (minValue + range < valueInput)
                    onChangeRange ? onChangeRange([minValue, valueInput])
                        : setDefaultValue([defaultValue[0], valueInput])
            }
        }
    }

    return (
        <div className={s.range}>
            <div className={s.slider}>
                <StyledProgress progressLeft={progressLeft} progressRight={progressRight}/>
            </div>
            <div className={s.range_input}>
                <input type="range"
                       data-input='min'
                       min={startValue}
                       max={endValue}
                       step={stepRange}
                       className={s.range_min}
                       value={minValue}
                       onMouseUp={onMouseUpRange}
                       onChange={onChangeCallback}
                />
                <div className={s.minValueCount}>{minValue}</div>
                <input type="range"
                       data-input='max'
                       min={startValue}
                       max={endValue}
                       step={stepRange}
                       className={s.range_max}
                       value={maxValue}
                       onMouseUp={onMouseUpRange}
                       onChange={onChangeCallback}/>
                <div className={s.maxValueCount}>{maxValue}</div>
            </div>
        </div>
    )
}


