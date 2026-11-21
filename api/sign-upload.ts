// POST /api/sign-upload  { folder?: string }
// Returns the parameters the admin page needs for a signed Cloudinary upload.
// The API secret never leaves the server.
import { cloudinaryEnv, handleError, json, requireAdmin, sign } from "./_shared.js";

const ALLOWED_FOLDERS = /^dizaino(\/[a-z0-9-]+)*$/;

export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const { folder = "dizaino/projects" } = (await req.json().catch(() => ({}))) as {
      folder?: string;
    };
    if (!ALLOWED_FOLDERS.test(folder)) return json({ error: "Invalid folder" }, 400);

    const { cloudName, apiKey, apiSecret } = cloudinaryEnv();
    const timestamp = Math.round(Date.now() / 1000);
    const signature = sign({ folder, timestamp }, apiSecret);
    return json({ cloudName, apiKey, folder, timestamp, signature });
  } catch (e) {
    return handleError(e);
  }
}
