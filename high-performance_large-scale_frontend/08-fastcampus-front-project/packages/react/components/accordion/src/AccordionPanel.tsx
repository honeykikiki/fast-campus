import * as React from "react";
import { AccordionPanelProps } from "./types";
import { clsx } from "clsx";
import { accordionPanelStyle, panelHeight } from "./styles.css";
import { useAccordionContext } from "./AccordionContext";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useEffect, useRef, useState } from "react";

const AccordionPanel = (
  props: AccordionPanelProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { itemName, children, className, style, ...rest } = props;
  const innerRef = useRef<HTMLDivElement>(null);

  const { activeItems } = useAccordionContext();
  const isActive = activeItems.includes(itemName ?? "");

  const [currentPanelHeight, setCurrentPanelHeight] = useState<string>();
  useEffect(() => {
    if (!innerRef.current) return;

    setCurrentPanelHeight(
      isActive ? `${innerRef.current.clientHeight}px` : "0",
    );
  }, [isActive]);

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx([accordionPanelStyle, className])}
      data-action-item={isActive}
      style={{
        ...assignInlineVars({
          [panelHeight]:
            currentPanelHeight ?? `${innerRef.current?.clientHeight}px`,
        }),
        ...style,
      }}
    >
      <div ref={innerRef} data-name="panel-inner">
        {children}
      </div>
    </div>
  );
};

const _AccordionPanel = React.forwardRef(AccordionPanel);
export { _AccordionPanel as AccordionPanel };
