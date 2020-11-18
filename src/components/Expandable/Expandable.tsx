import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";

type ExpandProperty = "width" | "height";
type PropertyAccordance = Record<ExpandProperty, "scrollWidth" | "scrollHeight">;

const propertyAccordance: PropertyAccordance = {
    width: "scrollWidth",
    height: "scrollHeight",
};

interface IProps {
    expanded: boolean;
    transitionDuration?: string;
    initialExpand?: boolean;
    transitionTimingFunction?: string;
    className?: string;
    growProperty?: ExpandProperty;
}

const Expandable = ({
    expanded,
    children,
    className,
    initialExpand = false,
    growProperty = "height",
    transitionDuration = "0.3s",
    transitionTimingFunction = "ease",
}: PropsWithChildren<IProps>) => {
    const [visible, setVisible] = useState(expanded);
    const [targetSize, setTargetSize] = useState<number | undefined>(initialExpand ? 0 : undefined);

    useEffect(() => {
        if (expanded) {
            setVisible(true);
        } else {
            setTargetSize(0);
        }
    }, [expanded]);

    const ref = useCallback(
        (node: HTMLElement | null) => {
            if (!node) return;
            setTargetSize(node[propertyAccordance[growProperty]]);
        },
        [growProperty],
    );

    return visible ? (
        <div
            style={{
                overflow: "hidden",
                transitionProperty: growProperty,
                [growProperty]: targetSize,
                transitionTimingFunction,
                transitionDuration,
            }}
            className={className}
            onTransitionEnd={() => {
                if (!expanded) setVisible(false);
            }}
            ref={ref}
        >
            {children}
        </div>
    ) : null;
};

export default Expandable;
