import { createRef, useRef, useContext, useState } from "react";
import Tooltip from "@Atoms/Tooltip";
import Item from "@Atoms/Item";
import Ring from "@Molecules/Ring";
import useDimensions from "@/utils/useDimensions";
import { Context } from "@/store/data.context";
import "./TechRadar.css";

const TechRadar = function TechRadar() {
  const {
    data: { rings, sections, items },
    setHighlightedItemId,
  } = useContext(Context);

  const targetRef = useRef();
  const dimensions = useDimensions({ targetRef });
  const [itemPositions] = useState({});
  const tooltipRef = createRef();

  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const cssVariables = {
    "--width": `${width}px`,
    "--height": `${height}px`,
  };

  /*
   * Items register their coordinates with this updateItemPosition prop.
   * Coordinates will be used to highlight the nearest item to the cursor.
   */

  const updateItemPosition = (id) => (position) => {
    itemPositions[id] = {
      x: position.x,
      y: position.y,
    };
  };

  /*
   * Search for the nearest item to the cursor and set highlightedItemId accordingly.
   */

  const onMouseMove = ({ clientX, clientY, target }) => {
    if (
      tooltipRef.current &&
      (target === tooltipRef.current || tooltipRef.current.contains(target))
    )
      return;
    let minimumDistance = Infinity;
    let closestItemId = null;
    Object.keys(itemPositions).forEach((id) => {
      const { x, y } = itemPositions[id];
      const distance = Math.sqrt((x - clientX) ** 2 + (y - clientY) ** 2);
      if (distance < minimumDistance) {
        minimumDistance = distance;
        closestItemId = +id;
      }
    });
    setHighlightedItemId(closestItemId);
  };

  const onMouseLeave = () => setHighlightedItemId(null);

  /*
   * Template
   */

  return (
    <div
      ref={targetRef}
      className="tr"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={cssVariables}
    >
      {[...rings].reverse().map((ring, i) => (
        <Ring key={ring.id} position={i} ring={ring} dimensions={dimensions}>
          {sections.map((section) =>
            items
              .filter((_) => _.ringId === ring.id && _.sectionId === section.id)
              .map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  updatePosition={updateItemPosition(item.id)}
                >
                  <h3>{item.name}</h3>
                  <small>
                    {rings.find((_) => _.id === item.ringId).name} -{" "}
                    {sections.find((_) => _.id === item.sectionId).name}
                  </small>
                  <p>{item.description}</p>
                </Item>
              ))
          )}
        </Ring>
      ))}
      <Tooltip ref={tooltipRef} />
    </div>
  );
};

TechRadar.displayName = "TechRadar";

export default TechRadar;
