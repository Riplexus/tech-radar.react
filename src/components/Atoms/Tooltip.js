import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.css';


function Tooltip({ children, position }) {
  const tooltipRoot = document.getElementById('TechRadar-tooltip');
  const rootRect = tooltipRoot.parentElement.getBoundingClientRect();

  const x = position.x - rootRect.x;
  const y = position.y - rootRect.y;

  const el = document.createElement('div');
  el.classList.add('Tooltip');
  el.style=[
    `--x: ${x};`, 
    `--y: ${y};`,
    `--translateX: ${x < rootRect.width/2 ? '0' : '-100'};`,
    `--translateY: ${y < rootRect.height/2 ? '0' : '-100'};`,
    `--offsetX: ${x < rootRect.width/2 ? '6' : '-6'};`,
    `--offsetY: ${y < rootRect.height/2 ? '6' : '-6'};`,
    `--rotation: ${x < (rootRect.width/2 && y < rootRect.height/2) || (x > rootRect.width/2 && y > rootRect.height/2) ? '135deg' : '45deg'};`,
  ].join(' ');

  useLayoutEffect(() => {
    if (tooltipRoot) tooltipRoot.appendChild(el);
    return () => tooltipRoot && tooltipRoot.removeChild(el);
  })

  return createPortal(
    <div>{children}</div>
  , el);
}

export default Tooltip;