import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import RoomIAQAudit from '../components/RoomIAQAudit';
import { CITIES } from '../data/mockData';

describe('RoomIAQAudit Component & Ventilation Timer', () => {
  const city = CITIES[0];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders room microclimate audit with room tabs', () => {
    render(<RoomIAQAudit city={city} />);

    expect(screen.getByText(/Room-by-Room Microclimate Audit/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Nursery & Child Bedroom/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Kitchen & Meal Prep Zone/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Master Bedroom Air Sanctuary/i })).toBeInTheDocument();
  });

  it('switches active room tab and updates target PM2.5 and prescriptions', () => {
    render(<RoomIAQAudit city={city} />);

    const kitchenTab = screen.getByRole('tab', { name: /Kitchen & Meal Prep Zone/i });
    fireEvent.click(kitchenTab);

    expect(screen.getByText(/Kitchen & Meal Prep Zone/i, { selector: 'h4' })).toBeInTheDocument();
    expect(screen.getByText('380 µg/m³')).toBeInTheDocument();
    expect(screen.getByText('22 µg/m³')).toBeInTheDocument();
    expect(screen.getByText(/Switch from open gas burners to an electric induction cooktop/i)).toBeInTheDocument();
  });

  it('controls 15-minute solar ventilation countdown timer', () => {
    render(<RoomIAQAudit city={city} />);

    expect(screen.getByText('15:00')).toBeInTheDocument();

    const startBtn = screen.getByRole('button', { name: /Start 15-minute solar ventilation timer/i });
    fireEvent.click(startBtn);

    // Fast-forward 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText('14:55')).toBeInTheDocument();

    // Pause timer
    const pauseBtn = screen.getByRole('button', { name: /Pause solar ventilation timer/i });
    fireEvent.click(pauseBtn);

    // Fast-forward another 5 seconds - should remain paused
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('14:55')).toBeInTheDocument();

    // Reset timer
    const resetBtn = screen.getByRole('button', { name: /Reset solar ventilation timer/i });
    fireEvent.click(resetBtn);
    expect(screen.getByText('15:00')).toBeInTheDocument();
  });
});
