import { useCallback, useState, useContext } from "react";
import { DataContext } from "@/store/store";
import Tooltip from "@Atoms/Tooltip";
import "./Item.css";

function Item({ children, item, updatePosition }) {
  const { data } = useContext(DataContext);
  const opened = data.highlightedItemId === item.id;
  const [position, setPosition] = useState();

  const ref = useCallback(
    (node) => {
      if (node === null) return;
      const rect = node.getBoundingClientRect();
      const position = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };
      updatePosition(position);
      setPosition(position);
    },
    [updatePosition]
  );

  const classes = ["tr-item"];
  if (opened) classes.push("tr-opened");

  return (
    <div ref={ref} className={classes.join(" ")}>
      <span>•</span>
      {opened && <Tooltip position={position}>{children}</Tooltip>}
    </div>
  );
}

export default Item;
