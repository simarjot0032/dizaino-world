import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Values come from .env (see .env.example).
const env = import.meta.env;

/** True once the Firebase values in .env are filled in. */
export const firebaseConfigured = Boolean(
  env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID
);

if (!firebaseConfigured) {
  console.warn(
    "[Dizaino World] Firebase is not configured. Fill in the VITE_FIREBASE_* values in .env " +
      "(see .env.example). The site still renders, but the contact form, projects and admin won't work."
  );
}

// Without real values Firebase throws during start-up (e.g. auth/invalid-api-key),
// which would blank the whole site. Placeholders let the app render; any Firebase
// call then fails at request time and the pages show their error states instead.
const firebaseConfig = firebaseConfigured
  ? {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      databaseURL:
        env.VITE_FIREBASE_DATABASE_URL ||
        `https://${env.VITE_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      appId: env.VITE_FIREBASE_APP_ID,
    }
  : {
      apiKey: "not-configured",
      authDomain: "not-configured.firebaseapp.com",
      databaseURL: "https://not-configured-default-rtdb.firebaseio.com",
      projectId: "not-configured",
      appId: "not-configured",
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export { app, auth, database };
