import './Ring.css';

function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1); // eslint-disable-line
    t ^= t + Math.imul(t ^ t >>> 7, t | 61); // eslint-disable-line
    return ((t ^ t >>> 14) >>> 0) / 4294967296; // eslint-disable-line
  }
}

function RingCircle({ color, content, width, position }) {
  const random = mulberry32(position);
  return (
    <div className="Ring-circle" style={{
      '--color': color,
      '--width': width,
    }}>
      <div className="Ring-circle-content">
        {content.map((entry, i) => (
          <div key={i} style={{
            '--random': random(),
          }}>{entry}</div>
        ))}
      </div>
    </div>
  );
}

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
          }}>{entry}</div>
        ))}
      </div>
    </div>
  );
}

/* <Ring radius={maxRadius * .03} colors={['#24272e']} /> */

function Ring({ position = 0, radius = 1, colors = ['red'], contents = [] }) {
  return (
    <div className="Ring" style={{
      '--radius': radius,
    }}>
      {contents.length <= 1 && RingCircle({
        color: colors[0],
        content: contents[0],
        width: 360,
        position,
       })}
      {contents.length > 1 && contents.map((_, i) => RingSection({
        color: colors[i%colors.length],
        content: contents[i],
        width: 360 / contents.length,
        rotation: 360 / contents.length * i,
        position,
        key: i,
       })
      )}
    </div>
  );
}

export default Ring;