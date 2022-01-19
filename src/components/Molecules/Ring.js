import { useContext } from 'react';
import { DataContext } from '@/data/context';
import RingCircle from '@Atoms/RingCircle';
import RingSection from '@Atoms/RingSection';
import './Ring.css';

function Ring({ 
  position = 0,
  children,
  dimensions,
  ring
}) {
  const { data } = useContext(DataContext);

  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const maxRadius = Math.min(width, height) / 2;
  const radius = maxRadius / data.rings.length * (data.rings.length - position);

  let colors = JSON.parse(JSON.stringify(data.colors[position]));
  if (data.highlightedSectionId) {
    const index = data.sections.findIndex(({id}) => id === data.highlightedSectionId);
    colors[index] = data.highlightColors[position][index];
  }
  if (data.highlightedRingId === ring.id) {
    colors = data.highlightColors[position];
  }

  return (
    <div className="Ring" style={{
      '--radius': radius,
    }}>
      {children.length <= 1 && RingCircle({
        color: colors[0],
        content: children[0],
        width: 360,
        position,
       })}
      {children.length > 1 && children.map((_, i) => RingSection({
        color: colors[i%colors.length],
        content: children[i],
        width: 360 / children.length,
        rotation: 360 / children.length * i,
        position,
        key: i,
       })
      )}
    </div>
  );
}

export default Ring;
