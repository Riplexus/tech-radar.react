import { useContext, useMemo } from "react";
import { Context } from "@/store/data.context";
import mulberry32 from "@/utils/mulberry32";
import "./RingSection.css";

function RingSection({
  content,
  width,
  rotation,
  position,
  part,
  radius,
  prevRadius,
}) {
  const { data } = useContext(Context);

  const isHighlighted = useMemo(
    () => data.highlightedSectionId === data.sections[part].id,
    [data.highlightedSectionId, data.sections, part]
  );

  const positioning = useMemo(() => {
    const itemSize = data.itemSize;
    const padding = Math.min(6, (radius - prevRadius) / 2 - itemSize);
    const random = mulberry32(rotation + position);

    const createPosition = () => {
      const distance =
        random() * (radius - 2 * itemSize - 2 * padding - prevRadius) +
        prevRadius +
        itemSize +
        padding;
      const anglePadding =
        (Math.atan((itemSize + padding) / (distance - 0.5 * itemSize)) * 180) /
        Math.PI;

      return {
        angle: random() * (width - 2 * anglePadding) + anglePadding,
        distanceRel: distance / radius,
      };
    };

    return Array.from({ length: content.length }).map(createPosition);
  }, [
    content.length,
    data.itemSize,
    radius,
    prevRadius,
    rotation,
    position,
    width,
  ]);

  let className = "tr-ring-section";
  if (typeof part !== "undefined") className += ` tr-ring-section-${part}`;
  if (isHighlighted) className += " tr-section-highlighted";

  return (
    <div
      className={className}
      style={{
        "--width": width,
        "--rotation": rotation,
      }}
      key={part}
    >
      <div className="tr-ring-section-background" />
      <div className="tr-ring-section-content">
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

export default RingSection;
