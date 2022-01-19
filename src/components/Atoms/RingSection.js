import mulberry32 from "@/utils/mulberry32";
import "./RingSection.css";

function RingSection({ color, content, width, rotation, position, key }) {
    const random = mulberry32(rotation+position);
    return (
      <div className="Ring-section" style={{
        '--color': color,
        '--width': width,
        '--rotation': rotation,
      }} key={key}>
        <div className="Ring-section-background" />
        <div className="Ring-section-content">
          {content.map((entry, i) => (
            <div key={i} style={{
              '--random': random(),
              '--random2': random(),
            }}>{entry}</div>
          ))}
        </div>
      </div>
    );
  }

  export default RingSection;