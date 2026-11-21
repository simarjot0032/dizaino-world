import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "@Styles/Undercons.css";

interface Props {
  word?: string;
  eyebrow?: string;
  message?: string;
}

/** Minimal bone status page. Also used by NotFound with different copy. */
export default function UnderCons({
  word = "Soon",
  eyebrow = "In progress",
  message = "This page is still on the drawing board. Check back shortly.",
}: Props) {
  return (
    <>
      <Navbar />
      <main className="status-page">
        <div className="container status-page__inner">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mega status-page__word">{word}</h1>
          <hr className="hairline status-page__rule" />
          <div className="status-page__foot">
            <p className="lead">{message}</p>
            <Link to="/" className="btn btn--dark">
              <LuArrowLeft aria-hidden /> Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
