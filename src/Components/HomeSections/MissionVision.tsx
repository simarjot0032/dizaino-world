import { LuArrowRight } from "react-icons/lu";
import cardImg from "@Assets/generated/home-mission.jpg";

export default function MissionVision() {
  const scrollToWhy = () => {
    document
      .getElementById("why-us")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="about" className="hm-about section section--paper" aria-labelledby="hm-about-title">
      <div className="container">
        <div className="hm-about__top">
          <span className="eyebrow">About us</span>
          <span className="index-num">12+ years in practice</span>
        </div>

        <h2 id="hm-about-title" className="visually-hidden">
          About Dizaino World
        </h2>

        <div className="hm-about__grid">
          <div className="hm-about__words" data-aos="fade-up">
            <p className="hm-about__word">
              Mission
            </p>
            <figure className="hm-about__card">
              <img
                src={cardImg}
                alt="Sunlight falling across a curved limestone wall under a timber ceiling"
                className="img-cover"
                loading="lazy"
              />
            </figure>
            <p className="hm-about__word hm-about__word--ghost">
              Vision
            </p>
          </div>

          <div className="hm-about__copy" data-aos="fade-up">
            <p className="hm-about__lead">
              Welcome to Dizaino World, where artistry meets functionality and
              spaces become living masterpieces.
            </p>
            <p className="lead">
              We are dedicated to redefining interior and exterior design,
              bringing innovation, elegance and a touch of individuality to
              every project.
            </p>
            <p className="lead">
              With a passionate team of seasoned designers, architects and
              craftsmen, we curate spaces that not only reflect our clients'
              visions but exceed their expectations.
            </p>
            <button type="button" className="hm-pill-arrow" onClick={scrollToWhy}>
              <span>More about us</span>
              <span className="hm-pill-arrow__sq" aria-hidden="true">
                <LuArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
