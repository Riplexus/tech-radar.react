import { useCallback, useState } from 'react';
import Tooltip from '@Atoms/Tooltip';
import './Item.css';

function Item({ children, updatePosition, highlighted, opened }) {
  const [position, setPosition] = useState();

  const ref = useCallback(node => {
    if (node === null) return;
    const rect = node.getBoundingClientRect();
    const position = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };
    updatePosition(position);
    setPosition(position);
  }, [updatePosition]);

  const classes = ['Item'];
  if (highlighted) classes.push('highlighted');
  if (opened) classes.push('opened');

  return (
    <div ref={ref} className={classes.join(' ')}>
      <span>•</span>
      {opened && (
        <Tooltip position={position}>
          {children}
        </Tooltip>
      )}
    </div>
  );
}

export default Item;