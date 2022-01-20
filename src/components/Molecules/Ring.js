import { useContext } from "react";
import { Context } from "@/store/data.context";
import RingCircle from "@Atoms/RingCircle";
import RingSection from "@Atoms/RingSection";
import "./Ring.css";

function Ring({ position = 0, children, dimensions, ring }) {
  const { data } = useContext(Context);

  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const maxRadius = Math.min(width, height) / 2;
  const ringCount = data.rings.length;

  // linear ring size
  // const radius = (maxRadius / ringCount) * (ringCount - position);
  // const prevRadius = (maxRadius / ringCount) * (ringCount - position - 1);

  // logarithmic ring size
  const radius =
    (Math.log(ringCount + 1 - position) / Math.log(ringCount + 1)) * maxRadius;
  const prevRadius =
    (Math.log(ringCount + 1 - position - 1) / Math.log(ringCount + 1)) *
    maxRadius;

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
          radius,
          prevRadius,
        })}
      {children.length > 1 &&
        children.map((_, i) =>
          RingSection({
            content: children[i],
            width: 360 / children.length,
            rotation: (360 / children.length) * i,
            position,
            part: i,
            radius,
            prevRadius,
          })
        )}
    </div>
  );
}

export default Ring;
