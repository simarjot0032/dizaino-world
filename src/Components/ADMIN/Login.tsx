import "@Styles/Admin/Admin.css";
import "@Styles/Admin/Login.css";
import { useRef, useState, type FormEvent } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "src/Config/Firebase-config";
import { Link } from "react-router-dom";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { LogoMark } from "@Components/Logo";
import toast from "react-hot-toast";

export default function Login() {
  const [forget, setforget] = useState(false);
  const [busy, setBusy] = useState(false);
  const Handleforgetform = () => {
    setforget(!forget);
  };
  const emailin = useRef<HTMLInputElement>(null);
  const passwordin = useRef<HTMLInputElement>(null);
  const Forgetemailref = useRef<HTMLInputElement>(null);


  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailin.current?.value ?? "";
    const password = passwordin.current?.value ?? "";
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error(error);
      toast.error("Email and password do not match");
    } finally {
      setBusy(false);
    }
  };

  const HandleForgetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = Forgetemailref.current?.value ?? "";
    try {
      if (
        email == "simarjot0032@gmail.com" ||
        email == "hardeep.creation@gmail.com"
      ) {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset email sent successfully");
      } else {
        toast.error("Email address not found. Please try a different email.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Email address not found. Please try a different email.");
    }
  };


  return (
    <main className="adm-login">
      <div className="adm-login__card">
        <div className="adm-login__brand">
          <LogoMark size={32} />
          <span>Dizaino World</span>
        </div>

        {!forget ? (
          <>
            <div className="adm-login__head">
              <span className="eyebrow">Admin</span>
              <h1 className="adm-title">
                Sign in
              </h1>
            </div>
            <form className="adm-form" onSubmit={HandleSubmit}>
              <div className="adm-field">
                <label htmlFor="admin-email" className="adm-label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  name="admin-email"
                  id="admin-email"
                  autoComplete="email"
                  className="adm-input"
                  ref={emailin}
                  required
                />
              </div>
              <div className="adm-field">
                <label htmlFor="admin-password" className="adm-label">
                  Password
                </label>
                <input
                  type="password"
                  id="admin-password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="adm-input"
                  ref={passwordin}
                  required
                />
              </div>
              <div className="adm-login__actions">
                <button
                  type="submit"
                  className="btn btn--dark"
                  disabled={busy}
                  aria-busy={busy}
                >
                  {busy ? "Signing in…" : "Log in"} <LuArrowRight aria-hidden />
                </button>
                <button
                  type="button"
                  className="adm-login__link"
                  onClick={Handleforgetform}
                >
                  Forgot password?
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="adm-login__head">
              <span className="eyebrow">Admin</span>
              <h1 className="adm-title">
                Reset password
              </h1>
              <p className="muted">We'll email you a link to set a new one.</p>
            </div>
            <form className="adm-form" onSubmit={HandleForgetPassword}>
              <div className="adm-field">
                <label htmlFor="forget-email" className="adm-label">
                  Email
                </label>
                <input
                  type="email"
                  id="forget-email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="adm-input"
                  ref={Forgetemailref}
                  required
                />
              </div>
              <div className="adm-login__actions">
                <button type="submit" className="btn btn--dark">
                  Send reset link
                </button>
                <button
                  type="button"
                  className="adm-login__link"
                  onClick={Handleforgetform}
                >
                  Back to login
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <Link to="/" className="adm-login__back">
        <LuArrowLeft aria-hidden /> Back to Dizaino World
      </Link>
    </main>
  );
}
