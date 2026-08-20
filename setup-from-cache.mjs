import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const contentDir = path.join(process.env.HOME, '.npm/_cacache/content-v2/sha512');
const indexDir = path.join(process.env.HOME, '.npm/_cacache/index-v5');
const nodeModulesDir = path.join(process.cwd(), 'node_modules');
const binDir = path.join(nodeModulesDir, '.bin');
const tarballsDir = path.join(process.cwd(), 'tarballs');

fs.mkdirSync(tarballsDir, { recursive: true });
fs.mkdirSync(nodeModulesDir, { recursive: true });
fs.mkdirSync(binDir, { recursive: true });

// Scan index
const map = {};
function scanIndex(dir) {
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) scanIndex(p);
    else {
      const data = fs.readFileSync(p, 'utf8');
      const lines = data.split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        const tabIdx = line.indexOf('\t');
        if (tabIdx > 0) {
          try {
            const obj = JSON.parse(line.slice(tabIdx + 1));
            if (obj.key && obj.integrity) {
              map[obj.key] = obj.integrity;
            }
          } catch (e) {}
        }
      }
    }
  }
}
scanIndex(indexDir);

const tarballKeys = Object.keys(map).filter(k => k.endsWith('.tgz'));
console.log(`Found ${tarballKeys.length} tarballs in cache.`);

let extractedCount = 0;

for (const key of tarballKeys) {
  // Extract package name from URL
  // e.g. "make-fetch-happen:request-cache:https://registry.npmjs.org/@gsap/react/-/react-2.1.2.tgz"
  const cleanUrl = key.replace(/^.*https:\/\/registry\.npmjs\.org\//, '');
  const integrity = map[key];
  const b64 = integrity.replace(/^sha512-/, '');
  const hex = Buffer.from(b64, 'base64').toString('hex');
  const blobPath = path.join(contentDir, hex.slice(0, 2), hex.slice(2, 4), hex.slice(4));

  if (!fs.existsSync(blobPath)) {
    console.warn(`Blob not found for: ${key}`);
    continue;
  }

  // Determine package directory name
  // If cleanUrl is "@scope/name/-/name-1.0.0.tgz" -> "@scope/name"
  // If cleanUrl is "name/-/name-1.0.0.tgz" -> "name"
  let pkgName = '';
  if (cleanUrl.startsWith('@')) {
    const parts = cleanUrl.split('/-/')[0];
    pkgName = parts;
  } else {
    pkgName = cleanUrl.split('/-/')[0];
  }

  const pkgDest = path.join(nodeModulesDir, pkgName);
  fs.mkdirSync(pkgDest, { recursive: true });

  // Save tgz file
  const tgzName = path.basename(cleanUrl);
  const tgzDest = path.join(tarballsDir, tgzName);
  fs.copyFileSync(blobPath, tgzDest);

  // Extract using tar -xzf --strip-components=1
  try {
    execSync(`tar -xzf "${blobPath}" -C "${pkgDest}" --strip-components=1 2>/dev/null`);
    extractedCount++;
  } catch (err) {
    // some tarballs might have different layout
    try {
      execSync(`tar -xzf "${blobPath}" -C "${pkgDest}" 2>/dev/null`);
      extractedCount++;
    } catch (e2) {
      console.error(`Failed to extract ${pkgName}:`, e2.message);
    }
  }

  // Check for bin in package.json
  const pkgJsonPath = path.join(pkgDest, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      if (pkgJson.bin) {
        if (typeof pkgJson.bin === 'string') {
          const binName = pkgJson.name.split('/').pop();
          const targetBin = path.join(pkgDest, pkgJson.bin);
          const linkBin = path.join(binDir, binName);
          if (fs.existsSync(targetBin)) {
            try {
              if (fs.existsSync(linkBin)) fs.unlinkSync(linkBin);
              fs.chmodSync(targetBin, 0o755);
              fs.symlinkSync(targetBin, linkBin);
            } catch (e) {}
          }
        } else if (typeof pkgJson.bin === 'object') {
          for (const [binName, relPath] of Object.entries(pkgJson.bin)) {
            const targetBin = path.join(pkgDest, relPath);
            const linkBin = path.join(binDir, binName);
            if (fs.existsSync(targetBin)) {
              try {
                if (fs.existsSync(linkBin)) fs.unlinkSync(linkBin);
                fs.chmodSync(targetBin, 0o755);
                fs.symlinkSync(targetBin, linkBin);
              } catch (e) {}
            }
          }
        }
      }
    } catch (e) {}
  }
}

console.log(`Successfully extracted ${extractedCount} packages and configured .bin binaries.`);
