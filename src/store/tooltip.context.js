import { createContext } from "react";

export const TOOLTIP = {
  position: null,
  content: null,
  itemId: null,
};

export const Context = createContext({
  tooltip: TOOLTIP,
  setTooltip: () => {},
  clearTooltip: () => {},
});

Context.displayName = "TooltipContext";
