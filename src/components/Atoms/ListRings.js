import {useContext} from 'react';
import { DataContext } from '@/data/context';

function ListRings() {
  const { data, setHighlightedRingId } = useContext(DataContext);

    return (
        <ul onMouseLeave={() => setHighlightedRingId(null)}>
        {data.rings.map(ring =>
          <li key={ring.id} onMouseOver={() => setHighlightedRingId(ring.id)}>
            <p>{ring.name}</p>
            <small>{ring.description}</small>
          </li>
        )}
      </ul>
    );
}

export default ListRings;