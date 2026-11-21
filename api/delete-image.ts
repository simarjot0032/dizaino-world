// POST /api/delete-image  { publicId: string }
// Deletes an uploaded image from Cloudinary. Admin only.
import { cloudinaryEnv, handleError, json, requireAdmin, sign } from "./_shared.js";

export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const { publicId } = (await req.json().catch(() => ({}))) as { publicId?: string };
    // Only allow deleting the site's own uploads.
    if (!publicId || !publicId.startsWith("dizaino/")) {
      return json({ error: "Invalid image id" }, 400);
    }

    const { cloudName, apiKey, apiSecret } = cloudinaryEnv();
    const timestamp = Math.round(Date.now() / 1000);
    const signature = sign({ public_id: publicId, timestamp }, apiSecret);

    const body = new URLSearchParams({
      public_id: publicId,
      timestamp: String(timestamp),
      api_key: apiKey,
      signature,
    });
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { result?: string; error?: { message: string } };
    if (!res.ok || data.error) return json({ error: data.error?.message ?? "Delete failed" }, 502);
    // "not found" is fine: the image is already gone.
    return json({ result: data.result });
  } catch (e) {
    return handleError(e);
  }
}
