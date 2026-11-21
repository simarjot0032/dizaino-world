import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import ctaImg from "@Assets/generated/home-cta.jpg";

export default function CtaBand() {
  return (
    <section className="hm-cta on-image" aria-labelledby="hm-cta-title">
      <img
        src={ctaImg}
        alt=""
        className="img-cover hm-cta__img"
        loading="lazy"
      />
      <div className="hm-cta__scrim" aria-hidden="true" />
      <div className="container hm-cta__inner" data-aos="fade-up">
        <span className="eyebrow">Start a project</span>
        <h2 id="hm-cta-title" className="display hm-cta__title">
          Let's design <br />
          what's next
        </h2>
        <div className="hm-cta__row">
          <p className="hm-cta__text">
            Tell us about your space. We'll walk you through ideas, budget and
            timeline in a first consultation.
          </p>
          <Link to="/Contact" className="btn btn--light">
            Book a Consultation <LuArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
