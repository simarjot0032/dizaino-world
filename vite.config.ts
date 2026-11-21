import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Dev only: serve the Vercel functions in /api from `npm run dev`, so signed
 * Cloudinary uploads work locally without `vercel dev`. On Vercel the same
 * files run as real serverless functions; this plugin is not used there.
 */
function devApi(): Plugin {
  return {
    name: "dev-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();
        const name = req.url.slice("/api/".length).split("?")[0];
        if (!/^[a-z0-9-]+$/.test(name) || !existsSync(resolve(server.config.root, `api/${name}.ts`))) {
          res.statusCode = 404;
          return res.end();
        }
        try {
          const mod = await server.ssrLoadModule(`/api/${name}.ts`);
          const handler = mod[req.method ?? "GET"];
          if (typeof handler !== "function") {
            res.statusCode = 405;
            return res.end();
          }
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const headers = new Headers();
          for (const [k, v] of Object.entries(req.headers)) {
            if (typeof v === "string") headers.set(k, v);
            else if (Array.isArray(v)) headers.set(k, v.join(", "));
          }
          const hasBody = req.method !== "GET" && req.method !== "HEAD" && chunks.length > 0;
          const response: Response = await handler(
            new Request(`http://localhost${req.url}`, {
              method: req.method,
              headers,
              body: hasBody ? Buffer.concat(chunks) : undefined,
            })
          );
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (e) {
          if (e instanceof Error) server.ssrFixStacktrace(e);
          console.error(e);
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ error: e instanceof Error ? e.message : "Server error" }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Make server-only values (e.g. CLOUDINARY_API_SECRET) visible to the dev
  // /api handlers. Only VITE_* values ever reach the browser bundle.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), devApi()],
    resolve: { tsconfigPaths: true },
    build: {
      chunkSizeWarningLimit: 8000,
    },
  };
});
