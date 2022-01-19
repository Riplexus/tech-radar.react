import {useContext} from 'react';
import { DataContext } from '@/store/store';

function ListSections() {
  const { data, setHighlightedSectionId } = useContext(DataContext);

    return (
        <ul onMouseLeave={() => setHighlightedSectionId(null)}>
          {data.sections.map(section =>
            <li key={section.id} onMouseOver={() => setHighlightedSectionId(section.id)}>
              <p>{section.name}</p>
              <small>{section.description}</small>
            </li>
          )}
        </ul>
    );
}

export default ListSections;