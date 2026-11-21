import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "@Styles/Admin/Admin.css";
import "@Styles/Admin/Login.css";
import { useRef, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import toast from "react-hot-toast";
import { LogoMark } from "@Components/Logo";

export default function ResetPass() {
  const auth = getAuth();
  const Forgetemailref = useRef<HTMLInputElement>(null);
  const HandleForgetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = Forgetemailref.current?.value ?? "";
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully");
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
        <div className="adm-login__head">
          <span className="eyebrow">Admin</span>
          <h1 className="adm-title">
            Reset password
          </h1>
        </div>
        <form className="adm-form" onSubmit={HandleForgetPassword}>
          <div className="adm-field">
            <label htmlFor="reset-email" className="adm-label">
              Email
            </label>
            <input
              type="email"
              id="reset-email"
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
          </div>
        </form>
      </div>
      <Link to="/admin" className="adm-login__back">
        <LuArrowLeft aria-hidden /> Back to login
      </Link>
    </main>
  );
}
