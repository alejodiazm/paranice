import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const publicDir = path.join(root, "public");

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(path.join(dist, "assets"), { recursive: true });

try {
  await fs.cp(publicDir, dist, { recursive: true });
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

await fs.cp(path.join(root, "src", "styles.css"), path.join(dist, "assets", "styles.css"));
await fs.cp(path.join(root, "src", "app.js"), path.join(dist, "assets", "app.js"));
await fs.cp(path.join(root, "index.html"), path.join(dist, "index.html"));

console.log(`Built ${path.relative(root, dist)} as a static Vercel site.`);
