const stats = [
  { value: "12+", unit: "Years", label: "of design experience" },
  { value: "5000+", unit: "Projects", label: "completed" },
  { value: "500+", unit: "Clients", label: "who keep coming back" },
];

/** Thin white line drawing of a two-storey house, stroke only. */
function HouseLineArt() {
  return (
    <svg
      className="hm-spec__art"
      viewBox="0 0 240 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* ground + construction lines */}
      <path d="M6 164h228" />
      <path d="M14 172l40-20M226 172l-40-20" strokeDasharray="2 4" opacity=".5" />
      {/* main volume (front + side in light perspective) */}
      <path d="M36 164V78l78-18v104" />
      <path d="M114 60l74 14v90" />
      <path d="M36 78l78-18 74 14" />
      {/* cantilevered roof slab */}
      <path d="M26 74l88-22 86 16-10 4-76-14-80 20z" />
      {/* upper floor line */}
      <path d="M36 118l78-12 74 10" />
      {/* front glazing */}
      <path d="M48 112V86l26-6v28zM82 104V78l22-5v28z" />
      <path d="M61 83v26M93 75v27" opacity=".6" />
      <path d="M48 160v-30l26-4v34M56 128v32M66 127v33" />
      <path d="M84 160v-36l22-3v39" />
      {/* side windows */}
      <path d="M126 82l18 3v20l-18-3zM156 88l20 3v20l-20-3z" />
      <path d="M126 124l50 6v34" />
      <path d="M126 124v40" />
      {/* steps */}
      <path d="M78 164l6-4h28l6 4M84 160l4-3h20l4 3" opacity=".7" />
      {/* dimension line */}
      <path d="M36 40h152M36 36v8M188 36v8" opacity=".5" />
    </svg>
  );
}

export default function SpecPanel() {
  return (
    <section className="hm-spec section--dark" aria-label="Studio at a glance">
      <div className="hm-spec__inner container">
        <div className="hm-spec__drawing">
          <HouseLineArt />
          <p className="hm-spec__caption">
            <span className="index-num">DW / Studio</span>
            Interior · Exterior · Planning
          </p>
        </div>
        <dl className="hm-spec__stats">
          {stats.map((s) => (
            <div className="hm-spec__stat" key={s.unit}>
              <dt className="hm-spec__label">
                {s.unit} <span className="muted">{s.label}</span>
              </dt>
              <dd className="hm-spec__value">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
