// Projects live in the Realtime Database at /projects/{id}.
// Images are stored on Cloudinary; the database only keeps their ids/urls.
import { onValue, push, ref, remove, set } from "firebase/database";
import { database } from "src/Config/Firebase-config";
import type { UploadedImage } from "./cloudinary";

export const CATEGORIES = ["Residential", "Commercial", "Exterior"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Project {
  id: string;
  title: string;
  category: Category;
  /** publicId of the cover image; falls back to the first image. */
  cover?: string;
  images: UploadedImage[];
  createdAt: number;
  updatedAt: number;
}

export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;

export const coverOf = (p: Pick<Project, "cover" | "images">): UploadedImage | undefined =>
  p.images.find((i) => i.publicId === p.cover) ?? p.images[0];

/** Live list of projects, newest first. Returns an unsubscribe function. */
export function subscribeProjects(
  onData: (projects: Project[]) => void,
  onError?: (e: Error) => void
) {
  return onValue(
    ref(database, "projects"),
    (snap) => {
      const val = (snap.val() ?? {}) as Record<string, Omit<Project, "id">>;
      const list = Object.entries(val)
        .map(([id, p]) => ({ ...p, id, images: p.images ?? [] }))
        .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      onData(list);
    },
    onError
  );
}

/** Create (no id) or update (with id) a project. Empty optional fields are dropped. */
export async function saveProject(input: ProjectInput, existing?: Project) {
  const now = Date.now();
  const clean = Object.fromEntries(
    Object.entries(input).filter(([, v]) => v !== "" && v !== undefined)
  ) as ProjectInput;
  const record = {
    ...clean,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  if (existing) {
    await set(ref(database, `projects/${existing.id}`), record);
    return existing.id;
  }
  const r = push(ref(database, "projects"));
  await set(r, record);
  return r.key!;
}

export const deleteProjectRecord = (id: string) => remove(ref(database, `projects/${id}`));
