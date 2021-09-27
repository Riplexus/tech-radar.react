import {createRef, forwardRef, useEffect, useState} from "react";
import Item from "@Molecules/Item";
import Ring from "@Molecules/Ring";
import withDimensions from "@/hocs/withDimensions";
import './TechRadar.css';



const TechRadar = forwardRef(function TechRadar({ dimensions, sections, rings, items, colors, highlightColors, highlightedRingId, highlightedSectionId = null, highlightedItemId }, ref) {
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

  const [openedItemId, setOpenedItemId] = useState();

  const onMouseMove = ({clientX, clientY, target}) => {
    if (target === tooltipRef.current || tooltipRef.current.contains(target)) return;
    let minimumDistance = Infinity;
    let closestItemId = null;
    itemPositions.forEach(({x, y, id}) => {
      const distance = Math.sqrt((x-clientX)**2 + (y-clientY)**2);
      if (distance < minimumDistance) {
        minimumDistance = distance;
        closestItemId = id;
      }
    });
    setOpenedItemId(closestItemId);
  };

  const onMouseLeave = () => setOpenedItemId(null);

  const tooltipRef = createRef();

  useEffect(() => {
    setOpenedItemId(highlightedItemId);
  }, [highlightedItemId]);

  /*
   * Color handling
   */

  let overrideColors = null;
  if (highlightedSectionId !== null) {
    const index = sections.findIndex(({id}) => id === highlightedSectionId);
    overrideColors = colors.map((ringColors, ringIndex) => {
      const result = [...ringColors];
      result[index] = highlightColors[ringIndex][index];
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
        onMouseLeave={onMouseLeave}>
        {[...rings].reverse().map((ring, i) =>
          <Ring
            key={ring.id}
            position={i}
            radius={ringRadii[i]}
            colors={getColorPalette(ring.id)[i%getColorPalette(ring.id).length]}
            contents={sections.map(section => items.filter(_ => _.ringId === ring.id && _.sectionId === section.id).map(item =>
              <Item
                key={item.id}
                opened={openedItemId === item.id}
                updatePosition={updateItemPosition(item.id)}>
                <h3>{item.name}</h3>
                <small>{rings.find(_ => _.id === item.ringId).name} - {sections.find(_ => _.id === item.sectionId).name}</small>
                <p>{item.description}</p>
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
