import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SlideshowLightbox } from "lightbox.js-react";
import { LuArrowRight } from "react-icons/lu";
import { cldUrl } from "src/lib/cloudinary";
import { subscribeProjects, type Project } from "src/lib/projects";

const MAX_PER_TAB = 12;

/** Photos for one tab, from the projects managed in the admin (Cloudinary). */
interface GalleryImage {
  image: string;
  alt: string;
}

function imagesFor(projects: Project[], categories: string[]): GalleryImage[] {
  return projects
    .filter((p) => categories.includes(p.category))
    .flatMap((p) => p.images.map((img) => ({ image: cldUrl(img.publicId, 1600), alt: p.title })))
    .slice(0, MAX_PER_TAB);
}

export default function Gallery() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => subscribeProjects(setProjects, () => setProjects([])), []);

  // Photos come from the projects managed in the admin (served by Cloudinary).
  const tabs = useMemo(
    () =>
      [
        { key: "commercial", label: "Commercial", images: imagesFor(projects ?? [], ["Commercial"]) },
        { key: "residential", label: "Residential", images: imagesFor(projects ?? [], ["Residential", "Exterior"]) },
      ].filter((t) => projects === null || t.images.length > 0),
    [projects]
  );
  const tab = tabs[Math.min(active, tabs.length - 1)];

  // Nothing published yet: hide the section rather than show an empty grid.
  if (projects !== null && tabs.length === 0) return null;

  return (
    <section className="hm-gallery section" aria-labelledby="hm-gallery-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 id="hm-gallery-title" className="h1">
              Our work
            </h2>
          </div>
          <div className="hm-gallery__tabs" role="tablist" aria-label="Project type">
            {tabs.map((t, i) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="hm-gallery-panel"
                className={`btn btn--sm ${i === active ? "btn--dark" : "btn--outline"}`}
                onClick={() => setActive(i)}
              >
                {t.label}
                <span className="hm-gallery__count">{projects === null ? "" : t.images.length}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="hm-gallery-panel" role="tabpanel" aria-label={`${tab.label} projects`}>
          {/* key forces a remount: the lightbox reads its children once on mount */}
          {projects === null ? (
            <div className="hm-gallery__grid" aria-busy="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="hm-gallery__img hm-gallery__placeholder" />
              ))}
            </div>
          ) : (
          <SlideshowLightbox
            key={`${tab.key}-${tab.images[0]?.image ?? ""}`}
            className="hm-gallery__grid"
          >
            {tab.images.map((img) => (
              <img
                key={img.image}
                src={img.image}
                alt={img.alt}
                className="hm-gallery__img"
                loading="lazy"
              />
            ))}
          </SlideshowLightbox>
          )}
        </div>

        <div className="hm-gallery__foot">
          <p className="muted">Tap any image to open the full-screen viewer.</p>
          <Link to="/Projects" className="btn btn--dark">
            View all projects <LuArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
