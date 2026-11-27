import { describe, it, expect, beforeEach, vi } from 'vitest';
import { safeSetStorage, safeGetStorage } from '../utils/storage';

describe('SafeStorage Utilities', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('stores and retrieves serialized data accurately', () => {
    const payload = { room: 'Nursery', aqi: 15, alertsEnabled: true };
    const success = safeSetStorage('test_settings', payload);
    expect(success).toBe(true);

    const retrieved = safeGetStorage('test_settings', {});
    expect(retrieved).toEqual(payload);
  });

  it('returns fallback when key does not exist', () => {
    const fallback = { default: true };
    const result = safeGetStorage('non_existent_key', fallback);
    expect(result).toBe(fallback);
  });

  it('returns fallback when stored JSON is corrupted', () => {
    window.localStorage.setItem('corrupted_key', '{bad json');
    const fallback = { recovered: true };
    const result = safeGetStorage('corrupted_key', fallback);
    expect(result).toBe(fallback);
  });

  it('enforces type match against fallback', () => {
    window.localStorage.setItem('mismatched_key', JSON.stringify('a string'));
    const fallbackArray = [1, 2, 3];
    const result = safeGetStorage('mismatched_key', fallbackArray);
    expect(result).toBe(fallbackArray);
  });

  it('handles localStorage throw exceptions gracefully', () => {
    const setSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    const success = safeSetStorage('fail_key', 'data');
    expect(success).toBe(false);

    setSpy.mockRestore();
  });
});
