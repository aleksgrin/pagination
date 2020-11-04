import classnames from "classnames";
import React, { useMemo, useCallback } from "react";
import MiddleELems from "./MiddleELems";
import Arrow from "@assets/icons/ArrowLeft";
import styles from "./pagination.scss";

const VISIBLE_SIDE_ELEMS = 1;
const VISIBLE_MIDDLE_ELEMS = 3;
const TOTAL_VISIBLE_ELEMS = VISIBLE_SIDE_ELEMS * 2 + VISIBLE_MIDDLE_ELEMS;

const FIRST_ELEM_WITH_OFFSET = VISIBLE_SIDE_ELEMS + Math.ceil(VISIBLE_MIDDLE_ELEMS / 2);

const range = (from: number, to: number) => Array.from({ length: to - from }).map((_, ind) => from + ind);

const getMiddleElems = (pageNumber: number, pagesAmount: number) => {
    if (pagesAmount < TOTAL_VISIBLE_ELEMS) return range(VISIBLE_SIDE_ELEMS + 1, pagesAmount);
    if (pageNumber < FIRST_ELEM_WITH_OFFSET) return range(VISIBLE_SIDE_ELEMS + 1, VISIBLE_SIDE_ELEMS + VISIBLE_MIDDLE_ELEMS + 1);
    if (pageNumber >= pagesAmount - FIRST_ELEM_WITH_OFFSET) return range(pagesAmount - VISIBLE_MIDDLE_ELEMS, pagesAmount);
    return range(pageNumber, pageNumber + VISIBLE_MIDDLE_ELEMS);
};

interface IProps {
    onClick: (pageNumber: number) => void;
    pagesAmount?: number;
    pageNumber: number;
    className?: string;
}

const Pagination = ({ onClick, className, pageNumber, pagesAmount = 1 }: IProps) => {
    const onElemClick = useCallback((nextPageNumber: number) => () => onClick(nextPageNumber), []);
    const middleElems = useMemo(() => getMiddleElems(pageNumber, pagesAmount), [pageNumber, pagesAmount]);

    const isVisibleLeftRestElem = pagesAmount > TOTAL_VISIBLE_ELEMS && pageNumber >= FIRST_ELEM_WITH_OFFSET;
    const isVisibleRightRestElem = pagesAmount > TOTAL_VISIBLE_ELEMS && pageNumber < pagesAmount - FIRST_ELEM_WITH_OFFSET;
    return (
        <div className={classnames(className, styles.wrapper)}>
            <div
                className={classnames(styles.arrow, styles.arrow_left, { [`${styles.arrow_disable}`]: pageNumber === 0 })}
                onClick={onElemClick(pageNumber - 1)}
            >
                <Arrow />
            </div>
            <button className={classnames(styles.elem, { [`${styles.elem_active}`]: pageNumber === 0 })} onClick={onElemClick(0)}>
                1
            </button>
            <div
                className={classnames(styles.rest, {
                    [`${styles.rest_visible}`]: isVisibleLeftRestElem,
                })}
            >
                <div
                    className={classnames(styles.restInner, {
                        [`${styles.restInner_visible}`]: isVisibleLeftRestElem,
                    })}
                >
                    ...
                </div>
            </div>
            <MiddleELems onClick={onElemClick} pageNumber={pageNumber} middleElems={middleElems} />
            <div
                className={classnames(styles.rest, {
                    [`${styles.rest_visible}`]: isVisibleRightRestElem,
                })}
            >
                <div
                    className={classnames(styles.restInner, {
                        [`${styles.restInner_visible}`]: isVisibleRightRestElem,
                    })}
                >
                    ...
                </div>
            </div>
            {pagesAmount > VISIBLE_SIDE_ELEMS && (
                <button
                    className={classnames(styles.elem, { [`${styles.elem_active}`]: pageNumber === pagesAmount - 1 })}
                    onClick={onElemClick(pagesAmount - 1)}
                >
                    {pagesAmount}
                </button>
            )}
            <div
                className={classnames(styles.arrow, styles.arrow_right, { [`${styles.arrow_disable}`]: pageNumber === pagesAmount - 1 })}
                onClick={onElemClick(pageNumber + 1)}
            >
                <Arrow />
            </div>
        </div>
    );
};

export default Pagination;
