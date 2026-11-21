import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { LuArrowUpRight } from "react-icons/lu";
import { auth } from "src/Config/Firebase-config";
import AdminNavbar, { AdminHeader } from "./AdminSidebar";

const QUICK_LINKS = [
  { to: "/admin/enquiries", label: "Review enquiries" },
  { to: "/admin/projects", label: "Upload project images" },
  { to: "/admin/password", label: "Change password" },
];

export default function AdminHome() {
  const useremailfull = localStorage.getItem("username");
  const useremailarray = useremailfull?.split("@");
  const username = useremailarray ? useremailarray[0] : "";
  const navigate = useNavigate();
  const HandleLogOut = () => {
    signOut(auth);
    navigate("/admin");
    toast.success("Logged Out");
  };
  return (
    <div className="adm-shell">
      <AdminNavbar activeclass="AdminHome" />
      <main className="adm-main">
        <AdminHeader
          eyebrow="Dashboard"
          title={
            <>
              Welcome back{username ? ", " : " "}
              {username ? `${username}.` : "admin."}
            </>
          }
          onLogout={HandleLogOut}
        />

        <section className="adm-card">
          <div className="adm-card__head">
            <h2 className="adm-card__title">Account</h2>
            <span className="index-num">Dizaino World</span>
          </div>
          <dl className="adm-kv">
            <div>
              <dt>Signed in as</dt>
              <dd>{username || "—"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{useremailfull || auth.currentUser?.email || "—"}</dd>
            </div>
          </dl>
        </section>

        <nav className="adm-tiles" aria-label="Quick actions">
          {QUICK_LINKS.map((link, i) => (
            <Link to={link.to} className="adm-tile" key={link.to}>
              <span className="adm-tile__top">
                <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                <LuArrowUpRight aria-hidden />
              </span>
              <span className="adm-tile__label">{link.label}</span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
