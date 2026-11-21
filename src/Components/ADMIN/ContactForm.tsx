import { useEffect, useState } from "react";
import AdminSidebar, { AdminHeader } from "@Components/ADMIN/AdminSidebar";
import { DataSnapshot, get, ref } from "firebase/database";
import { auth, database } from "src/Config/Firebase-config";
import "@Styles/Admin/ContactForm.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { LuInbox } from "react-icons/lu";

interface Contact {
  id: string;
  fname: string;
  lname: string;
  email: string;
  phnumber: string;
  service?: string;
  message?: string;
  createdAt?: number;
}

const formatDate = (ts?: number) =>
  typeof ts === "number"
    ? new Date(ts).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

export default function ContactForm() {
  const [Contact, setContact] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = ref(database, "contactForm");
    get(collectionRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const entries = Object.entries(snapshot.val()).map(([id, data]) => ({
            ...(data as Contact),
            id,
          }));
          // newest first (push keys are chronological)
          setContact(entries.reverse());
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <div className="adm-shell">
      <AdminSidebar activeclass="AdminContact" />
      <main className="adm-main">
        <AdminHeader
          eyebrow="Inbox"
          title={
            <>
              Contact enquiries
            </>
          }
          onLogout={HandleLogOut}
        />
        <section className="adm-card">
          <div className="adm-card__head">
            <h2 className="adm-card__title">All submissions</h2>
            <span className="index-num">
              {loading ? "Loading…" : `${String(Contact.length).padStart(2, "0")} total`}
            </span>
          </div>

          {!loading && Contact.length === 0 ? (
            <div className="adm-empty">
              <LuInbox aria-hidden />
              <p>No enquiries yet.</p>
            </div>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Service</th>
                    <th scope="col">Message</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Contact.map((contact, index) => (
                    <tr key={contact.id}>
                      <td className="index-num">
                        {String(Contact.length - index).padStart(2, "0")}
                      </td>
                      <td>{contact.fname}</td>
                      <td>{contact.lname}</td>
                      <td>
                        {contact.email ? (
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>
                        {contact.phnumber ? (
                          <a href={`tel:${contact.phnumber}`}>{contact.phnumber}</a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>{contact.service || "—"}</td>
                      <td className="adm-msg">{contact.message || "—"}</td>
                      <td>{formatDate(contact.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
