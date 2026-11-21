import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "src/Config/Firebase-config";
import Login from "./Login";

/**
 * Gate for every /admin page: signed in -> the page, signed out -> the login
 * form on the same URL. After a successful login the page appears in place.
 */
export default function RequireAdmin({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) {
    // Firebase is still restoring the session; avoid flashing the login form.
    return <main className="adm-login" aria-busy="true" />;
  }
  return user ? <>{children}</> : <Login />;
}
