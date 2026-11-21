import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import heroImg from "@Assets/generated/home-hero.jpg";
export default function Hero() {
  return (
    <section className="hm-hero on-image" aria-labelledby="hm-hero-title">
      <img
        src={heroImg}
        alt="Contemporary villa at dusk with teak screens, glowing glass walls and lit stone steps"
        className="hm-hero__img img-cover"
        fetchPriority="high"
      />
      <div className="hm-hero__scrim" aria-hidden="true" />

      <div className="hm-hero__inner container">
        <h1 id="hm-hero-title" className="hm-hero__title">
          <span className="hm-hero__word hm-hero__word--a">Your space,</span>
          <span className="hm-hero__word hm-hero__word--b">your story</span>
        </h1>

        <div className="hm-hero__foot">
          <p className="hm-hero__lede">
            Let Dizaino World write the perfect chapter in design: homes,
            exteriors and commercial spaces, planned in 2D and 3D and built to
            last.
          </p>
          <div className="hm-hero__actions">
            <Link to="/Contact" className="btn btn--light">
              Book a Consultation
            </Link>
            <Link to="/Projects" className="btn btn--glass">
              View projects <LuArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
