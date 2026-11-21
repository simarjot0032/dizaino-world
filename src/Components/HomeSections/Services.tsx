import { useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import { homeServices } from "@Data/LightBoxDataHome";

export default function Services() {
  const [hovered, setHovered] = useState(0);

  return (
    <section className="hm-services section" aria-labelledby="hm-services-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 id="hm-services-title" className="h1">
              What we design
            </h2>
          </div>
          <p className="lead">
            From a single pooja room to a full commercial fit-out, every space
            is planned, drawn and delivered by the same team.
          </p>
        </div>

        <div className="hm-services__layout">
          <ol className="hm-services__list">
            {homeServices.map((s, i) => (
              <li key={s.link}>
                <Link
                  to={s.link}
                  className={`hm-services__row${hovered === i ? " is-hovered" : ""}`}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                >
                  <span className="hm-services__thumb" aria-hidden="true">
                    <img src={s.image} alt="" className="img-cover" loading="lazy" />
                  </span>
                  <span className="hm-services__title">{s.title}</span>
                  <span className="hm-services__group">{s.group}</span>
                  <LuArrowUpRight className="hm-services__arrow" size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>

          <div className="hm-services__preview" aria-hidden="true">
            {homeServices.map((s, i) => (
              <img
                key={s.link}
                src={s.image}
                alt=""
                className={`img-cover${hovered === i ? " is-active" : ""}`}
                loading="lazy"
              />
            ))}
            <span className="hm-services__preview-label">
              {homeServices[hovered].title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
