import { createRef, forwardRef, useState } from "react";
import Item from "@Molecules/Item";
import Ring from "@Molecules/Ring";
import withDimensions from "@/hocs/withDimensions";
import './TechRadar.css';



const TechRadar = forwardRef(function TechRadar({ dimensions, sections, rings, items, colors, highlightColors, highlightedRingId, highlightedSectionId = null }, ref) {
  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const cssVariables = {
    '--width': `${width}px`,
    '--height': `${height}px`,
  };
  const maxRadius = Math.min(width, height) / 2;
  const ringRadii = rings.map((_, i) => maxRadius / rings.length * (rings.length - i));

  /*
   * Mouse interactions
   */

  const itemPositions = [];
  const updateItemPosition = id => position => {
    itemPositions.push({
      x: position.x,
      y: position.y,
      id,
    });
    itemPositions.sort((a, b) => a.x - b.x);
  };

  const [highlightedItemId, setHighlightedItemId] = useState();
  const [openedItemId, setOpenedItemId] = useState();
  
  const onMouseMove = ({clientX, clientY}) => {
    if (openedItemId) return;
    let minimumDistance = Infinity;
    let closestItemId = null;
    itemPositions.forEach(({x, y, id}) => {
      const distance = Math.sqrt((x-clientX)**2 + (y-clientY)**2);
      if (distance < minimumDistance) {
        minimumDistance = distance;
        closestItemId = id;
      }
    });
    setHighlightedItemId(closestItemId);
  };

  const onMouseLeave = () => setHighlightedItemId(null);

  const tooltipRef = createRef();
  const onMouseUp = (e) => {
    if (e.target === tooltipRef.current || tooltipRef.current.contains(e.target)) return;
    if (e.button !== 0) return;
    setOpenedItemId(openedItemId ? null : highlightedItemId)
  };

  /*
   * Color handling
   */

  let overrideColors = null;
  if (highlightedSectionId !== null) {
    const index = sections.findIndex(({id}) => id === highlightedSectionId);
    overrideColors = colors.map((ringColors) => {
      const result = [...ringColors];
      result[index] = highlightColors[0];
      return result;
    });
  }
  const getColorPalette = (ringId) => {
    if (overrideColors) return overrideColors;
    if (highlightedRingId === ringId) return highlightColors;
    return colors;
  }

  /*
   * Template
   */

  return (
    <div ref={ref} className="TechRadar" style={cssVariables}>
      <div 
        className="TechRadar-viewport"
        onMouseMove={onMouseMove} 
        onMouseLeave={onMouseLeave} 
        onMouseUp={onMouseUp}>
        {[...rings].reverse().map((ring, i) => 
          <Ring
            key={ring.id}
            position={i}
            radius={ringRadii[i]}
            colors={getColorPalette(ring.id)[i%getColorPalette(ring.id).length]}
            contents={sections.map(section => items.filter(_ => _.ringId === ring.id && _.sectionId === section.id).map(item => 
              <Item 
                key={item.id}
                highlighted={highlightedItemId === item.id}
                opened={openedItemId === item.id}
                updatePosition={updateItemPosition(item.id)}>
                <h3>{item.name}</h3>
                <span>{item.description}</span>
              </Item>
            ))}>
          </Ring>
        )}
      </div>
      <div ref={tooltipRef} id="TechRadar-tooltip"/>
    </div>
  );
});

TechRadar.displayName = 'TechRadar';

export default withDimensions(TechRadar);