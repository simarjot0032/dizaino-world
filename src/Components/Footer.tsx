import { LogoMark } from "@Components/Logo";
import { Link } from "react-router-dom";
import "@Styles/Footer.css";
import { contactDetails, primaryLinks, serviceGroups } from "@Data/Naviagation";

// A short, hand-picked list rather than every route.
const popularServices = [
  "/Bedroom",
  "/Kitchen",
  "/Living-area",
  "/Pooja-Room",
  "/Residential-Exterior",
  "/CommercialInterior",
];
const serviceLinks = serviceGroups
  .flatMap((g) => g.links)
  .filter((l) => popularServices.includes(l.path));

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            <LogoMark size={28} />
            Dizaino World
          </Link>
          <p>
            Interior and exterior design for homes and businesses. From the
            first drawing to the final fitting.
          </p>
        </div>

        <div>
          <h3 className="site-footer__label">Services</h3>
          <ul>
            {serviceLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="site-footer__label">Company</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {primaryLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="site-footer__label">Contact</h3>
          <ul>
            {contactDetails.phones.map((p) => (
              <li key={p}>
                <a href={`tel:+91${p}`}>+91 {p}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {year} Dizaino World. All rights reserved.</p>
      </div>
    </footer>
  );
}
