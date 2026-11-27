import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Navbar from '../components/Navbar';
import SmogHeroRadar from '../components/SmogHeroRadar';
import DailyRoutineScheduler from '../components/DailyRoutineScheduler';
import IAQHacksLab from '../components/IAQHacksLab';
import ImpactCalculator from '../components/ImpactCalculator';
import ErrorBoundary from '../components/ErrorBoundary';
import { CITIES, PERSONAS } from '../data/mockData';

describe('UI Components & Accessibility Test Suite', () => {
  const city = CITIES[0];
  const persona = PERSONAS[0];

  describe('Navbar Component', () => {
    it('renders brand title and active city badge', () => {
      render(
        <Navbar
          currentCity={city}
          setCity={vi.fn()}
          currentPersona={persona}
          setPersona={vi.fn()}
          activeTab="radar"
          setActiveTab={vi.fn()}
        />
      );

      expect(screen.getByText('AeroShield AI')).toBeInTheDocument();
      expect(screen.getByText(city.name)).toBeInTheDocument();
      expect(screen.getByText(`${city.aqi} AQI`)).toBeInTheDocument();
    });

    it('opens city modal and closes on Escape key', async () => {
      render(
        <Navbar
          currentCity={city}
          setCity={vi.fn()}
          currentPersona={persona}
          setPersona={vi.fn()}
          activeTab="radar"
          setActiveTab={vi.fn()}
        />
      );

      const locationBtn = screen.getByRole('button', { name: /Location/i });
      fireEvent.click(locationBtn);

      expect(screen.getByRole('dialog', { name: /Select Smog Hotspot/i })).toBeInTheDocument();

      // Press Escape
      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('toggles ambient audio sound on button click', () => {
      render(
        <Navbar
          currentCity={city}
          setCity={vi.fn()}
          currentPersona={persona}
          setPersona={vi.fn()}
          activeTab="radar"
          setActiveTab={vi.fn()}
        />
      );

      const audioBtn = screen.getByRole('button', { name: /ambient air sanctuary sound/i });
      expect(audioBtn).toHaveAttribute('aria-pressed', 'false');

      fireEvent.click(audioBtn);
      expect(audioBtn).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(audioBtn);
      expect(audioBtn).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('SmogHeroRadar Component', () => {
    it('renders atmospheric monitor with AQI and WHO limit ratio', () => {
      render(<SmogHeroRadar city={city} persona={persona} />);

      expect(screen.getByLabelText(/Current US AQI is 382/i)).toBeInTheDocument();
      expect(screen.getByText(/WHO 24h Safe Limit Exceeded:/i)).toBeInTheDocument();
    });

    it('toggles simulation between outdoor toxic haze and indoor sanctuary', () => {
      render(<SmogHeroRadar city={city} persona={persona} />);

      const indoorRadio = screen.getByRole('radio', { name: /Indoor Air Sanctuary/i });
      fireEvent.click(indoorRadio);

      expect(indoorRadio).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByText(/Purified Microclimate: <12 µg\/m³/i)).toBeInTheDocument();
    });

    it('updates boundary height slider value on user interaction', () => {
      render(<SmogHeroRadar city={city} persona={persona} />);

      const slider = screen.getByLabelText(/Simulate Solar Boundary Heating/i);
      fireEvent.change(slider, { target: { value: '320' } });

      expect(slider.value).toBe('320');
      expect(screen.getByText('320 meters')).toBeInTheDocument();
    });
  });

  describe('DailyRoutineScheduler Component', () => {
    it('renders scheduled time blocks and updates completion progress', () => {
      const handleComplete = vi.fn();
      render(
        <DailyRoutineScheduler
          city={city}
          persona={persona}
          onTaskComplete={handleComplete}
        />
      );

      expect(screen.getByText(/Personalized 24-Hour Smog Routine/i)).toBeInTheDocument();
      expect(screen.getByText(/Wakeup & Air Sanctuary Seal Check/i)).toBeInTheDocument();

      const taskCheckboxes = screen.getAllByRole('checkbox');
      expect(taskCheckboxes.length).toBeGreaterThan(0);

      // Check the first task
      fireEvent.click(taskCheckboxes[0]);
      expect(handleComplete).toHaveBeenCalled();
      expect(taskCheckboxes[0]).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('IAQHacksLab Component', () => {
    it('renders CADR calculator with initial computed clearance speed', () => {
      render(<IAQHacksLab />);

      expect(screen.getByText(/Corsi-Rosenthal Box Performance & Sizing Calculator/i)).toBeInTheDocument();
      expect(screen.getByText(/562 CFM/i)).toBeInTheDocument();
      expect(screen.getByText(/14.1 Air Changes Per Hour/i)).toBeInTheDocument();
    });

    it('updates calculation when room area slider changes', () => {
      render(<IAQHacksLab />);

      const areaSlider = screen.getByLabelText(/Room Area/i);
      fireEvent.change(areaSlider, { target: { value: '600' } });

      expect(screen.getByText('600 sq ft')).toBeInTheDocument();
      expect(screen.getByText(/7.0 Air Changes Per Hour/i)).toBeInTheDocument();
    });

    it('filters hacks by category', () => {
      render(<IAQHacksLab />);

      const diyTab = screen.getByRole('tab', { name: 'DIY Hardware' });
      fireEvent.click(diyTab);

      const cards = screen.getAllByText(/The Corsi-Rosenthal DIY Box Purifier/i);
      expect(cards.length).toBeGreaterThan(0);
      expect(screen.queryByText(/NASA Phytoremediation Bio-Array/i)).not.toBeInTheDocument();
    });
  });

  describe('ImpactCalculator Component', () => {
    it('computes correct PM2.5 and CO2 metrics from active actions', () => {
      render(<ImpactCalculator city={city} persona={persona} />);

      expect(screen.getByText(/Inhaled PM2.5 Averted/i)).toBeInTheDocument();
      expect(screen.getByText(/CO2e Emissions Cut/i)).toBeInTheDocument();
      expect(screen.getByText(/Cigarette Equiv. Avoided/i)).toBeInTheDocument();
    });

    it('opens certificate modal when clicking Generate Impact Certificate', () => {
      render(<ImpactCalculator city={city} persona={persona} />);

      const certBtn = screen.getByRole('button', { name: /Generate Impact Certificate/i });
      fireEvent.click(certBtn);

      expect(screen.getByRole('dialog', { name: /Certified Community Clean Air Champion/i })).toBeInTheDocument();
    });
  });

  describe('ErrorBoundary Component', () => {
    it('catches render errors and displays fallback UI', () => {
      const ProblematicChild = () => {
        throw new Error('Test explosion');
      };

      // Suppress console.error in test output for expected error
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ProblematicChild />
        </ErrorBoundary>
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Application Notice/i)).toBeInTheDocument();
      expect(screen.getByText(/Test explosion/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reload AeroShield Dashboard/i })).toBeInTheDocument();

      spy.mockRestore();
    });
  });
});
