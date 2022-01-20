import { useContext, forwardRef, useLayoutEffect, useState } from "react";
import { Context } from "@/store/tooltip.context";
import "./Tooltip.css";

function Tooltip(_, ref) {
  const { tooltip } = useContext(Context);
  const [style, setStyle] = useState();

  useLayoutEffect(() => {
    const parent = ref.current ? ref.current.parentElement : null;

    if (parent && tooltip.position) {
      const rootRect = parent.getBoundingClientRect();

      const x = tooltip.position.x - rootRect.x;
      const y = tooltip.position.y - rootRect.y;

      setStyle({
        "--x": `${x}`,
        "--y": `${y}`,
        "--translateX": `${x < rootRect.width / 2 ? "0" : "-100"}`,
        "--translateY": `${y < rootRect.height / 2 ? "0" : "-100"}`,
        "--offsetX": `${x < rootRect.width / 2 ? "6" : "-6"}`,
        "--offsetY": `${y < rootRect.height / 2 ? "6" : "-6"}`,
        "--rotation": `${
          x < (rootRect.width / 2 && y < rootRect.height / 2) ||
          (x > rootRect.width / 2 && y > rootRect.height / 2)
            ? "135deg"
            : "45deg"
        }`,
      });
    }
  }, [setStyle, ref, tooltip]);

  if (!tooltip.content) return null;

  return (
    <div ref={ref} className="tr-tooltip" style={style}>
      {tooltip.content}
    </div>
  );
}

export default forwardRef(Tooltip);
