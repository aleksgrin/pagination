import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IProps {
  isOpen: boolean;
  transitionDuration?: string;
  initialGrow?: boolean;
  transitionTimingFunction?: string;
  className?: string;
  type?: "x" | "y";
}

export const Grow = ({
  isOpen,
  children,
  className,
  initialGrow = true,
  type = "y",
  transitionDuration = "0.3s",
  transitionTimingFunction = "ease",
}: PropsWithChildren<IProps>) => {
  const [open, setOpen] = useState(isOpen);
  const [targetValue, setTargetValue] = useState<number | undefined>(
    initialGrow ? 0 : undefined
  );

  useEffect(() => {
    if (isOpen) setOpen(isOpen);
    else setTargetValue(0);
  }, [isOpen]);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      const value = type === "y" ? node.scrollHeight : node.scrollWidth;
      setTargetValue(value);
    },
    [type]
  );

  return open ? (
    <div
      style={{
        overflow: "hidden",
        transitionProperty: type === "y" ? "height" : "width",
        transitionDuration,
        transitionTimingFunction,
        [type === "y" ? "height" : "width"]: targetValue,
      }}
      className={className}
      onTransitionEnd={() => {
        if (!isOpen) setOpen(false);
      }}
      ref={ref}
    >
      {children}
    </div>
  ) : null;
};
