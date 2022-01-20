import mulberry32 from "@/utils/mulberry32";
import "./RingCircle.css";

function RingCircle({ color, content, width, position }) {
    const random = mulberry32(position);
    return (
      <div className="tr-ring-circle" style={{
        '--color': color,
        '--width': width,
      }}>
        <div className="tr-ring-circle-content">
          {content.map((entry, i) => (
            <div key={i} style={{
              '--random': random(),
            }}>{entry}</div>
          ))}
        </div>
      </div>
    );
  }

  export default RingCircle;