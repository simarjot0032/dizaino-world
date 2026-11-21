import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import "@Styles/Dropdown.css";
import { serviceGroups } from "@Data/Naviagation";

interface MegaMenuProps {
  id: string;
  open: boolean;
  activePath: string;
  onNavigate: () => void;
}

/* Desktop "Services" mega-menu: a full-width bone panel that drops below the
   nav bar, with one hairline-separated column per service group. */
export default function MegaMenu({
  id,
  open,
  activePath,
  onNavigate,
}: MegaMenuProps) {
  return (
    <div
      id={id}
      className={"megamenu" + (open ? " is-open" : "")}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="container megamenu__inner">
        <div className="megamenu__intro">
          <span className="eyebrow">Services</span>
          <p className="megamenu__title">
            Our services
          </p>
          <p className="megamenu__lead">
            Interiors, exteriors and planning, designed and delivered by one
            studio.
          </p>
          <Link to="/Projects" className="megamenu__more" onClick={onNavigate}>
            See our projects <LuArrowUpRight aria-hidden />
          </Link>
        </div>

        {serviceGroups.map((group, gi) => (
          <div
            className={
              "megamenu__col" + (group.links.length > 5 ? " megamenu__col--split" : "")
            }
            key={group.id}
          >
            <div className="megamenu__thumb">
              <img
                src={group.image}
                alt={group.imageAlt}
                loading="lazy"
                className="img-cover"
              />
            </div>
            <span className="index-num">{String(gi + 1).padStart(2, "0")}</span>
            <h3 className="megamenu__group">{group.title}</h3>
            <p className="megamenu__blurb">{group.blurb}</p>
            <ul className="megamenu__links">
              {group.links.map((link) => {
                const active =
                  activePath.toLowerCase() === link.path.toLowerCase();
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={onNavigate}
                      className={"megamenu__link" + (active ? " is-active" : "")}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
