import AdminSidebar, { AdminHeader } from "@Components/ADMIN/AdminSidebar";
import "@Styles/Admin/AdminProjectUpload.css";
import { signOut } from "firebase/auth";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  LuImageOff,
  LuPencil,
  LuPlus,
  LuStar,
  LuTrash2,
  LuUpload,
  LuX,
} from "react-icons/lu";
import toast from "react-hot-toast";
import { auth } from "src/Config/Firebase-config";
import { cldUrl, deleteImage, uploadImage, type UploadedImage } from "src/lib/cloudinary";
import {
  CATEGORIES,
  coverOf,
  deleteProjectRecord,
  saveProject,
  subscribeProjects,
  type Category,
  type Project,
} from "src/lib/projects";

const MAX_FILE_MB = 15;

export default function AdminProjectUpload() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | "new" | null>(null);

  useEffect(
    () =>
      subscribeProjects(
        (list) => {
          setProjects(list);
          setLoading(false);
        },
        (e) => {
          console.error(e);
          toast.error("Couldn't load projects");
          setLoading(false);
        }
      ),
    []
  );

  const handleDelete = async (p: Project) => {
    if (!window.confirm(`Delete "${p.title}" and its ${p.images.length} image(s)? This can't be undone.`)) return;
    try {
      await deleteProjectRecord(p.id);
      const results = await Promise.allSettled(p.images.map((i) => deleteImage(i.publicId)));
      const failed = results.filter((r) => r.status === "rejected").length;
      if (failed) toast(`Project deleted. ${failed} image(s) couldn't be removed from Cloudinary.`);
      else toast.success("Project deleted");
    } catch (e) {
      console.error(e);
      toast.error("Couldn't delete the project");
    }
  };

  return (
    <div className="adm-shell">
      <AdminSidebar activeclass="AdminProject" />
      <main className="adm-main">
        <AdminHeader eyebrow="Projects" title="Projects" onLogout={() => signOut(auth)} />

        {editing ? (
          <ProjectEditor
            project={editing === "new" ? undefined : editing}
            onDone={() => setEditing(null)}
          />
        ) : (
          <section className="adm-card">
            <div className="adm-card__head">
              <h2 className="adm-card__title">
                {loading ? "Loading…" : `${projects.length} project${projects.length === 1 ? "" : "s"}`}
              </h2>
              <div className="adm-editor__actions">
                <button type="button" className="btn btn--dark btn--sm" onClick={() => setEditing("new")}>
                  <LuPlus aria-hidden /> New project
                </button>
              </div>
            </div>

            {!loading && projects.length === 0 ? (
              <div className="adm-empty">
                <LuImageOff aria-hidden />
                <p>No projects yet. Add your first one.</p>
              </div>
            ) : (
              <ul className="adm-plist">
                {projects.map((p) => {
                  const cover = coverOf(p);
                  return (
                    <li className="adm-pcard" key={p.id}>
                      <div className="adm-pcard__img">
                        {cover ? (
                          <img src={cldUrl(cover.publicId, 480)} alt="" loading="lazy" />
                        ) : (
                          <LuImageOff aria-hidden />
                        )}
                      </div>
                      <div className="adm-pcard__body">
                        <strong>{p.title}</strong>
                        <span className="muted">
                          {p.category} ·{" "}
                          {p.images.length} image{p.images.length === 1 ? "" : "s"}
                        </span>
                      </div>
                      <div className="adm-pcard__actions">
                        <button type="button" className="btn btn--outline btn--sm" onClick={() => setEditing(p)}>
                          <LuPencil aria-hidden /> Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn--outline btn--sm adm-danger"
                          onClick={() => handleDelete(p)}
                          aria-label={`Delete ${p.title}`}
                        >
                          <LuTrash2 aria-hidden />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

interface Pending {
  key: string;
  name: string;
  progress: number;
}

function ProjectEditor({ project, onDone }: { project?: Project; onDone: () => void }) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [category, setCategory] = useState<Category>(project?.category ?? "Residential");
  const [images, setImages] = useState<UploadedImage[]>(project?.images ?? []);
  const [cover, setCover] = useState(project?.cover ?? "");
  const [pending, setPending] = useState<Pending[]>([]);
  const [saving, setSaving] = useState(false);

  // Images uploaded in this session (deleted again if the edit is cancelled)
  // and saved images the admin removed (deleted from Cloudinary on save).
  const uploadedNow = useRef<string[]>([]);
  const removedSaved = useRef<string[]>([]);

  const uploading = pending.length > 0;

  const onFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        continue;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        toast.error(`${file.name} is larger than ${MAX_FILE_MB} MB`);
        continue;
      }
      const key = `${file.name}-${file.size}-${Math.random()}`;
      setPending((p) => [...p, { key, name: file.name, progress: 0 }]);
      try {
        const img = await uploadImage(file, {
          onProgress: (progress) =>
            setPending((p) => p.map((x) => (x.key === key ? { ...x, progress } : x))),
        });
        uploadedNow.current.push(img.publicId);
        setImages((list) => [...list, img]);
      } catch (err) {
        console.error(err);
        toast.error(`${file.name}: ${err instanceof Error ? err.message : "upload failed"}`);
      } finally {
        setPending((p) => p.filter((x) => x.key !== key));
      }
    }
  };

  const removeImage = (img: UploadedImage) => {
    setImages((list) => list.filter((i) => i.publicId !== img.publicId));
    if (cover === img.publicId) setCover("");
    if (uploadedNow.current.includes(img.publicId)) {
      uploadedNow.current = uploadedNow.current.filter((id) => id !== img.publicId);
      deleteImage(img.publicId).catch(console.error);
    } else {
      removedSaved.current.push(img.publicId);
    }
  };

  const cancel = () => {
    const dirty = uploadedNow.current.length > 0 || removedSaved.current.length > 0;
    if (dirty && !window.confirm("Discard your changes?")) return;
    uploadedNow.current.forEach((id) => deleteImage(id).catch(console.error));
    onDone();
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Add a title");
    if (images.length === 0) return toast.error("Add at least one image");
    setSaving(true);
    try {
      await saveProject(
        {
          title: title.trim(),
          category,
          cover: cover || images[0].publicId,
          images,
        },
        project
      );
      removedSaved.current.forEach((id) => deleteImage(id).catch(console.error));
      toast.success(project ? "Project updated" : "Project published");
      onDone();
    } catch (err) {
      console.error(err);
      toast.error("Couldn't save. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const activeCover = cover || images[0]?.publicId;

  return (
    <section className="adm-card">
      <div className="adm-card__head">
        <h2 className="adm-card__title">{project ? `Edit "${project.title}"` : "New project"}</h2>
        <button type="button" className="icon-btn" onClick={cancel} aria-label="Close">
          <LuX aria-hidden />
        </button>
      </div>

      <form className="adm-form adm-editor" onSubmit={submit}>
        <div className="adm-editor__fields">
          <label className="adm-field adm-editor__wide">
            <span className="adm-label">Title</span>
            <input className="adm-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Sharma residence, Ludhiana" required />
          </label>
          <label className="adm-field">
            <span className="adm-label">Category</span>
            <select className="adm-input" value={category} onChange={(e) => setCategory(e.target.value as Category)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="adm-field">
          <span className="adm-label">Images</span>
          <label className="adm-file">
            <LuUpload aria-hidden />
            <span>Click to add images</span>
            <span className="adm-file__name">JPG, PNG or WEBP · up to {MAX_FILE_MB} MB each · select several at once</span>
            <input type="file" accept="image/*" multiple onChange={onFiles} />
          </label>
        </div>

        {pending.length > 0 && (
          <ul className="adm-uploads" aria-live="polite">
            {pending.map((p) => (
              <li key={p.key}>
                <span>{p.name}</span>
                <progress max={1} value={p.progress} />
              </li>
            ))}
          </ul>
        )}

        {images.length > 0 && (
          <>
            <p className="muted adm-editor__hint">Click the star to choose the cover image.</p>
            <ul className="adm-thumbs">
              {images.map((img) => {
                const isCover = img.publicId === activeCover;
                return (
                  <li key={img.publicId} className={isCover ? "is-cover" : undefined}>
                    <img src={cldUrl(img.publicId, 360)} alt="" />
                    <button
                      type="button"
                      className="adm-thumbs__star"
                      onClick={() => setCover(img.publicId)}
                      aria-pressed={isCover}
                      aria-label={isCover ? "Cover image" : "Make cover image"}
                    >
                      <LuStar aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="adm-thumbs__remove"
                      onClick={() => removeImage(img)}
                      aria-label="Remove image"
                    >
                      <LuX aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <div className="adm-editor__actions">
          <button type="submit" className="btn btn--dark" disabled={saving || uploading} aria-busy={saving}>
            {saving ? "Saving…" : uploading ? "Waiting for uploads…" : project ? "Save changes" : "Publish project"}
          </button>
          <button type="button" className="btn btn--outline" onClick={cancel} disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
