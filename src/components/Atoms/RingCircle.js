import { useContext, useMemo } from "react";
import { Context } from "@/store/data.context";
import mulberry32 from "@/utils/mulberry32";
import "./RingCircle.css";

function RingCircle({ content, width, position, radius, prevRadius }) {
  const { data } = useContext(Context);

  const isHighlighted =
    data.sections && data.highlightedSectionId === data.sections[0].id;

  const positioning = useMemo(() => {
    const itemSize = data.itemSize;
    const padding = Math.min(6, (radius - prevRadius) / 2 - itemSize);
    const random = mulberry32(position);

    const createPosition = () => {
      const distance =
        random() * (radius - prevRadius - 2 * itemSize - 2 * padding) +
        prevRadius +
        itemSize +
        padding;

      return {
        angle: random() * width,
        distanceRel: distance / radius,
      };
    };

    return Array.from({ length: content.length }).map(createPosition);
  }, [content.length, data.itemSize, radius, prevRadius, position, width]);

  let className = "tr-ring-circle tr-ring-section-0";
  if (isHighlighted) className += " tr-section-highlighted";

  return (
    <div className={className} style={{ "--width": width }}>
      <div className="tr-ring-circle-content">
        {content.map((entry, i) => (
          <div
            key={i}
            style={{
              "--angle": positioning[i]?.angle,
              "--distanceRel": positioning[i]?.distanceRel,
            }}
          >
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RingCircle;
