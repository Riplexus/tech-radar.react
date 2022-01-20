import { createRef, useRef, useContext } from "react";
import Item from "@Molecules/Item";
import Ring from "@Molecules/Ring";
import useDimensions from "@/utils/useDimensions";
import { DataContext } from "@/store/store";
import "./TechRadar.css";

const TechRadar = function TechRadar() {
  const { data, setHighlightedItemId } = useContext(DataContext);
  const targetRef = useRef();
  const dimensions = useDimensions({ targetRef });

  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const cssVariables = {
    "--width": `${width}px`,
    "--height": `${height}px`,
  };

  /*
   * Mouse interactions
   */

  const itemPositions = [];
  const updateItemPosition = (id) => (position) => {
    itemPositions.push({
      x: position.x,
      y: position.y,
      id,
    });
    itemPositions.sort((a, b) => a.x - b.x);
  };

  const onMouseMove = ({ clientX, clientY, target }) => {
    if (target === tooltipRef.current || tooltipRef.current.contains(target))
      return;
    let minimumDistance = Infinity;
    let closestItemId = null;
    itemPositions.forEach(({ x, y, id }) => {
      const distance = Math.sqrt((x - clientX) ** 2 + (y - clientY) ** 2);
      if (distance < minimumDistance) {
        minimumDistance = distance;
        closestItemId = id;
      }
    });
    setHighlightedItemId(closestItemId);
  };

  const onMouseLeave = () => setHighlightedItemId(null);

  const tooltipRef = createRef();

  /*
   * Template
   */

  return (
    <div ref={targetRef} className="tr" style={cssVariables}>
      <div
        className="tr-viewport"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {[...data.rings].reverse().map((ring, i) => (
          <Ring key={ring.id} position={i} ring={ring} dimensions={dimensions}>
            {data.sections.map((section) =>
              data.items
                .filter(
                  (_) => _.ringId === ring.id && _.sectionId === section.id
                )
                .map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    updatePosition={updateItemPosition(item.id)}
                  >
                    <h3>{item.name}</h3>
                    <small>
                      {data.rings.find((_) => _.id === item.ringId).name} -{" "}
                      {data.sections.find((_) => _.id === item.sectionId).name}
                    </small>
                    <p>{item.description}</p>
                  </Item>
                ))
            )}
          </Ring>
        ))}
      </div>
      <div ref={tooltipRef} id="tr-tooltip" />
    </div>
  );
};

TechRadar.displayName = "TechRadar";

export default TechRadar;
