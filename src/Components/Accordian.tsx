import { useId, useState } from "react";
import "@Styles/Accordian.css";

export interface QuestionAnswer {
  question: string;
  answer: string;
}

interface Props {
  objectforquestionandanswer: QuestionAnswer;
  /** Open on first render. */
  defaultOpen?: boolean;
}

/** Hairline FAQ row with a +/− toggle and an animated height. */
export default function Accordian({ objectforquestionandanswer, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const btnId = `${id}-q`;
  const panelId = `${id}-a`;

  return (
    <div className={`acc${open ? " is-open" : ""}`}>
      <h3 className="acc__heading">
        <button
          type="button"
          id={btnId}
          className="acc__btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="acc__q">{objectforquestionandanswer.question}</span>
          <span className="acc__icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="acc__panel"
        inert={!open}
      >
        <div className="acc__inner">
          <p className="acc__a">{objectforquestionandanswer.answer.trim()}</p>
        </div>
      </div>
    </div>
  );
}
