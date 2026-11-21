import { useState, type ChangeEvent, type FormEvent } from "react";
import { push, ref, serverTimestamp } from "firebase/database";
import toast from "react-hot-toast";
import { LuArrowRight, LuMail, LuPhone } from "react-icons/lu";
import { database } from "src/Config/Firebase-config";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "@Styles/Contact.css";

// Contact details mirror the ones listed in Footer.tsx.
const PHONES = ["9781905936", "9814747478"];
const EMAIL = "hardeep.creation@gmail.com";

const SERVICES = [
  "Residential interiors",
  "Pooja room",
  "Home theater",
  "Residential exterior",
  "Commercial interiors",
  "Commercial exterior",
  "Terrace garden",
  "2D / 3D planning",
  "Something else",
];

type Fields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", phone: "", email: "", service: "", message: "" };

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name.";
  const digits = f.phone.replace(/[^\d]/g, "");
  if (digits.length < 10 || digits.length > 13)
    errors.phone = "Enter a valid phone number (10 digits).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!f.service) errors.service = "Choose the service you're interested in.";
  if (f.message.length > 1500) errors.message = "Please keep it under 1500 characters.";
  return errors;
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Fields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      toast.error("Please check the highlighted fields.");
      return;
    }

    const [fname, ...rest] = fields.name.trim().split(/\s+/);
    setSubmitting(true);
    try {
      // Same Realtime Database node + field names the admin ContactForm reads.
      await push(ref(database, "contactForm"), {
        fname,
        lname: rest.join(" "),
        phnumber: fields.phone.trim(),
        email: fields.email.trim(),
        service: fields.service,
        message: fields.message.trim(),
        createdAt: serverTimestamp(),
      });
      toast.success("Thank you — we'll be in touch shortly.");
      setFields(EMPTY);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldProps = (name: keyof Fields) => ({
    id: `contact-${name}`,
    name,
    value: fields[name],
    onChange,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const errorFor = (name: keyof Fields) =>
    errors[name] ? (
      <span className="field__error" id={`contact-${name}-error`} role="alert">
        {errors[name]}
      </span>
    ) : null;

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <div className="contact-split">
          <aside className="contact-panel section--dark">
            <div className="contact-panel__inner">
              <span className="eyebrow">Contact</span>
              <h1 className="h1 contact-panel__title">
                Let's talk about your space.
              </h1>
              <p className="lead">
                Tell us about your home, office or site. We'll call you back to
                talk through ideas, timelines and the next steps.
              </p>

              <dl className="contact-details">
                <div className="contact-details__row">
                  <dt className="index-num">01 / Call</dt>
                  <dd>
                    {PHONES.map((p) => (
                      <a key={p} href={`tel:+91${p}`} className="contact-link">
                        <LuPhone aria-hidden /> +91 {p.slice(0, 5)} {p.slice(5)}
                      </a>
                    ))}
                  </dd>
                </div>
                <div className="contact-details__row">
                  <dt className="index-num">02 / Write</dt>
                  <dd>
                    <a href={`mailto:${EMAIL}`} className="contact-link">
                      <LuMail aria-hidden /> {EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <section className="contact-form-wrap" aria-labelledby="contact-form-title">
            <div className="contact-form-wrap__head">
              <span className="eyebrow">Enquiry</span>
              <h2 className="h3" id="contact-form-title">
                Start a project
              </h2>
            </div>

            <form className="contact-form-new" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="contact-name" className="field__label">
                  Full name
                </label>
                <input
                  {...fieldProps("name")}
                  type="text"
                  autoComplete="name"
                  className="field__control"
                  placeholder="Your name"
                />
                {errorFor("name")}
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="contact-phone" className="field__label">
                    Phone
                  </label>
                  <input
                    {...fieldProps("phone")}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className="field__control"
                    placeholder="98xxx xxxxx"
                  />
                  {errorFor("phone")}
                </div>
                <div className="field">
                  <label htmlFor="contact-email" className="field__label">
                    Email
                  </label>
                  <input
                    {...fieldProps("email")}
                    type="email"
                    autoComplete="email"
                    className="field__control"
                    placeholder="you@example.com"
                  />
                  {errorFor("email")}
                </div>
              </div>

              <div className="field">
                <label htmlFor="contact-service" className="field__label">
                  Service
                </label>
                <select
                  {...fieldProps("service")}
                  className={`field__control field__control--select${
                    fields.service ? "" : " is-empty"
                  }`}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errorFor("service")}
              </div>

              <div className="field">
                <label htmlFor="contact-message" className="field__label">
                  Message <span className="muted">(optional)</span>
                </label>
                <textarea
                  {...fieldProps("message")}
                  rows={4}
                  className="field__control field__control--area"
                  placeholder="Rooms, size, location, budget — anything that helps."
                />
                {errorFor("message")}
              </div>

              <div className="contact-form-new__foot">
                <p className="muted contact-form-new__note">
                  All fields except the message are required.
                </p>
                <button
                  type="submit"
                  className="btn btn--dark"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? "Sending…" : "Send enquiry"}
                  <LuArrowRight aria-hidden />
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
