import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const port = Number(process.env.PORT || 5173);

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
  [".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  [".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]
]);

async function sendFile(response, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const body = await fs.readFile(filePath);
  response.writeHead(200, {
    "content-type": mime.get(ext) || "application/octet-stream",
    "cache-control": ext === ".html" ? "no-store" : "public, max-age=3600"
  });
  response.end(body);
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    const safePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    const requestedPath = path.normalize(path.join(dist, safePath));
    const insideDist = requestedPath.startsWith(dist);
    const target = insideDist && safePath ? requestedPath : path.join(dist, "index.html");
    const stat = await fs.stat(target).catch(() => null);
    if (stat?.isFile()) {
      await sendFile(response, target);
      return;
    }
    await sendFile(response, path.join(dist, "index.html"));
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Server error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Paranice IT Command available at http://localhost:${port}`);
});
