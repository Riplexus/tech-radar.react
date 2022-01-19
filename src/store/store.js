import { createContext } from "react";
import COLORS from "./colors";
import HIGHLIGHT_COLORS from "./highlightColors";
import ITEMS from "./items";
import RINGS from "./rings";
import SECTIONS from "./sections";

export const DATA = {
    colors: COLORS,
    highlightColors: HIGHLIGHT_COLORS,
    items: ITEMS,
    rings: RINGS,
    sections: SECTIONS,
    highlightedRingId: null,
    highlightedSectionId: null,
    highlightedItemId: null,
}

export const DataContext = createContext({
    data: DATA,
    setData: () => {},
    setHighlightedRindId: () => {},
    setHighlightedSectionId: () => {},
    setHighlightedItemId: () => {},
});