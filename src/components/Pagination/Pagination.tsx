import classnames from "classnames";
import React, { useMemo, useCallback } from "react";
import { Grow } from "../Grow/Grow";
import "./pagination.scss";

const ArrowLeft = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 19L8 12L15 5"
      stroke="#0B43DA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VISIBLE_SIDE_ELEMS = 1;
const VISIBLE_MIDDLE_ELEMS = 3;
const TOTAL_VISIBLE_ELEMS = VISIBLE_SIDE_ELEMS * 2 + VISIBLE_MIDDLE_ELEMS;

const FIRST_ELEM_WITH_OFFSET =
  VISIBLE_SIDE_ELEMS + Math.ceil(VISIBLE_MIDDLE_ELEMS / 2);

const range = (from: number, to: number) =>
  Array.from({ length: to - from }).map((_, ind) => from + ind);

const getMiddleElems = (pageNumber: number, pagesAmount: number) => {
  if (pagesAmount < TOTAL_VISIBLE_ELEMS)
    return range(VISIBLE_SIDE_ELEMS + 1, pagesAmount);
  if (pageNumber < FIRST_ELEM_WITH_OFFSET)
    return range(
      VISIBLE_SIDE_ELEMS + 1,
      VISIBLE_SIDE_ELEMS + VISIBLE_MIDDLE_ELEMS + 1
    );
  if (pageNumber >= pagesAmount - FIRST_ELEM_WITH_OFFSET)
    return range(pagesAmount - VISIBLE_MIDDLE_ELEMS, pagesAmount);
  return range(pageNumber, pageNumber + VISIBLE_MIDDLE_ELEMS);
};

interface IProps {
  onClick: (pageNumber: number) => void;
  pagesAmount?: number;
  pageNumber: number;
  className?: string;
}

const Pagination = ({
  onClick,
  className,
  pageNumber,
  pagesAmount = 1,
}: IProps) => {
  const onElemClick = useCallback(
    (nextPageNumber: number) => () => onClick(nextPageNumber),
    [onClick]
  );
  const middleElems = useMemo(() => getMiddleElems(pageNumber, pagesAmount), [
    pageNumber,
    pagesAmount,
  ]);

  const isVisibleLeftRestElem =
    pagesAmount > TOTAL_VISIBLE_ELEMS && pageNumber >= FIRST_ELEM_WITH_OFFSET;
  const isVisibleRightRestElem =
    pagesAmount > TOTAL_VISIBLE_ELEMS &&
    pageNumber < pagesAmount - FIRST_ELEM_WITH_OFFSET;
  return (
    <div className={classnames(className, "wrapper")}>
      <div
        className={classnames("arrow", "arrow_left", {
          arrow_disable: pageNumber === 0,
        })}
        onClick={onElemClick(pageNumber - 1)}
      >
        <ArrowLeft />
      </div>
      <button
        className={classnames("elem", { elem_active: pageNumber === 0 })}
        onClick={onElemClick(0)}
      >
        1
      </button>
      <div
        className={classnames("rest", {
          rest_visible: isVisibleLeftRestElem,
        })}
      >
        <div
          className={classnames("restInner", {
            restInner_visible: isVisibleLeftRestElem,
          })}
        >
          ...
        </div>
      </div>
      {range(2, pagesAmount).map((elem) => (
        <Grow key={elem} isOpen={middleElems.includes(elem)} type="x">
          <button
            className={classnames("elem", {
              elem_active: pageNumber === elem - 1,
            })}
            onClick={onElemClick(elem - 1)}
          >
            {elem}
          </button>
        </Grow>
      ))}
      <div
        className={classnames("rest", {
          rest_visible: isVisibleRightRestElem,
        })}
      >
        <div
          className={classnames("restInner", {
            restInner_visible: isVisibleRightRestElem,
          })}
        >
          ...
        </div>
      </div>
      {pagesAmount > VISIBLE_SIDE_ELEMS && (
        <button
          className={classnames("elem", {
            elem_active: pageNumber === pagesAmount - 1,
          })}
          onClick={onElemClick(pagesAmount - 1)}
        >
          {pagesAmount}
        </button>
      )}
      <div
        className={classnames("arrow", "arrow_right", {
          arrow_disable: pageNumber === pagesAmount - 1,
        })}
        onClick={onElemClick(pageNumber + 1)}
      >
        <ArrowLeft />
      </div>
    </div>
  );
};

export default Pagination;
