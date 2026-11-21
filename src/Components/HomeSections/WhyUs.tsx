import type { IconType } from "react-icons";
import {
  LuLightbulb,
  LuUsers,
  LuRuler,
  LuScanSearch,
  LuShapes,
  LuHandshake,
} from "react-icons/lu";
import { whyChooseUs } from "@Data/LightBoxDataHome";

const icons: IconType[] = [
  LuLightbulb,
  LuUsers,
  LuRuler,
  LuScanSearch,
  LuShapes,
  LuHandshake,
];

export default function WhyUs() {
  return (
    <section id="why-us" className="hm-why section section--dark" aria-labelledby="hm-why-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 id="hm-why-title" className="h1">
              Why choose us
            </h2>
          </div>
          <p className="lead">
            Creativity, craft and a process built around you, from the first
            sketch to the final fitting.
          </p>
        </div>

        <ol className="hm-why__grid">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[i];
            return (
              <li className="hm-why__item" key={item.heading} data-aos="fade-up">
                <div className="hm-why__meta">
                  <Icon size={22} strokeWidth={1.25} aria-hidden="true" />
                </div>
                <h3 className="h3">{item.heading}</h3>
                <p className="hm-why__text">{item.content}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
