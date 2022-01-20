import { createContext } from "react";
import ITEMS from "./items";
import RINGS from "./rings";
import SECTIONS from "./sections";

export const DATA = {
  items: ITEMS,
  rings: RINGS,
  sections: SECTIONS,
  highlightedItemId: null,
  highlightedRingId: null,
  highlightedSectionId: null,
};

export const DataContext = createContext({
  data: DATA,
  setData: () => {},
  setHighlightedItemId: () => {},
  setHighlightedRindId: () => {},
  setHighlightedSectionId: () => {},
});
