import { useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import { featuredProjects } from "@Data/LightBoxDataHome";

export default function Featured() {
  const [active, setActive] = useState(0);
  const item = featuredProjects[active];

  return (
    <section className="hm-featured" aria-labelledby="hm-featured-title">
      <div className="container">
        <div className="hm-featured__stage">
          <div className="hm-featured__media">
            {featuredProjects.map((p, i) => (
              <img
                key={p.link}
                src={p.image}
                alt={i === active ? p.alt : ""}
                aria-hidden={i !== active}
                className={`img-cover hm-featured__img${i === active ? " is-active" : ""}`}
                loading="lazy"
              />
            ))}
            <div className="hm-featured__tabs" role="tablist" aria-label="Featured work">
              {featuredProjects.map((p, i) => (
                <button
                  key={p.link}
                  type="button"
                  role="tab"
                  id={`hm-feat-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="hm-feat-panel"
                  className={`hm-featured__tab${i === active ? " is-active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          <article
            className="hm-featured__card"
            id="hm-feat-panel"
            role="tabpanel"
            aria-labelledby={`hm-feat-tab-${active}`}
          >
            <h2 id="hm-featured-title" className="hm-featured__heading">
              {item.heading}
            </h2>
            <p className="hm-featured__text">{item.content}</p>
            <dl className="hm-featured__rows">
              <div>
                <dt>Category</dt>
                <dd>{item.category}</dd>
              </div>
              <div>
                <dt>Discipline</dt>
                <dd>{item.discipline}</dd>
              </div>
              <div>
                <dt>Gallery</dt>
                <dd>
                  <Link to={item.link} className="hm-featured__link">
                    {item.linkLabel}
                    <LuArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
