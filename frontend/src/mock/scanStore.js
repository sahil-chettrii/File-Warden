// MOCK ONLY. Replaced in the backend phase by POST /api/scans and GET /api/scans/:id.
// Nothing is uploaded and no file is read. The verdict comes from the file/link NAME.

const KEY = "filewarden:mock-scans";
const SANITIZABLE = ["pdf", "doc", "docx", "docm", "xls", "xlsx", "xlsm", "png", "jpg", "jpeg"];
const memory = new Map(); // fallback if sessionStorage is blocked

function readAll() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function writeAll(all) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable, memory fallback is used */
  }
}

function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  return Math.abs(h);
}

const extOf = (name) => (name.toLowerCase().match(/\.([a-z0-9]+)$/) || [])[1] || "";

function mockVerdict(type, name) {
  const n = name.toLowerCase();
  if (type === "url") {
    if (/(malware|phish|eicar)/.test(n)) return "malicious";
    if (/(login|verify|free|update)/.test(n)) return "suspicious";
    return "clean";
  }
  const ext = extOf(n);
  if (/(eicar|virus|malware|trojan|ransom)/.test(n) || ["exe", "scr", "bat", "msi", "dll"].includes(ext)) {
    return "malicious";
  }
  if (/(macro|suspicious)/.test(n) || ["docm", "xlsm", "js", "vbs", "jar"].includes(ext)) {
    return "suspicious";
  }
  return "clean";
}

function mockScore(verdict, seed) {
  const [min, max] = { clean: [3, 18], suspicious: [35, 65], malicious: [82, 98] }[verdict];
  return min + (seed % (max - min + 1));
}

const newId = () =>
  crypto.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export function createScan({ type, name, size = 0 }) {
  const verdict = mockVerdict(type, name);
  const scan = {
    id: newId(),
    type, // "file" | "url"
    name, // file name or full URL
    size,
    verdict,
    score: mockScore(verdict, hash(name)),
    sanitizable: type === "file" && SANITIZABLE.includes(extOf(name)),
    createdAt: new Date().toISOString(),
  };
  memory.set(scan.id, scan);
  const all = readAll();
  all[scan.id] = scan;
  writeAll(all);
  return scan;
}

export function getScan(id) {
  return memory.get(id) ?? readAll()[id] ?? null;
}