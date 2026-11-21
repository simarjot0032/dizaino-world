// Client-side Cloudinary helpers. Uploads are SIGNED: the signature comes from
// /api/sign-upload (a Vercel function holding the API secret), and only a
// signed-in admin can get one.
import { auth } from "src/Config/Firebase-config";

export interface UploadedImage {
  publicId: string;
  url: string;
  width: number;
  height: number;
}

async function adminFetch<T>(path: string, body: unknown): Promise<T> {
  const user = auth.currentUser;
  if (!user) throw new Error("Please sign in again.");
  const token = await user.getIdToken();
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
  return data as T;
}

/** Upload one image with a signed request. `onProgress` gets 0–1. */
export async function uploadImage(
  file: File,
  opts: { folder?: string; onProgress?: (p: number) => void } = {}
): Promise<UploadedImage> {
  const s = await adminFetch<{
    cloudName: string;
    apiKey: string;
    folder: string;
    timestamp: number;
    signature: string;
  }>("/api/sign-upload", { folder: opts.folder ?? "dizaino/projects" });

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", s.apiKey);
  form.append("timestamp", String(s.timestamp));
  form.append("folder", s.folder);
  form.append("signature", s.signature);

  // XHR (not fetch) so we can report upload progress.
  const data = await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${s.cloudName}/image/upload`);
    xhr.upload.onprogress = (e) => e.lengthComputable && opts.onProgress?.(e.loaded / e.total);
    xhr.onload = () => {
      const body = JSON.parse(xhr.responseText || "{}");
      xhr.status < 300 ? resolve(body) : reject(new Error(body.error?.message ?? "Upload failed"));
    };
    xhr.onerror = () => reject(new Error("Network error while uploading"));
    xhr.send(form);
  });

  return {
    publicId: data.public_id,
    url: data.secure_url,
    width: data.width,
    height: data.height,
  };
}

/** Permanently delete an uploaded image from Cloudinary. */
export function deleteImage(publicId: string) {
  return adminFetch<{ result: string }>("/api/delete-image", { publicId });
}

/**
 * Delivery URL with automatic format/quality and an optional width,
 * so the public site never downloads full-size originals.
 */
export function cldUrl(publicId: string, width?: number): string {
  const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const t = ["f_auto", "q_auto", width ? `c_limit,w_${width}` : ""].filter(Boolean).join(",");
  return `https://res.cloudinary.com/${cloud}/image/upload/${t}/${publicId}`;
}
