// Shared helpers for the Vercel functions in /api.
// Files starting with "_" are not exposed as routes.
import { createHash } from "node:crypto";

const env = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing server env var ${name}`);
  return v;
};

export const cloudinaryEnv = () => ({
  cloudName: env("VITE_CLOUDINARY_CLOUD_NAME"),
  apiKey: env("VITE_CLOUDINARY_API_KEY"),
  apiSecret: env("CLOUDINARY_API_SECRET"),
});

/** Cloudinary signature: sha1 of the sorted "key=value&…" string followed by the API secret. */
export function sign(params: Record<string, string | number>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(toSign + apiSecret).digest("hex");
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

/**
 * Checks the Firebase ID token sent by the admin page and returns the user's email.
 * Uses Firebase Auth's REST lookup, so no service-account key is needed.
 * If ADMIN_EMAILS is set (comma-separated), the email must be in that list.
 */
export async function requireAdmin(req: Request): Promise<string> {
  const header = req.headers.get("authorization") ?? "";
  const idToken = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!idToken) throw new HttpError(401, "Not signed in");

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env("VITE_FIREBASE_API_KEY")}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
    }
  );
  if (!res.ok) throw new HttpError(401, "Session expired, please sign in again");
  const data = (await res.json()) as { users?: { email?: string }[] };
  const email = data.users?.[0]?.email?.toLowerCase();
  if (!email) throw new HttpError(401, "Not signed in");

  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length && !allowed.includes(email)) throw new HttpError(403, "Not an admin");
  return email;
}

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const handleError = (e: unknown) =>
  e instanceof HttpError
    ? json({ error: e.message }, e.status)
    : json({ error: e instanceof Error ? e.message : "Server error" }, 500);
