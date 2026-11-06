// Builds a static copy of the site for Apache shared hosting (o2switch) and zips it.
// Usage: node scripts/build-o2switch.mjs [subfolder]   default subfolder: /velora-kitchen
// Use "/" to build for the root of a domain.
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const arg = process.argv[2] ?? "/velora-kitchen";
const basePath = arg === "/" ? "" : `/${arg.replace(/^\/+|\/+$/g, "")}`;
const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const outDir = join(root, "out");
const zipName = "velora-kitchen-o2switch.zip";

console.log(`Building static site for subfolder "${basePath || "/"}"...`);
const build = spawnSync("npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: { ...process.env, STATIC_EXPORT: "1", STATIC_BASE_PATH: basePath },
});
if (build.status !== 0) process.exit(build.status ?? 1);

// Next 16 writes some prefetch files as "__next.menu/__PAGE__.txt" but the browser
// requests "__next.menu.__PAGE__.txt". Add flat copies so these requests do not 404.
function flattenSegmentFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (!entry.isDirectory() || entry.name === "_next") continue;
    if (entry.name.startsWith("__next.")) {
      const copyFlat = (sub, prefix) => {
        for (const child of readdirSync(sub, { withFileTypes: true })) {
          const name = `${prefix}.${child.name}`;
          if (child.isDirectory()) copyFlat(join(sub, child.name), name);
          else if (!existsSync(join(dir, name))) copyFileSync(join(sub, child.name), join(dir, name));
        }
      };
      copyFlat(full, entry.name);
    } else {
      flattenSegmentFiles(full);
    }
  }
}
flattenSegmentFiles(outDir);

const htaccess = `# Velora Kitchen - Apache settings for a static Next.js export (o2switch)
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 ${basePath}/404.html

# Send visitors to HTTPS. Remove these 4 lines only if the domain has no SSL certificate yet.
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Strict-Transport-Security "max-age=31536000" env=HTTPS

  # Hashed build files never change: cache for a year. HTML is always re-checked.
  <If "%{REQUEST_URI} =~ m#/_next/static/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </If>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json application/xml image/svg+xml
</IfModule>
`;
writeFileSync(join(outDir, ".htaccess"), htaccess);

const zipPath = join(root, zipName);
if (existsSync(zipPath)) rmSync(zipPath);
const entries = readdirSync(outDir);
const zip = spawnSync("tar", ["-a", "-c", "-f", zipPath, "-C", outDir, ...entries], { stdio: "inherit" });
if (zip.status !== 0) process.exit(zip.status ?? 1);

console.log(`\nDone: ${zipName}`);
console.log(`Upload and extract it inside the "${basePath.slice(1) || "public_html"}" folder on the server.`);
