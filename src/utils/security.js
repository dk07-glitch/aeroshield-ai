/**
 * Security utilities for AeroShield AI / SaafSaans
 * Provides strict input sanitization, safe bounds clamping, and XSS defense.
 */

const HTML_ENTITY_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;'
};

/**
 * Escapes special HTML characters to prevent XSS injection.
 * @param {string} str - Raw input string
 * @returns {string} - Escaped string
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`/]/g, (match) => HTML_ENTITY_MAP[match] || match);
}

/**
 * Strips script tags, unsafe protocols (javascript:, data:text/html), and inline event handlers.
 * @param {string} input - Untrusted text input
 * @param {number} [maxLength=500] - Maximum allowable character length
 * @returns {string} - Clean, truncated string
 */
export function sanitizeInput(input, maxLength = 500) {
  if (!input || typeof input !== 'string') return '';
  
  // Trim and clamp length
  let clean = input.trim().slice(0, maxLength);

  // Remove control characters (except newline and tab)
  clean = clean.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Strip javascript: pseudo-protocols
  clean = clean.replace(/javascript\s*:/gi, '');

  // Strip vbscript: pseudo-protocols
  clean = clean.replace(/vbscript\s*:/gi, '');

  // Strip data: text/html protocols
  clean = clean.replace(/data\s*:\s*text\/html/gi, '');

  // Strip <script> and dangerous tags
  clean = clean.replace(/<\s*\/?\s*(script|iframe|embed|object|link|style)[^>]*>/gi, '');

  // Strip inline event attributes like onclick=, onerror=
  clean = clean.replace(/\bon\w+\s*=\s*(['"]).*?\1/gi, '');
  clean = clean.replace(/\bon\w+\s*=\s*[^>\s]+/gi, '');

  return clean;
}

/**
 * Clamps numeric values strictly between min and max bounds to prevent NaN and calculation exploits.
 * @param {number|string} val - Input number or string representation
 * @param {number} min - Lower bound
 * @param {number} max - Upper bound
 * @param {number} defaultVal - Fallback if input is NaN
 * @returns {number}
 */
export function clampNumber(val, min, max, defaultVal) {
  const parsed = Number(val);
  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
    return defaultVal;
  }
  return Math.max(min, Math.min(max, parsed));
}
