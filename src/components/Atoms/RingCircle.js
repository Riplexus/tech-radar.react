import { useContext } from "react";
import { Context } from "@/store/data.context";
import mulberry32 from "@/utils/mulberry32";
import "./RingCircle.css";

function RingCircle({ content, width, position }) {
  const { data } = useContext(Context);

  const random = mulberry32(position);
  const isHighlighted =
    data.sections && data.highlightedSectionId === data.sections[0].id;

  let className = "tr-ring-circle tr-ring-section-0";
  if (isHighlighted) className += " tr-section-highlighted";

  return (
    <div className={className} style={{ "--width": width }}>
      <div className="tr-ring-circle-content">
        {content.map((entry, i) => (
          <div
            key={i}
            style={{
              "--random": random(),
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
