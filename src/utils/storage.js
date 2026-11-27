/**
 * Resilient, secure LocalStorage wrapper for AeroShield AI.
 * Handles private browsing storage restrictions, quota exhaustion, and schema validation.
 */

/**
 * Safely writes an item to localStorage with error handling.
 * @param {string} key 
 * @param {any} value 
 * @returns {boolean} - True if successfully stored
 */
export function safeSetStorage(key, value) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (err) {
    console.warn(`SafeStorage: Failed to write key "${key}":`, err);
    return false;
  }
}

/**
 * Safely reads an item from localStorage with type/schema fallback.
 * @param {string} key 
 * @param {any} fallback 
 * @returns {any}
 */
export function safeGetStorage(key, fallback) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const item = window.localStorage.getItem(key);
    if (item === null || item === undefined) return fallback;
    
    const parsed = JSON.parse(item);
    
    // Type check matching fallback type if fallback is provided
    if (fallback !== null && fallback !== undefined) {
      if (typeof parsed !== typeof fallback) {
        return fallback;
      }
      if (Array.isArray(fallback) && !Array.isArray(parsed)) {
        return fallback;
      }
    }
    
    return parsed;
  } catch (err) {
    console.warn(`SafeStorage: Failed to parse key "${key}":`, err);
    return fallback;
  }
}
