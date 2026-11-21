import { LogoMark } from "@Components/Logo";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LuArrowUpRight,
  LuChevronDown,
  LuMenu,
  LuPlus,
  LuX,
} from "react-icons/lu";
import "@Styles/Navbar.css";
import MegaMenu from "@Components/Dropdowncomponent";
import {
  allServicePaths,
  contactDetails,
  primaryLinks,
  serviceGroups,
} from "@Data/Naviagation";

const SCROLL_THRESHOLD = 60;
const DESKTOP_QUERY = "(min-width: 1000px)";
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const MEGA_ID = "nav-services-panel";
const MOBILE_ID = "nav-mobile-overlay";

function canHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(HOVER_QUERY).matches &&
    window.matchMedia(DESKTOP_QUERY).matches
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  const pathname = location.pathname.toLowerCase();
  const servicesActive = allServicePaths.includes(pathname);

  const isActive = (path: string) => {
    if (path === "/#about") return pathname === "/" && location.hash === "#about";
    return pathname === path.toLowerCase();
  };

  /* Solid bar after scrolling past the hero top. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeAll = useCallback(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setOpenGroup(null);
  }, []);

  /* Close menus on route change; honour "/#about"-style anchors. */
  useEffect(() => {
    closeAll();
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash, closeAll]);

  /* Esc closes whichever menu is open and returns focus to its trigger. */
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (megaOpen) servicesBtnRef.current?.focus();
      if (mobileOpen) burgerRef.current?.focus();
      closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen, mobileOpen, closeAll]);

  /* Lock page scroll behind the mobile overlay. */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  /* Leaving the mobile breakpoint closes the overlay. */
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
      else setMegaOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const openMegaHover = () => {
    if (!canHover()) return;
    window.clearTimeout(hoverTimer.current);
    setMegaOpen(true);
  };
  const closeMegaHover = () => {
    if (!canHover()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  /* "/#about" lives on the home page; scroll there directly if already home. */
  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!path.includes("#")) return;
    const [, hash] = path.split("#");
    if (pathname === "/") {
      e.preventDefault();
      closeAll();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      navigate({ pathname: "/", hash: `#${hash}` }, { replace: true });
    }
  };

  // Only Home and service pages open on a dark full-bleed photo; every other
  // page (Projects, Contact, 404…) has a light hero, so start solid there.
  const hasDarkHero = pathname === "/" || servicesActive;
  const solid = scrolled || megaOpen || !hasDarkHero;
  const headerClass = [
    "site-nav",
    solid ? "is-solid" : "",
    megaOpen ? "is-mega" : "",
    mobileOpen ? "is-mobile-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass} onMouseLeave={closeMegaHover}>
      <div className="container site-nav__bar">
        <Link to="/" className="site-nav__brand" aria-label="Dizaino World, home">
          <LogoMark className="site-nav__logo" />
          <span className="site-nav__wordmark">Dizaino World</span>
        </Link>

        <nav className="site-nav__desktop" aria-label="Primary">
          <ul className="site-nav__pill">
            <li onMouseEnter={openMegaHover}>
              <button
                ref={servicesBtnRef}
                type="button"
                className={
                  "site-nav__link" +
                  (servicesActive || megaOpen ? " is-active" : "")
                }
                aria-expanded={megaOpen}
                aria-controls={MEGA_ID}
                onClick={() => setMegaOpen((o) => !o)}
              >
                Services
                <LuChevronDown className="site-nav__chev" aria-hidden />
              </button>
            </li>
            {primaryLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <li key={link.path} onMouseEnter={closeMegaHover}>
                  <Link
                    to={link.path}
                    className={"site-nav__link" + (active && !megaOpen ? " is-active" : "")}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => handleAnchor(e, link.path)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="site-nav__end">
          <Link to="/Contact" className="nav-cta" onMouseEnter={closeMegaHover}>
            <span>Book a Consultation</span>
            <span className="nav-cta__icon" aria-hidden>
              <LuArrowUpRight />
            </span>
          </Link>
          <button
            ref={burgerRef}
            type="button"
            className="site-nav__burger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={MOBILE_ID}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </div>

      <div onMouseEnter={openMegaHover}>
        <MegaMenu
          id={MEGA_ID}
          open={megaOpen}
          activePath={location.pathname}
          onNavigate={closeAll}
        />
      </div>
      <div
        className={"site-nav__backdrop" + (megaOpen ? " is-open" : "")}
        onClick={() => setMegaOpen(false)}
        onMouseEnter={closeMegaHover}
        aria-hidden
      />

      {/* ---- mobile overlay ---- */}
      <div
        id={MOBILE_ID}
        className={"mobile-nav" + (mobileOpen ? " is-open" : "")}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <nav className="container mobile-nav__inner" aria-label="Mobile">
          <ul className="mobile-nav__list">
            <li className="mobile-nav__item">
              <span className="index-num">01</span>
              <span className="mobile-nav__label">Services</span>
            </li>
            {serviceGroups.map((group) => {
              const expanded = openGroup === group.id;
              const panelId = `mnav-${group.id}`;
              return (
                <li className="mobile-nav__group" key={group.id}>
                  <button
                    type="button"
                    className="mobile-nav__toggle"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpenGroup(expanded ? null : group.id)}
                  >
                    {group.title}
                    <LuPlus
                      className={"mobile-nav__plus" + (expanded ? " is-open" : "")}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={panelId}
                    className={"mobile-nav__panel" + (expanded ? " is-open" : "")}
                  >
                    <ul>
                      {group.links.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className={isActive(link.path) ? "is-active" : undefined}
                            onClick={closeAll}
                            tabIndex={expanded ? undefined : -1}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
            {primaryLinks.map((link, i) => (
              <li className="mobile-nav__item" key={link.path}>
                <span className="index-num">{String(i + 2).padStart(2, "0")}</span>
                <Link
                  to={link.path}
                  className={
                    "mobile-nav__label" + (isActive(link.path) ? " is-active" : "")
                  }
                  onClick={(e) => {
                    handleAnchor(e, link.path);
                    closeAll();
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-nav__foot">
            <Link to="/Contact" className="btn btn--light" onClick={closeAll}>
              Book a Consultation <LuArrowUpRight aria-hidden />
            </Link>
            <div className="mobile-nav__contact">
              <a href={`tel:+91${contactDetails.phones[0]}`}>
                +91 {contactDetails.phones[0]}
              </a>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
