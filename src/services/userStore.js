/**
 * Per-user storage for CyberWatch X.
 *
 * Every student gets an isolated record, identified by a SHA-256 hash of the
 * normalized e-mail. The e-mail itself is never persisted. Progress and issued
 * certificates are saved in the browser's localStorage.
 *
 * Limits of this approach (no backend):
 *  - Data lives only in the browser/device where it was created.
 *  - Name + e-mail are not secrets, so this isolates accounts from each other
 *    but is not authentication. For real multi-device accounts, certificate
 *    validation and anti-impersonation, use a backend (e.g. Supabase, Firebase
 *    or Node + SQLite/PostgreSQL) and replace this module.
 */

const USERS_KEY = "cyberwatch:v4:users";
const CERTIFICATES_KEY = "cyberwatch:v4:certificates";

const ID_PEPPER = "cyberwatch-x:v4:";
const TOTAL_MODULES = 8;
const COURSE_TITLE = "FUNDAMENTOS DE CIBERSEGURANÇA";
const ISSUER = "CYBERWATCH X ACADEMY";
const CERTIFICATE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/* Keys written by earlier versions. They stored the e-mail in plain text. */
const LEGACY_PROFILE_KEY = "cyberwatch_user";
const LEGACY_GLOBAL_PROGRESS_KEY = "cyberwatch_completed_modules";
const LEGACY_PROGRESS_PREFIX = "cyberwatch_completed_modules:v3:";

const memoryFallback = new Map();

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return memoryFallback.has(key) ? memoryFallback.get(key) : fallback;
    return JSON.parse(raw);
  } catch {
    return memoryFallback.has(key) ? memoryFallback.get(key) : fallback;
  }
}

function writeJson(key, value) {
  memoryFallback.set(key, value);
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage blocked or full: data stays in memory for this session only. */
  }
}

function removeKey(key) {
  memoryFallback.delete(key);
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Normalization                                                       */
/* ------------------------------------------------------------------ */

export function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

export function cleanDisplayName(name) {
  return String(name ?? "").replace(/\s+/g, " ").trim().slice(0, 80);
}

/** Case/accent/spacing-insensitive form used to compare names. */
export function normalizeName(name) {
  return cleanDisplayName(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeModules(list) {
  if (!Array.isArray(list)) return [];

  return [
    ...new Set(
      list
        .map(Number)
        .filter((id) => Number.isInteger(id) && id >= 1 && id <= TOTAL_MODULES),
    ),
  ].sort((a, b) => a - b);
}

/* ------------------------------------------------------------------ */
/* Hashing                                                             */
/* ------------------------------------------------------------------ */

function fallbackHash(text) {
  // Non-cryptographic (cyrb53). Only used when Web Crypto is unavailable,
  // e.g. when the page is opened over plain http on a non-local address.
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;

  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    h1 = Math.imul(h1 ^ code, 2654435761);
    h2 = Math.imul(h2 ^ code, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  const value = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return `f${value.toString(16).padStart(14, "0")}`;
}

async function hashIdentity(email) {
  const text = `${ID_PEPPER}${normalizeEmail(email)}`;

  if (globalThis.crypto?.subtle) {
    const bytes = new TextEncoder().encode(text);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);

    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  return fallbackHash(text);
}

/* ------------------------------------------------------------------ */
/* Legacy cleanup                                                      */
/* ------------------------------------------------------------------ */

/**
 * Removes keys from older versions that kept the e-mail in plain text and
 * shared progress between every person using the same browser.
 */
export function purgeLegacyData() {
  removeKey(LEGACY_PROFILE_KEY);
  removeKey(LEGACY_GLOBAL_PROGRESS_KEY);
}

function takeLegacyProgress(email) {
  const key = `${LEGACY_PROGRESS_PREFIX}${encodeURIComponent(normalizeEmail(email))}`;
  const legacy = readJson(key, null);

  if (legacy === null) return [];

  removeKey(key);
  return sanitizeModules(legacy);
}

/* ------------------------------------------------------------------ */
/* Users                                                               */
/* ------------------------------------------------------------------ */

function readUsers() {
  const users = readJson(USERS_KEY, {});
  return users && typeof users === "object" && !Array.isArray(users) ? users : {};
}

/**
 * Signs a student in, creating the record on first access.
 *
 * Returns { ok: true, user } or { ok: false, error } where error is one of
 * "required", "invalid_email" or "name_mismatch" (the e-mail already belongs
 * to a student registered with a different name).
 */
export async function loginUser({ name, email }) {
  const displayName = cleanDisplayName(name);
  const cleanEmail = normalizeEmail(email);

  if (!displayName || !cleanEmail) return { ok: false, error: "required" };
  if (!isValidEmail(cleanEmail)) return { ok: false, error: "invalid_email" };

  const id = await hashIdentity(cleanEmail);
  const users = readUsers();
  const existing = users[id];

  if (existing && existing.nameKey !== normalizeName(displayName)) {
    return { ok: false, error: "name_mismatch" };
  }

  const migrated = takeLegacyProgress(cleanEmail);

  const record = existing
    ? {
        ...existing,
        completedModules: sanitizeModules([...existing.completedModules, ...migrated]),
      }
    : {
        id,
        name: displayName,
        nameKey: normalizeName(displayName),
        createdAt: new Date().toISOString(),
        completedModules: migrated,
        certificateId: null,
      };

  users[id] = record;
  writeJson(USERS_KEY, users);

  return {
    ok: true,
    user: {
      id: record.id,
      name: record.name,
      isNew: !existing,
      completedModules: record.completedModules,
    },
  };
}

export function getCompletedModules(userId) {
  const record = readUsers()[userId];
  return record ? sanitizeModules(record.completedModules) : [];
}

/** Saves a finished module for this student only. Returns the updated list. */
export function saveCompletedModule(userId, moduleId) {
  const users = readUsers();
  const record = users[userId];

  if (!record) return [];

  const completedModules = sanitizeModules([...record.completedModules, Number(moduleId)]);

  users[userId] = { ...record, completedModules };
  writeJson(USERS_KEY, users);

  return completedModules;
}

/* ------------------------------------------------------------------ */
/* Certificates                                                        */
/* ------------------------------------------------------------------ */

function randomCode(length) {
  const values = new Uint32Array(length);

  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(values);
  } else {
    for (let index = 0; index < length; index += 1) {
      values[index] = Math.floor(Math.random() * 4294967296);
    }
  }

  return Array.from(values, (value) => CERTIFICATE_ALPHABET[value % CERTIFICATE_ALPHABET.length]).join("");
}

function readCertificates() {
  const registry = readJson(CERTIFICATES_KEY, {});
  return registry && typeof registry === "object" && !Array.isArray(registry) ? registry : {};
}

/**
 * Issues (or returns the already issued) certificate for a student.
 * Only available once every module was completed.
 */
export function issueCertificate(userId) {
  const users = readUsers();
  const record = users[userId];

  if (!record) return { ok: false, error: "unknown_user" };

  if (sanitizeModules(record.completedModules).length < TOTAL_MODULES) {
    return { ok: false, error: "course_incomplete" };
  }

  const registry = readCertificates();

  if (record.certificateId && registry[record.certificateId]) {
    return { ok: true, certificate: registry[record.certificateId] };
  }

  let id;
  do {
    id = `CWX-${randomCode(8)}`;
  } while (registry[id]);

  const certificate = {
    id,
    holder: record.name,
    course: COURSE_TITLE,
    issuedAt: new Date().toISOString(),
    issuer: ISSUER,
    status: "VALIDO",
  };

  registry[id] = certificate;
  writeJson(CERTIFICATES_KEY, registry);
  users[userId] = { ...record, certificateId: id };
  writeJson(USERS_KEY, users);

  return { ok: true, certificate };
}

/** Looks a certificate up by ID among those issued in this browser. */
export function lookupIssuedCertificate(certificateId) {
  const id = String(certificateId ?? "").trim().toUpperCase();
  return id ? readCertificates()[id] ?? null : null;
}

export const COURSE_MODULE_COUNT = TOTAL_MODULES;
