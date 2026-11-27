import { describe, it, expect } from 'vitest';
import { generateSmogAdvice } from '../services/aiAssistantService';
import { CITIES, PERSONAS } from '../data/mockData';

describe('aiAssistantService', () => {
  const city = CITIES[0]; // New Delhi
  const persona = PERSONAS[0]; // Young Family

  it('generates atmospheric boundary ventilation advice', async () => {
    const res = await generateSmogAdvice({
      prompt: 'When is the best window to ventilate our rooms today?',
      city,
      persona,
      currentAqi: city.aqi
    });

    expect(res.title).toContain('Ventilation');
    expect(res.impactStats).toHaveProperty('infiltratedSmogBlocked');
    expect(res.sections.length).toBeGreaterThan(0);
    expect(res.sources).toContain('World Health Organization (WHO) IAQ Guidelines 2024');
  });

  it('generates Corsi-Rosenthal DIY box physics blueprint', async () => {
    const res = await generateSmogAdvice({
      prompt: 'How to build a DIY Corsi-Rosenthal box air purifier?',
      city,
      persona,
      currentAqi: city.aqi
    });

    expect(res.title).toContain('Corsi-Rosenthal');
    expect(res.impactStats).toHaveProperty('cleanAirDelivery');
    expect(res.impactStats.cleanAirDelivery).toBe('550 CFM');
  });

  it('generates tailored pediatric and respiratory shield for vulnerable personas', async () => {
    const res = await generateSmogAdvice({
      prompt: 'Plan our day for baby with sensitive lungs and asthma',
      city,
      persona,
      currentAqi: city.aqi
    });

    expect(res.title).toContain('Pediatric & Respiratory');
    expect(res.impactStats).toHaveProperty('lungParticleBurdenReduced');
  });

  it('generates exercise safety assessment and cigarette equivalent metric', async () => {
    const res = await generateSmogAdvice({
      prompt: 'Can I go for an outdoor morning run or cardio jogging?',
      city,
      persona,
      currentAqi: city.aqi
    });

    expect(res.title).toContain('Exercise Safety Assessment');
    expect(res.impactStats).toHaveProperty('equivalentCigarettesAvoided');
    expect(res.impactStats.equivalentCigarettesAvoided).toContain('cigs');
  });

  it('returns default holistic advisory when prompt has general intent', async () => {
    const res = await generateSmogAdvice({
      prompt: 'General clean air recommendations for our household',
      city,
      persona,
      currentAqi: city.aqi
    });

    expect(res.title).toContain('Comprehensive Clean Air Action Strategy');
    expect(res.sections).toHaveLength(3);
  });
});
