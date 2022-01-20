import { useContext } from "react";
import { DataContext } from "@/store/store";
import RingCircle from "@Atoms/RingCircle";
import RingSection from "@Atoms/RingSection";
import "./Ring.css";

function Ring({ position = 0, children, dimensions, ring }) {
  const { data } = useContext(DataContext);

  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const maxRadius = Math.min(width, height) / 2;
  const radius =
    (maxRadius / data.rings.length) * (data.rings.length - position);

  let className = "tr-ring";
  if (typeof position !== "undefined") className += ` tr-ring-${position}`;
  if (data.highlightedRingId === ring.id) className += " tr-ring-highlighted";

  return (
    <div className={className} style={{ "--radius": radius }}>
      {children.length <= 1 &&
        RingCircle({
          content: children[0],
          width: 360,
          position,
        })}
      {children.length > 1 &&
        children.map((_, i) =>
          RingSection({
            content: children[i],
            width: 360 / children.length,
            rotation: (360 / children.length) * i,
            position,
            part: i,
          })
        )}
    </div>
  );
}

export default Ring;
