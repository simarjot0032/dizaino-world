import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SlideshowLightbox } from "lightbox.js-react";
import { LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import Navbar from "@Components/Navbar";
import Footer from "@Components/Footer";
import Accordian from "@Components/Accordian";
import { serviceGroups } from "@Data/Naviagation";
import type {
  ServiceFaq,
  ServiceFeature,
  ServiceImage,
  ServiceLink,
  ServiceStep,
} from "./types";
import "@Styles/ServicePage.css";

export interface ServicePageProps {
  /** Route of this page (e.g. "/Bedroom"); used for breadcrumb + sibling links. */
  path: string;
  /** Short service name, set huge in the hero ("Bedroom"). */
  name: string;
  /** Existing hero headline. */
  title: string;
  /** Part of `title` to render in serif italic. Must appear in `title`. */
  titleAccent?: string;
  subtitle: string;
  heroImage: string;
  /** CSS object-position for the hero photo. */
  heroPosition?: string;
  /** Overrides the breadcrumb group ("Services / Residential Interiors"). */
  eyebrow?: string;
  features?: ServiceFeature[];
  /** Lower-case noun used in "How we design {x}" / "{X} projects". */
  subject?: string;
  process?: ServiceStep[];
  gallery?: ServiceImage[];
  faqs?: ServiceFaq[];
  /** Override the auto-picked sibling services. */
  related?: ServiceLink[];
  /** Extra section rendered after the features (e.g. Commercial Interior tabs). */
  children?: ReactNode;
}

const pad = (n: number) => String(n).padStart(2, "0");


function siblingsFor(path: string, count = 3): { group?: string; links: ServiceLink[] } {
  const key = path.toLowerCase();
  const group = serviceGroups.find((g) =>
    g.links.some((l) => l.path.toLowerCase() === key)
  );
  if (!group) return { links: [] };
  const i = group.links.findIndex((l) => l.path.toLowerCase() === key);
  const ordered = [...group.links.slice(i + 1), ...group.links.slice(0, i)];
  let links: ServiceLink[] = ordered.slice(0, count);
  if (links.length < count) {
    const others = serviceGroups
      .filter((g) => g !== group)
      .map((g) => g.links[0])
      .filter(Boolean);
    links = [...links, ...others].slice(0, count);
  }
  return { group: group.title, links };
}

export default function ServicePage({
  path,
  name,
  subtitle,
  heroImage,
  heroPosition = "center",
  eyebrow,
  features = [],
  subject,
  process = [],
  gallery = [],
  faqs = [],
  related,
  children,
}: ServicePageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const noun = subject ?? name.toLowerCase();
  const auto = siblingsFor(path);
  const crumb = eyebrow ?? auto.group ?? "Design";
  const siblings = related ?? auto.links;

  return (
    <>
      <Navbar />
      <main className="sp">
        {/* ---------------- HERO ---------------- */}
        <section className="sp-hero on-image" aria-labelledby="sp-hero-title">
          <img
            src={heroImage}
            alt=""
            className="sp-hero__img img-cover"
            style={{ objectPosition: heroPosition }}
            fetchPriority="high"
          />
          <div className="sp-hero__scrim" aria-hidden="true" />

          <div className="sp-hero__inner container">
            <div className="sp-hero__top">
              <nav className="sp-crumb eyebrow" aria-label="Breadcrumb">
                <span>Services</span>
                <span aria-hidden="true">/</span>
                <span>{crumb}</span>
              </nav>
              <h1 id="sp-hero-title" className="sp-hero__name">
                {name}
              </h1>
            </div>

          </div>
        </section>

        <div id="sp-content" />

        {/* ---------------- FEATURES ---------------- */}
        {features.length > 0 && (
          <section className="section sp-features" aria-labelledby="sp-features-title">
            <div className="container">
              <div className="section-head">
                <div>
                  <h2 id="sp-features-title" className="h2">
                    What we provide
                  </h2>
                </div>
                <p className="lead">{subtitle}</p>
              </div>
              <ol className="sp-features__grid">
                {features.map((f, i) => (
                  <li className="sp-feature" key={f.heading} data-aos="fade-up" data-aos-delay={i * 80}>
                    <h3 className="h3">{f.heading}</h3>
                    <p className="muted">{f.content}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {children}

        {/* ---------------- PROCESS ---------------- */}
        {process.length > 0 && (
          <section className="section section--paper sp-process" aria-labelledby="sp-process-title">
            <div className="container">
              <div className="section-head">
                <div>
                  <h2 id="sp-process-title" className="h2">
                    How we design {noun}
                  </h2>
                </div>
                <p className="lead">
                  A clear sequence from first conversation to final handover, so
                  you always know what happens next.
                </p>
              </div>
              <ol className="sp-steps">
                {process.map((s, i) => (
                  <li className="sp-step" key={s.heading}>
                    <div className="sp-step__text">
                      <span className="sp-step__num">{pad(i + 1)}</span>
                      <div>
                        <h3 className="h3">{s.heading}</h3>
                        <p className="muted">{s.desc.trim()}</p>
                      </div>
                    </div>
                    <div className="sp-step__media img-frame" data-aos="fade-up">
                      <img src={s.image} alt={s.heading} className="img-cover" loading="lazy" />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ---------------- GALLERY ---------------- */}
        {gallery.length > 0 && (
          <section className="section section--dark sp-gallery" aria-labelledby="sp-gallery-title">
            <div className="container">
              <div className="section-head">
                <div>
                  <h2 id="sp-gallery-title" className="h2">
                    {name} projects
                  </h2>
                </div>
                <p className="lead">Tap any image to open the full-screen viewer.</p>
              </div>
              <SlideshowLightbox className="sp-gallery__grid" theme="night" backgroundColor="#0e0e0d">
                {gallery.map((g, i) => (
                  <img
                    src={g.image}
                    key={i}
                    alt={`${name} project ${i + 1}`}
                    className="sp-gallery__img"
                    loading="lazy"
                  />
                ))}
              </SlideshowLightbox>
            </div>
          </section>
        )}

        {/* ---------------- FAQ ---------------- */}
        {faqs.length > 0 && (
          <section className="section sp-faq" aria-labelledby="sp-faq-title">
            <div className="container sp-faq__inner">
              <div className="sp-faq__head">
                <h2 id="sp-faq-title" className="h2">
                  Frequently asked questions
                </h2>
                <p className="lead">
                  Something else on your mind? <Link to="/Contact" className="sp-link">Talk to our team</Link>.
                </p>
              </div>
              <div className="sp-faq__list">
                {faqs.map((f, i) => (
                  <Accordian objectforquestionandanswer={f} key={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------------- CTA + RELATED ---------------- */}
        <section className="sp-cta section--dark" aria-labelledby="sp-cta-title">
          <div className="container">
            <div className="sp-cta__band">
              <h2 id="sp-cta-title" className="h1">
                Start your project
              </h2>
              <Link to="/Contact" className="btn btn--light">
                Book a Consultation <LuArrowRight aria-hidden="true" />
              </Link>
            </div>
            {siblings.length > 0 && (
              <nav className="sp-related" aria-label="Explore other services">
                <p className="eyebrow">Explore other services</p>
                <ul>
                  {siblings.map((s) => (
                    <li key={s.path}>
                      <Link to={s.path}>
                        <span>{s.label}</span>
                        <LuArrowUpRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
