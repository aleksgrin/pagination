import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

const DEFAULT_TRANSITION = "width ease .3s";

interface IProps {
  isOpen: boolean;
  transition?: string;
}

export const GrowX = ({
  isOpen,
  children,
  transition = DEFAULT_TRANSITION,
}: PropsWithChildren<IProps>) => {
  const [open, setOpen] = useState(isOpen);
  const [targetWidth, setTargetWidth] = useState<number | undefined>(0);

  useEffect(() => {
    if (isOpen) setOpen(isOpen);
    else setTargetWidth(0);
  }, [isOpen]);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setTargetWidth(node.scrollWidth);
  }, []);

  return open ? (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        transition,
        width: targetWidth,
      }}
      onTransitionEnd={() => {
        if (!isOpen) setOpen(false);
      }}
      ref={ref}
    >
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  ) : null;
};
