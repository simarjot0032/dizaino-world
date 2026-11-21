import AdminSidebar, { AdminHeader } from "@Components/ADMIN/AdminSidebar";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "@Styles/Admin/ChangePassword.css";
import { onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import { auth } from "src/Config/Firebase-config";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const passwordref = useRef<HTMLInputElement>(null);
  const passwordconfirmref = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      if (!data) navigate("/admin");
    });
    return unsubscribe;
  }, [navigate]);

  const HandleLogOut = () => {
    signOut(auth);
    toast.success("User Logged Out");
  };

  const HandleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const useremail = auth.currentUser;
    if (!useremail) return;
    const password = passwordref.current?.value ?? "";
    const confirmedpassword = passwordconfirmref.current?.value ?? "";
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmedpassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSaving(true);
    try {
      await updatePassword(useremail, password);
      signOut(auth);
      toast.success("Password updated. Please log in again");
    } catch (err) {
      console.log(err);
      toast.error("Couldn't update password. Log in again and retry");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adm-shell">
      <AdminSidebar activeclass="AdminChange" />
      <main className="adm-main">
        <AdminHeader
          eyebrow="Security"
          title={
            <>
              Change password
            </>
          }
          onLogout={HandleLogOut}
        />
        <section className="adm-card adm-card--narrow">
          <form className="adm-form" onSubmit={HandleChangePassword}>
            <div className="adm-field">
              <label htmlFor="new" className="adm-label">
                New password
              </label>
              <input
                type="password"
                id="new"
                ref={passwordref}
                className="adm-input"
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>
            <div className="adm-field">
              <label htmlFor="confirm" className="adm-label">
                Confirm password
              </label>
              <input
                type="password"
                id="confirm"
                ref={passwordconfirmref}
                className="adm-input"
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn--dark"
              disabled={saving}
              aria-busy={saving}
            >
              {saving ? "Updating…" : "Update password"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
