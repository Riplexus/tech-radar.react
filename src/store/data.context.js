import { createContext } from "react";
import ITEMS from "./items";
import RINGS from "./rings";
import SECTIONS from "./sections";

export const DATA = {
  items: ITEMS,
  itemSize: 8,
  rings: RINGS,
  sections: SECTIONS,
  tooltipContent: null,
  tooltipPosition: null,
  highlightedItemId: null,
  highlightedRingId: null,
  highlightedSectionId: null,
};

export const Context = createContext({
  data: DATA,
  setData: () => {},
  setHighlightedItemId: () => {},
  setHighlightedRindId: () => {},
  setHighlightedSectionId: () => {},
});

Context.displayName = "DataContext";
