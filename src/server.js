const http = require("node:http");
const { URL } = require("node:url");

const BACKENDS = (process.env.BACKENDS || "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

function pickBackend() {
  if (BACKENDS.length === 0) {
    throw new Error("BACKENDS is not configured");
  }
  return BACKENDS[Math.floor(Math.random() * BACKENDS.length)];
}

function proxy(req, res) {
  let backend;
  try {
    backend = pickBackend();
  } catch {
    res.writeHead(503, { "content-type": "text/plain; charset=utf-8" });
    res.end("No backend configured");
    return;
  }

  const incoming = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const target = new URL(`https://${backend}${incoming.pathname}${incoming.search}`);

  const headers = { ...req.headers };
  delete headers.host;

  const upstream = require("node:https").request(
    target,
    {
      method: req.method,
      headers,
    },
    (upstreamRes) => {
      res.writeHead(upstreamRes.statusCode || 502, upstreamRes.headers);
      upstreamRes.pipe(res);
    }
  );

  upstream.on("error", (err) => {
    if (!res.headersSent) {
      res.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
    }
    res.end(`Upstream error: ${err.message}`);
  });

  req.pipe(upstream);
}

const port = Number(process.env.PORT || 8080);
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  proxy(req, res);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Hostless server listening on 0.0.0.0:${port}`);
});
