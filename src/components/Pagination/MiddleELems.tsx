import classnames from "classnames";
import React, { CSSProperties } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import "./pagination.scss";

interface IProps {
  pageNumber: number;
  middleElems: number[];
  onClick: (elem: number) => () => void;
}

const duration = 1300;

const hide: CSSProperties = {
  opacity: 0,
  transform: "translateY(40px)",
  position: "absolute",
};

const show: CSSProperties = {
  opacity: 1,
  transform: "translateY(0)",
};

const transitionStyles = {
  entering: show,
  entered: show,
  exiting: hide,
  exited: hide,
};

const MiddleELems = ({ pageNumber, middleElems, onClick }: IProps) => (
  <TransitionGroup className={"mainPart"}>
    {middleElems.map((elem) => (
      <Transition key={elem} timeout={duration}>
        {(state) => (
          <button
            className={classnames("elem", {
              elem_active: pageNumber === elem - 1,
            })}
            onClick={onClick(elem - 1)}
            style={{
              transition: `all ease ${duration}ms`,
              ...(transitionStyles as any)[state],
            }}
          >
            {elem}
          </button>
        )}
      </Transition>
    ))}
  </TransitionGroup>
);

export default MiddleELems;
