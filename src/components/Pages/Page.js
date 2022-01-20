import { useState } from "react";
import TechRadar from "@Organisms/TechRadar";
import ListRings from "@Atoms/ListRings";
import ListSections from "@Atoms/ListSections";
import ListItems from "@Atoms/ListItems";
import { Context as DataContext, DATA } from "@/store/data.context";
import { Context as TooltipContext, TOOLTIP } from "@/store/tooltip.context";
import "./Page.css";

function Page() {
  const [data, setData] = useState(DATA);
  const [tooltip, setTooltip] = useState(TOOLTIP);

  const setHighlightedRingId = (highlightedRingId) => {
    setData({ ...data, highlightedRingId });
  };

  const setHighlightedSectionId = (highlightedSectionId) => {
    setData({ ...data, highlightedSectionId });
  };

  const setHighlightedItemId = (highlightedItemId) => {
    setData({ ...data, highlightedItemId });
  };

  const dataContext = {
    data,
    setData,
    setHighlightedRingId,
    setHighlightedSectionId,
    setHighlightedItemId,
  };

  const tooltipContext = {
    tooltip,
    setTooltip,
    clearTooltip: () => setTooltip(TOOLTIP),
  };

  return (
    <div className="tr-page">
      <DataContext.Provider value={dataContext}>
        <TooltipContext.Provider value={tooltipContext}>
          <section>
            <ListRings />
            <TechRadar />
            <ListSections />
          </section>
          <ListItems />
        </TooltipContext.Provider>
      </DataContext.Provider>
    </div>
  );
}

export default Page;
