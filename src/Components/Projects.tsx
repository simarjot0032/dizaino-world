import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuChevronLeft,
  LuChevronRight,
  LuX,
} from "react-icons/lu";
import { cldUrl } from "src/lib/cloudinary";
import { CATEGORIES, coverOf, subscribeProjects, type Project } from "src/lib/projects";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "@Styles/Projects.css";

type Status = "loading" | "ready" | "error";
type Filter = "All" | (typeof CATEGORIES)[number];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);

  useEffect(
    () =>
      subscribeProjects(
        (list) => {
          setProjects(list.filter((p) => p.images.length > 0));
          setStatus("ready");
        },
        (error) => {
          console.error(error);
          setStatus("error");
        }
      ),
    []
  );

  // Only offer filters for categories that actually have projects.
  const filters = useMemo<Filter[]>(
    () => ["All", ...CATEGORIES.filter((c) => projects.some((p) => p.category === c))],
    [projects]
  );
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <Navbar />
      <main className="projects-page">
        <header className="container projects-hero">
          <span className="eyebrow">Portfolio</span>
          <div className="projects-hero__row">
            <h1 className="h1 projects-hero__title" data-aos="fade-up">
              Our projects
            </h1>
            <p className="lead projects-hero__lead" data-aos="fade-up">
              A running archive of interiors and exteriors from the Dizaino
              World studio: homes, pooja rooms, theaters, facades and
              commercial spaces, planned in 2D and 3D and finished on site.
            </p>
          </div>
          {filters.length > 2 && (
            <div className="projects-filter" role="group" aria-label="Filter projects">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={"btn btn--sm " + (f === filter ? "btn--dark" : "btn--outline")}
                  aria-pressed={f === filter}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </header>

        <section className="container projects-body" aria-live="polite">
          {status === "loading" && <ProjectsSkeleton />}

          {status !== "loading" && projects.length === 0 && (
            <div className="projects-empty">
              <h2 className="h2">
                {status === "error" ? "We couldn't load the projects." : "New projects coming soon."}
              </h2>
              <p className="lead">
                {status === "error"
                  ? "Please refresh the page in a moment. In the meantime, tell us about your space."
                  : "We're photographing recent projects. In the meantime, tell us about your space."}
              </p>
              <Link to="/Contact" className="btn btn--dark">
                Start a project <LuArrowRight aria-hidden />
              </Link>
            </div>
          )}

          {shown.length > 0 && (
            <ul className="projects-grid">
              {shown.map((p, index) => {
                const cover = coverOf(p)!;
                return (
                  <li className="project-card" key={p.id} data-aos="fade-up">
                    <button
                      type="button"
                      className="project-card__btn"
                      onClick={() =>
                        setOpen({ project: p, index: Math.max(0, p.images.indexOf(cover)) })
                      }
                      aria-label={`Open ${p.title} gallery`}
                    >
                      <div className="img-frame project-card__frame">
                        <img
                          src={cldUrl(cover.publicId, 1200)}
                          alt={p.title}
                          className="img-cover"
                          loading={index < 2 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </div>
                      <div className="project-card__meta">
                        <span className="project-card__title">{p.title}</span>
                        <span className="muted project-card__sub">
                          {p.category}
                        </span>
                        <span className="project-card__view">
                          {p.images.length > 1 ? `${p.images.length} photos` : "View"}{" "}
                          <LuArrowUpRight aria-hidden />
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="container projects-cta">
          <hr className="hairline" />
          <div className="projects-cta__row">
            <h2 className="h2">Have a space in mind? Let's talk.</h2>
            <Link to="/Contact" className="btn btn--outline">
              Get in touch <LuArrowRight aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      {open && (
        <ProjectLightbox
          title={open.project.title}
          images={open.project.images.map((i) => cldUrl(i.publicId, 2000))}
          index={open.index}
          onChange={(index) => setOpen({ ...open, index })}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

function ProjectsSkeleton() {
  return (
    <ul className="projects-grid" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <li className="project-card" key={i}>
          <div className="project-card__frame skeleton" />
          <div className="project-card__meta">
            <span className="skeleton skeleton--line" />
          </div>
        </li>
      ))}
      <li className="visually-hidden">Loading projects…</li>
    </ul>
  );
}

interface LightboxProps {
  title: string;
  images: string[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}

function ProjectLightbox({ title, images, index, onChange, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = images.length;

  const prev = useCallback(
    () => onChange((index - 1 + total) % total),
    [index, total, onChange]
  );
  const next = useCallback(
    () => onChange((index + 1) % total),
    [index, total, onChange]
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      className="p-lightbox on-image"
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, photo ${index + 1} of ${total}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="p-lightbox__bar">
        <span className="p-lightbox__title">
          {title} <span className="index-num">{pad(index + 1)} / {pad(total)}</span>
        </span>
        <button
          ref={closeRef}
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <LuX aria-hidden />
        </button>
      </div>
      <img
        src={images[index]}
        alt={`${title}, photo ${index + 1}`}
        className="p-lightbox__img"
      />
      {total > 1 && (
        <div className="p-lightbox__nav">
          <button
            type="button"
            className="icon-btn"
            onClick={prev}
            aria-label="Previous photo"
          >
            <LuChevronLeft aria-hidden />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={next}
            aria-label="Next photo"
          >
            <LuChevronRight aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
