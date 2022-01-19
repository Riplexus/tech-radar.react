import {useContext} from 'react';
import { DataContext } from '@/data/context';

function ListItems() {
  const { data, setData } = useContext(DataContext);

    return (
      <section className="ItemList" onMouseLeave={() => {
        setData({ 
          ...data,
          highlightedSectionId: null,
          highlightedItemId: null,
          highlightedRingId: null,
        });
      }}>
        {data.sections.map(section =>
          <div key={section.id}>
            <h3>{section.name}</h3>
            <ul>
              {data.items.filter(item => item.sectionId === section.id).sort((a, b) => a.ringId - b.ringId).map(item =>
                <li key={item.id} onMouseOver={() => {
                  setData({ 
                    ...data,
                    highlightedSectionId: item.sectionId,
                    highlightedItemId: item.id,
                    highlightedRingId: item.ringId,
                   });
                }}>
                  <small>{item.name} ({data.rings.find(ring => ring.id === item.ringId).name})</small>
                </li>
              )}
            </ul>
          </div>
        )}
      </section>
    );
}

export default ListItems;