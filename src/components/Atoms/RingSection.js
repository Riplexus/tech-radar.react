import { useContext } from "react";
import { DataContext } from "@/store/store";
import mulberry32 from "@/utils/mulberry32";
import "./RingSection.css";

function RingSection({ content, width, rotation, position, part }) {
  const { data } = useContext(DataContext);
  const random = mulberry32(rotation + position);

  let className = "tr-ring-section";
  if (typeof part !== "undefined") className += ` tr-ring-section-${part}`;
  if (
    data.sections[part] &&
    data.highlightedSectionId === data.sections[part].id
  )
    className += " tr-section-highlighted";

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
