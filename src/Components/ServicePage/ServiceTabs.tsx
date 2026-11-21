import { useId, useRef, useState, type KeyboardEvent } from "react";

export interface ServiceTab {
  heading: string;
  content: string;
  image: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  tabs: ServiceTab[];
}

/** Accessible tab set (pill tabs + image/text panel), used on Commercial Interior. */
export default function ServiceTabs({ eyebrow, title, titleAccent, tabs }: Props) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = tabs[active];
  if (!current) return null;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section className="section sp-tabs" aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-head">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={`${id}-title`} className="h2">
              {title} {titleAccent}
            </h2>
          </div>
        </div>

        <div className="sp-tabs__list" role="tablist" aria-label={title} onKeyDown={onKey}>
          {tabs.map((t, i) => (
            <button
              key={t.heading}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              className="sp-tabs__tab"
              onClick={() => setActive(i)}
            >
              {t.heading}
            </button>
          ))}
        </div>

        <div
          className="sp-tabs__panel"
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
        >
          <div className="sp-tabs__text">
            <span className="index-num">
              {String(active + 1).padStart(2, "0")} / {String(tabs.length).padStart(2, "0")}
            </span>
            <h3 className="h2">{current.heading}</h3>
            <p className="lead">{current.content.trim()}</p>
          </div>
          <div className="sp-tabs__media img-frame">
            <img src={current.image} alt={current.heading} className="img-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
