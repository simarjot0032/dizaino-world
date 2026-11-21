import { Link } from "react-router-dom";
import Accordian from "@Components/Accordian";
import { HomeAccordianData } from "@Data/Home";

export default function Faq() {
  return (
    <section className="hm-faq section section--paper" aria-labelledby="hm-faq-title">
      <div className="container hm-faq__grid">
        <div className="hm-faq__head">
          <h2 id="hm-faq-title" className="h2">
            Frequently asked questions
          </h2>
          <p className="lead">
            Still curious? We're happy to talk it through over a first
            consultation.
          </p>
          <Link to="/Contact" className="btn btn--outline btn--sm">
            Ask us anything
          </Link>
        </div>
        <div className="hm-faq__list">
          {HomeAccordianData.map((item) => (
            <Accordian
              key={item.question}
              objectforquestionandanswer={{
                question: item.question.endsWith("?")
                  ? item.question
                  : `${item.question}?`,
                answer: item.answer,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
