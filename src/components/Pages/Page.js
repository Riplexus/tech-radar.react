import { useState } from 'react';
import TechRadar from '@Organisms/TechRadar';
import ListRings from '@Atoms/ListRings';
import ListSections from '@Atoms/ListSections';
import ListItems from '@Atoms/ListItems';
import { DataContext, DATA } from '@/data/context';
import './Page.css';

function Page() {
  const [data, setData] = useState(DATA);

  const setHighlightedRingId = (highlightedRingId) => {
    setData({ ...data, highlightedRingId });
  };

  const setHighlightedSectionId = (highlightedSectionId) => {
    setData({ ...data, highlightedSectionId });
  };

  const setHighlightedItemId = (highlightedItemId) => {
    setData({ ...data, highlightedItemId });
  };

  const context = {
    data,
    setData,
    setHighlightedRingId,
    setHighlightedSectionId,
    setHighlightedItemId,
  };

  return (
    <div className="Page">
      <DataContext.Provider value={context}>
        <section>
            <ListRings />
            <TechRadar />
            <ListSections />
        </section>
        <ListItems />
      </DataContext.Provider>
    </div>
  );
}

export default Page;
