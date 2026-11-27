import { describe, it, expect } from 'vitest';
import { sanitizeInput, escapeHtml, clampNumber } from '../utils/security';

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('strips script tags from input', () => {
      const malicious = 'Hello <script>alert("XSS")</script> World';
      expect(sanitizeInput(malicious)).toBe('Hello alert("XSS") World');
    });

    it('strips inline event handlers', () => {
      const malicious = '<img src="x" onerror="alert(1)">';
      expect(sanitizeInput(malicious)).not.toContain('onerror');
    });

    it('strips javascript: pseudo-protocols', () => {
      const malicious = 'Click here: javascript:alert(1)';
      expect(sanitizeInput(malicious)).not.toContain('javascript:');
    });

    it('clamps input to maxLength', () => {
      const longString = 'a'.repeat(200);
      expect(sanitizeInput(longString, 50).length).toBe(50);
    });

    it('handles non-string and falsy inputs safely', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(12345)).toBe('');
    });
  });

  describe('escapeHtml', () => {
    it('escapes special HTML entities', () => {
      const input = '<div class="alert" id=\'box\'>Safe & Sound</div>';
      const escaped = escapeHtml(input);
      expect(escaped).not.toContain('<');
      expect(escaped).not.toContain('>');
      expect(escaped).toContain('&lt;');
      expect(escaped).toContain('&gt;');
      expect(escaped).toContain('&quot;');
      expect(escaped).toContain('&amp;');
    });

    it('handles non-string inputs safely', () => {
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
    });
  });

  describe('clampNumber', () => {
    it('clamps numbers within range', () => {
      expect(clampNumber(50, 10, 100, 20)).toBe(50);
      expect(clampNumber(5, 10, 100, 20)).toBe(10);
      expect(clampNumber(150, 10, 100, 20)).toBe(100);
    });

    it('parses valid numeric strings', () => {
      expect(clampNumber('45', 10, 100, 20)).toBe(45);
    });

    it('falls back to defaultVal when NaN or invalid', () => {
      expect(clampNumber('invalid', 10, 100, 25)).toBe(25);
      expect(clampNumber(NaN, 10, 100, 25)).toBe(25);
      expect(clampNumber(Infinity, 10, 100, 25)).toBe(25);
    });
  });
});
