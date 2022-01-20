import { useContext } from "react";
import { Context } from "@/store/data.context";
import mulberry32 from "@/utils/mulberry32";
import "./RingSection.css";

function RingSection({ content, width, rotation, position, part }) {
  const { data } = useContext(Context);

  const random = mulberry32(rotation + position);
  const isHighlighted = data.highlightedSectionId === data.sections[part].id;

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
              "--random": random(),
              "--random2": random(),
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
