const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 4173);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

http.createServer((req, res) => {
  const rawPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const routePath = rawPath === "/" ? "/index.html" : rawPath;
  let filePath = path.resolve(root, "." + routePath);

  if (!filePath.toLowerCase().startsWith(root.toLowerCase())) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statErr, stat) => {
    if (!statErr && stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.statusCode = 404;
        res.end("Not Found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.setHeader("Content-Type", mime[ext] || "application/octet-stream");
      res.statusCode = 200;
      res.end(data);
    });
  });
}).listen(port, host, () => {
  console.log("Static server running at http://" + host + ":" + port);
});

