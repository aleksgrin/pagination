import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

const DEFAULT_TRANSITION = "height ease 1s";

interface IProps {
  isOpen: boolean;
  initialGrow?: boolean;
  transition?: string;
  className?: string;
}

export const GrowY = ({
  isOpen,
  children,
  className,
  initialGrow = true,
  transition = DEFAULT_TRANSITION,
}: PropsWithChildren<IProps>) => {
  const [open, setOpen] = useState(isOpen);
  const [targetHeigth, setTargetHeight] = useState<number | undefined>(
    initialGrow ? 0 : undefined
  );

  useEffect(() => {
    if (isOpen) setOpen(isOpen);
    else setTargetHeight(0);
  }, [isOpen]);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setTargetHeight(node.scrollHeight);
  }, []);

  return open ? (
    <div
      style={{
        overflow: "hidden",
        transition,
        height: targetHeigth,
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
