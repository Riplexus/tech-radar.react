import TechRadar from '@Organisms/TechRadar';
import { useState } from 'react';
import './Page.css';
import SECTIONS from '@/data/sections';
import RINGS from '@/data/rings';
import ITEMS from '@/data/items';

const COLORS = [
  ['#E4CFE3', '#CDD9E3', '#CDE2CC', '#E4E2CC', '#E4D4CC', '#CDE2E3'], // '#E1DFE0',
  ['#D2BFD3', '#BBC8D3', '#BBD2BC', '#D2D2BC', '#D2C4BC', '#BBD2D3'], // '#CECDCF',
  ['#C2AFC3', '#ABB8C3', '#ABC1AC', '#C2C1AC', '#C2B3AC', '#ABC1C3'], // '#BCBBBD',
  ['#B19EB4', '#9AA8B4', '#9AB19C', '#B1B19C', '#B1A39C', '#9AB1B4'], // '#A9A9AC',
  ['#A08EA4', '#8997A4', '#89A08D', '#A0A08D', '#9C938D', '#89A0A4'], // '#97979B',
  ['#8F7E95', '#788895', '#78917D', '#8F917D', '#8F837D', '#789195'], // '#84868A',
];

const HIGHLIGHT_COLORS = [
  ['#ecddeb', '#dce4eb', '#dceadb', '#eceadb', '#ece0db', '#dceaeb'], // '#E1DFE0',
  ['#dfd2e0', '#cfd8e0', '#cfdfd0', '#dfdfd0', '#dfd5d0', '#cfdfe0'], // '#CECDCF',
  ['#d4c7d5', '#c4cdd4', '#c4d3c4', '#d4d3c4', '#d4c9c4', '#c4d3d4'], // '#BCBBBD',
  ['#c8bbca', '#b8c2ca', '#b8c8b9', '#c8c8b9', '#c8beb9', '#b8c8ca'], // '#A9A9AC',
  ['#bcafbf', '#acb6bf', '#acbcaf', '#bcbcaf', '#b9b3af', '#acbcbf'], // '#97979B',
  ['#b0a4b4', '#a0abb4', '#a0b2a3', '#b0b2a4', '#b0a8a3', '#a0b2b4'], // '#84868A',
];

function Page() {
  const [highlightedRingId, setHighlightedRingId] = useState();
  const [highlightedSectionId, setHighlightedSectionId] = useState();
  const [highlightedItemId, setHighlightedItemId] = useState();

  return (
    <div className="Page">
      <section>
        <ul onMouseLeave={() => setHighlightedRingId(null)}>
          {RINGS.map(ring =>
            <li key={ring.id} onMouseOver={() => setHighlightedRingId(ring.id)}>
              <p>{ring.name}</p>
              <small>{ring.description}</small>
            </li>
          )}
        </ul>

        <TechRadar
          sections={SECTIONS}
          rings={RINGS}
          items={ITEMS}
          colors={COLORS}
          highlightColors={HIGHLIGHT_COLORS}
          highlightedRingId={highlightedRingId}
          highlightedSectionId={highlightedSectionId}
          highlightedItemId={highlightedItemId} />

        <ul onMouseLeave={() => setHighlightedSectionId(null)}>
          {SECTIONS.map(section =>
            <li key={section.id} onMouseOver={() => setHighlightedSectionId(section.id)}>
              <p>{section.name}</p>
              <small>{section.description}</small>
            </li>
          )}
        </ul>
      </section>

      <section className="ItemList" onMouseLeave={() => {
        setHighlightedSectionId(null);
        setHighlightedItemId(null);
      }}>
        {SECTIONS.map(section =>
          <div>
            <h3>{section.name}</h3>
            <ul>
              {ITEMS.filter(item => item.sectionId === section.id).sort((a, b) => a.ringId - b.ringId).map(item =>
                <li key={item.id} onMouseOver={() => {
                  setHighlightedSectionId(item.sectionId);
                  setHighlightedItemId(item.id);
                }}>
                  <small>{item.name} ({RINGS.find(ring => ring.id === item.ringId).name})</small>
                </li>
              )}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default Page;
