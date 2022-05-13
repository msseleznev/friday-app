import React, {useMemo, useState} from "react";
import styleModule from './Paginator.module.css';

export type PaginatorPropsType = {
    portionSize: number
    currentPage: number | undefined
    pageSize: number | undefined
    totalItemsCount: number
    onChangePage: (pageNumber: number) => void
}

export const Paginator = React.memo(({portionSize = 12, ...props}: PaginatorPropsType) => {

    const {pageCount, pages}: { pageCount: number, pages: Array<number> } = useMemo(() => {
        let pages: Array<number> = [];
        let pageCount: number;
        if (props.pageSize) {
            pageCount = Math.ceil(props.totalItemsCount / props.pageSize)

            for (let i = 1; i <= pageCount; i++) {
                pages.push(i)
            }
        }
        return {pageCount, pages}
    }, [props.totalItemsCount, props.pageSize])


    let [portionNumber, setPortionNumber] = useState<number>(1);
    const portionCount: number = Math.ceil(pageCount / portionSize);

    const leftPortionPageNumber: number = useMemo(() => {
        return portionSize * (portionNumber - 1) + 1
    }, [portionSize,
        portionNumber])
    const rightPortionPageNumber: number = useMemo(() => {
        return portionSize * portionNumber;
    }, [portionSize, portionNumber])
    return (
        <div className={styleModule.paginator}>
            {portionNumber > 1 && <button className={styleModule.firstPage} onClick={() => {
                setPortionNumber(1)
            }}>{"First"}</button>}
            {portionNumber > 1 && <button className={styleModule.pagesToBack} onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>{"Prev"}</button>}
            {portionNumber > 1 && <span className={styleModule.threeDots}>{". . ."}</span>}

            {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => <span key={page}
                                   className={props.currentPage === page ? `${styleModule.pageNumber} ${styleModule.selectedPageNumber}` : styleModule.pageNumber}
                                   onClick={() => {
                                       props.onChangePage(page)
                                   }}>{page}</span>
                )}

            {portionNumber < portionCount && <span className={styleModule.threeDots}>{". . ."}</span>}
            {portionNumber < portionCount && <button className={styleModule.pagesToForward} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>{"Next"}</button>}
            {portionNumber < portionCount && <button className={styleModule.lastPage} onClick={() => {
                setPortionNumber(portionNumber = portionCount)
            }}>{"Last"}</button>}
        </div>
    );
});