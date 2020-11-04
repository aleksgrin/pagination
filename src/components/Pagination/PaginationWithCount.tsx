import classnames from "classnames";
import React from "react";
import Pagination from "./Pagination";
import styles from "./pagination-with-count.scss";

interface IProps {
    onClick: (activePage: number) => void;
    totalCount: number;
    currentCount: number;
    pagesAmount: number;
    pageNumber: number;
    className?: string;
}

const PaginationWithCount = ({ onClick, className, pageNumber, totalCount, currentCount, pagesAmount }: IProps) => (
    <div className={classnames(className, styles.wrapper)}>
        <div className={styles.count}>
            Показано {currentCount} из {totalCount}
        </div>
        <Pagination onClick={onClick} pageNumber={pageNumber} pagesAmount={pagesAmount} />
    </div>
);

export default PaginationWithCount;
