import { forwardRef } from "react";
import Item from "@Molecules/Item";
import Ring from "@Molecules/Ring";
import withDimensions from "@/hocs/withDimensions";
import './TechRadar.css';



const TechRadar = forwardRef(function TechRadar({ dimensions, sections, rings, items, colors }, ref) {
  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const cssVariables = {
    '--width': `${width}px`,
    '--height': `${height}px`,
  };
  const maxRadius = Math.min(width, height) / 2;
  const ringRadii = rings.map((_, i) => maxRadius / rings.length * (rings.length - i));

  return (
    <div ref={ref} className="TechRadar" style={cssVariables}>
      <div className="TechRadar-viewport">
        {[...rings].reverse().map((ring, i) => 
          <Ring
            key={ring.id}
            position={i}
            radius={ringRadii[i]}
            colors={colors[i%colors.length]}
            contents={sections.map(section => items.filter(_ => _.ringId === ring.id && _.sectionId === section.id).map(item => 
              <Item 
                key={item.id}
                item={item} />
            ))}>
          </Ring>
        )}
      </div>
    </div>
  );
});

TechRadar.displayName = 'TechRadar';

export default withDimensions(TechRadar);