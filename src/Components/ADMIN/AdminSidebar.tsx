import "@Styles/Admin/Admin.css";
import "@Styles/Admin/AdminSidebar.css";
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuImage,
  LuInbox,
  LuKeyRound,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuX,
} from "react-icons/lu";
import { LogoMark } from "@Components/Logo";

interface Props {
  activeclass?: string;
}

const LINKS: { to: string; key: string; label: string; icon: IconType }[] = [
  { to: "/admin", key: "AdminHome", label: "Dashboard", icon: LuLayoutDashboard },
  { to: "/admin/enquiries", key: "AdminContact", label: "Enquiries", icon: LuInbox },
  { to: "/admin/projects", key: "AdminProject", label: "Projects", icon: LuImage },
  { to: "/admin/password", key: "AdminChange", label: "Change password", icon: LuKeyRound },
];

export default function AdminNavbar({ activeclass }: Props) {
  const [mobilemenu, setmobilemenu] = useState(false);

  return (
    <aside className="adm-sidebar">
      <div className="adm-sidebar__bar">
        <Link to="/admin" className="adm-brand">
          <LogoMark size={32} />
          <span className="adm-brand__name">
            <strong>Dizaino World</strong>
            <span>Admin</span>
          </span>
        </Link>
        <button
          type="button"
          className="icon-btn adm-sidebar__toggle"
          onClick={() => setmobilemenu((open) => !open)}
          aria-expanded={mobilemenu}
          aria-controls="adm-nav"
          aria-label={mobilemenu ? "Close menu" : "Open menu"}
        >
          {mobilemenu ? <LuX aria-hidden /> : <LuMenu aria-hidden />}
        </button>
      </div>

      <nav
        id="adm-nav"
        className={mobilemenu ? "adm-nav is-open" : "adm-nav"}
        aria-label="Admin"
      >
        <span className="adm-nav__label">Menu</span>
        <ul className="adm-nav__list">
          {LINKS.map(({ to, key, label, icon: Icon }, i) => (
            <li key={key}>
              <Link
                to={to}
                className="adm-nav__link"
                aria-current={activeclass === key ? "page" : undefined}
                onClick={() => setmobilemenu(false)}
              >
                <Icon aria-hidden />
                {label}
                <span className="adm-nav__num">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="adm-nav__site">
          <Link to="/" className="btn btn--glass btn--sm">
            View website <LuArrowUpRight aria-hidden />
          </Link>
        </div>
      </nav>
    </aside>
  );
}

/** Page header used across admin screens: eyebrow + title + logout pill. */
export function AdminHeader({
  eyebrow,
  title,
  onLogout,
}: {
  eyebrow: string;
  title: ReactNode;
  onLogout: () => void;
}) {
  return (
    <header className="adm-header">
      <div className="adm-header__titles">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="adm-title">{title}</h1>
      </div>
      <button type="button" className="btn btn--outline btn--sm" onClick={onLogout}>
        <LuLogOut aria-hidden /> Log out
      </button>
    </header>
  );
}
