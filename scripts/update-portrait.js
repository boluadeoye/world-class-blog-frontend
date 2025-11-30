const fs = require('fs');
const path = process.argv[2];
const url  = process.argv[3];
if (!path || !url) { console.error('Usage: node scripts/update-portrait.js <file> <url>'); process.exit(1); }
let s = fs.readFileSync(path, 'utf8');
let changed = false;

// Replace only <img>/<Image> tags likely used for the nav avatar (rounded-full / avatar / portrait)
function patchTags(src) {
  // generic replacer inside a tag string
  const repSrc = (tag) => {
    if (!/(rounded-full|avatar|portrait)/i.test(tag)) return tag;
    let t = tag;
    t = t.replace(/src\s*=\s*"(.*?)"/i,  `src="${url}"`);
    t = t.replace(/src\s*=\s*'(.*?)'/i,  `src='${url}'`);
    t = t.replace(/src\s*=\s*\{\s*"(.*?)"\s*\}/i,  `src={"${url}"}`);
    t = t.replace(/src\s*=\s*\{\s*'(.*?)'\s*\}/i,  `src={'${url}'}`);
    return t;
  };

  // img tags
  src = src.replace(/<img[^>]*>/gi, (m) => {
    const t = repSrc(m);
    if (t !== m) changed = true;
    return t;
  });
  // Next/Image (self-closing or not)
  src = src.replace(/<Image[^>]*\/?>/gi, (m) => {
    const t = repSrc(m);
    if (t !== m) changed = true;
    return t;
  });

  return src;
}

s = patchTags(s);
if (!changed) console.warn('WARN: No avatar src replaced. Header might already use the new URL or a different pattern.');
fs.writeFileSync(path, s, 'utf8');
console.log('Updated:', path);
