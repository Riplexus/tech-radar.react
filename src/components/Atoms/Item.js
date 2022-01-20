import {
  useRef,
  useContext,
  useLayoutEffect,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Context as DataContext } from "@/store/data.context";
import { Context as TooltipContext } from "@/store/tooltip.context";
import "./Item.css";

function Item({ children, item, updatePosition }) {
  const { data } = useContext(DataContext);
  const { tooltip, setTooltip, clearTooltip } = useContext(TooltipContext);

  const [position, setPosition] = useState({ x: null, y: null });
  const ref = useRef();

  const tooltipEntry = useMemo(
    () => ({
      position,
      content: children,
      itemId: item.id,
    }),
    [position, children, item]
  );
  const isHighlighted = data.highlightedItemId === item.id;
  const isCurrentTooltip = tooltip.itemId === item.id;

  /*
   * After mounting, persist the coordinates of this item's center point
   * and pass them upwards via updatePosition prop.
   */

  useLayoutEffect(() => {
    if (ref.current === null) return;
    const rect = ref.current.getBoundingClientRect();
    const newPos = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };
    if (position.x === newPos.x && position.y === newPos.y) return;
    updatePosition(newPos);
    setPosition(newPos);
  }, [updatePosition, position, setPosition]);

  /*
   * If this particular item is highlighted or loses highlighting, set the tooltip info accordingly.
   */

  useEffect(() => {
    if (isHighlighted && !isCurrentTooltip) {
      setTooltip(tooltipEntry);
    } else if (!isHighlighted && isCurrentTooltip) {
      clearTooltip();
    }
  }, [tooltipEntry, isHighlighted, isCurrentTooltip, setTooltip, clearTooltip]);

  /*
   * Templating
   */

  let className = "tr-item";
  if (isHighlighted) className += " tr-opened";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        "--itemSize": data.itemSize,
      }}
    />
  );
}

export default Item;
