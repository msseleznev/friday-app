import React from 'react';
import style from './NothingFound.module.scss';


export const NothingFound = ({value}: { value: string | undefined }) => {
    return (
        <tr className={style.block}>
            <td>
                По запросу <span>&nbsp;{value}&nbsp;</span> ничего не найдено
            </td>
        </tr>
    )
}