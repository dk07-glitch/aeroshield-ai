import React, { useState, useEffect, useRef } from 'react';
import { 
  CloudFog, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  AlertTriangle, 
  Info, 
  Sun, 
  ArrowUpRight, 
  Layers, 
  Car, 
  Flame, 
  Factory, 
  Building,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { clampNumber } from '../utils/security';

export default function SmogHeroRadar({ city, persona }) {
  const [viewMode, setViewMode] = useState('outdoor'); // 'outdoor' vs 'indoor_sanctuary'
  const [inversionSlider, setInversionSlider] = useState(city.inversionHeight);
  const canvasRef = useRef(null);

  // Synchronize slider when city changes
  useEffect(() => {
    setInversionSlider(clampNumber(city.inversionHeight, 100, 600, 200));
  }, [city]);

  // Particle Canvas Simulation with prefers-reduced-motion support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 180;

    const particleCount = viewMode === 'outdoor' 
      ? Math.min(Math.floor(city.pm25 * 0.7), prefersReducedMotion ? 20 : 180) 
      : (prefersReducedMotion ? 4 : 12);

    const speedScale = prefersReducedMotion ? 0.1 : 1;

    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.2 + 0.8,
      speedX: ((Math.random() - 0.5) * (viewMode === 'outdoor' ? 0.7 : 0.2)) * speedScale,
      speedY: ((Math.random() - 0.5) * (viewMode === 'outdoor' ? 0.4 : 0.2)) * speedScale,
      color: viewMode === 'outdoor' 
        ? (Math.random() > 0.4 ? 'rgba(239, 68, 68, ' : 'rgba(245, 158, 11, ') 
        : 'rgba(56, 189, 248, ',
      opacity: Math.random() * 0.6 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (viewMode === 'outdoor') {
        const boundaryY = Math.max(30, Math.min(canvas.height - 30, canvas.height - (inversionSlider / 350) * canvas.height));
        
        // Gradient for inversion cap
        const grad = ctx.createLinearGradient(0, 0, 0, boundaryY);
        grad.addColorStop(0, 'rgba(251, 146, 60, 0.08)');
        grad.addColorStop(1, 'rgba(239, 68, 68, 0.18)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, boundaryY, canvas.width, canvas.height - boundaryY);

        ctx.strokeStyle = 'rgba(248, 113, 113, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(0, boundaryY);
        ctx.lineTo(canvas.width, boundaryY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(252, 165, 165, 0.9)';
        ctx.font = '11px Outfit, sans-serif';
        ctx.fillText(`WARM INVERSION LID (${inversionSlider}m) - TRAPPING SOOT BELOW`, 15, boundaryY - 6);
      }

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (canvas && canvas.parentElement) {
          canvas.width = canvas.parentElement.clientWidth;
          render();
        }
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
    };
  }, [viewMode, city, inversionSlider]);

  const whoLimitRatio = (city.pm25 / 15).toFixed(1);
  const cigsEquivalent = (city.pm25 / 22).toFixed(1);

  return (
    <section aria-labelledby="radar-section-heading" className="space-y-6">
      <h2 id="radar-section-heading" className="sr-only">
        Atmospheric Inversion and Smog Radar Dashboard
      </h2>
      
      {/* Top Main Cards: AQI Overview & Atmospheric Inversion Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Real-time AQI & Health Severity Score (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#10172a] to-[#0b1120] border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                Atmospheric Monitor
              </span>
              <span 
                className="px-2.5 py-1 rounded-full text-xs font-bold border tracking-wide"
                style={{ 
                  backgroundColor: `${city.color}20`, 
                  borderColor: `${city.color}60`, 
                  color: city.color 
                }}
              >
                {city.category}
              </span>
            </div>

            {/* Huge AQI Number & Meter */}
            <div className="my-5 flex items-baseline gap-4">
              <div 
                className="text-6xl font-black font-['Outfit'] tracking-tighter"
                style={{ color: city.color }}
                aria-label={`Current US AQI is ${city.aqi}`}
              >
                {city.aqi}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">US-AQI Index</div>
                <div className="text-xs text-slate-400">
                  PM2.5: <span className="font-bold text-white">{city.pm25} µg/m³</span>
                </div>
              </div>
            </div>

            {/* WHO Comparison & Direct Cigarette Burden Bar */}
            <div className="space-y-3 bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  WHO 24h Safe Limit Exceeded:
                </span>
                <span className="font-bold text-red-400">+{whoLimitRatio}x Safe Threshold</span>
              </div>
              
              <div 
                role="progressbar" 
                aria-valuenow={Math.min(whoLimitRatio * 4, 100)} 
                aria-valuemin="0" 
                aria-valuemax="100" 
                aria-label={`WHO Safe threshold exceeded by ${whoLimitRatio} times`}
                className="w-full bg-slate-800 h-2 rounded-full overflow-hidden"
              >
                <div 
                  className="bg-gradient-to-r from-amber-500 to-red-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(whoLimitRatio * 4, 100)}%` }}
                ></div>
              </div>

              <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
                <span>Inhalation lung burden today:</span>
                <span className="text-amber-300 font-medium">≈ Smoking {cigsEquivalent} cigarettes</span>
              </div>
            </div>
          </div>

          {/* Meteorological Factors Grid */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-cyan-400" aria-hidden="true" /> Temp
              </div>
              <div className="text-sm font-bold text-slate-100 mt-0.5">{city.temp}°C</div>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-400" aria-hidden="true" /> Humidity
              </div>
              <div className="text-sm font-bold text-slate-100 mt-0.5">{city.humidity}%</div>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Wind className="w-3 h-3 text-emerald-400" aria-hidden="true" /> Stagnation
              </div>
              <div className="text-sm font-bold text-slate-100 mt-0.5">{city.windSpeed} km/h</div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Atmospheric Inversion & Particle Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#10172a] to-[#0b1120] border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" aria-hidden="true" />
                <h3 className="font-bold text-white text-base font-['Outfit']">
                  Winter Inversion Layer & Particulate Chamber
                </h3>
              </div>

              {/* View Mode Toggle: Outdoor vs Indoor Sanctuary */}
              <div 
                role="radiogroup" 
                aria-label="Simulation Environment Mode"
                className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={viewMode === 'outdoor'}
                  onClick={() => setViewMode('outdoor')}
                  className={`px-3 py-1 rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${
                    viewMode === 'outdoor' 
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30 font-semibold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Outdoor Toxic Haze
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={viewMode === 'indoor_sanctuary'}
                  onClick={() => setViewMode('indoor_sanctuary')}
                  className={`px-3 py-1 rounded-lg font-medium transition flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    viewMode === 'indoor_sanctuary' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  Indoor Air Sanctuary
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {viewMode === 'outdoor' 
                ? `Cold dense air is trapped close to the ground by an overhead warm inversion lid at ${inversionSlider}m. Without wind, smoke particles cannot disperse vertically.`
                : 'Sealed windows + DIY Corsi-Rosenthal / HEPA filtration removes 98% of respirable aerosols, providing safe lung recovery.'}
            </p>
          </div>

          {/* Interactive Particle Canvas */}
          <div className="relative my-4 rounded-2xl overflow-hidden border border-slate-800 bg-[#070b14]">
            <canvas 
              ref={canvasRef} 
              role="img"
              aria-label={`Visual depiction of particulate matter in ${viewMode === 'outdoor' ? 'outdoor smog' : 'filtered indoor room'}`}
              className="w-full block"
            >
              Current particle count simulation: {viewMode === 'outdoor' ? 'High particulate density' : 'Purified low particle density'}
            </canvas>
            
            <div className="absolute bottom-2 left-3 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded text-slate-400 border border-slate-800 pointer-events-none">
              {viewMode === 'outdoor' ? 'Suspended PM2.5 / PM10 Aerosols' : 'Purified Microclimate: <12 µg/m³'}
            </div>
          </div>

          {/* Inversion Height Slider Control */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <label 
                htmlFor="inversion-boundary-slider" 
                className="text-slate-300 flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                Simulate Solar Boundary Heating (Inversion Ceiling Height):
              </label>
              <span className="font-bold text-amber-400" aria-live="polite">
                {inversionSlider} meters
              </span>
            </div>
            
            <input 
              id="inversion-boundary-slider"
              type="range" 
              min="100" 
              max="600" 
              step="10"
              value={inversionSlider}
              aria-valuemin="100"
              aria-valuemax="600"
              aria-valuenow={inversionSlider}
              aria-valuetext={`${inversionSlider} meters`}
              onChange={(e) => setInversionSlider(clampNumber(e.target.value, 100, 600, 200))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            />
            
            <div className="flex justify-between text-[10px] text-slate-500" aria-hidden="true">
              <span>100m (Severe Stagnation Cap)</span>
              <span>350m (Midday Mixing)</span>
              <span>600m (Clean Dispersal)</span>
            </div>
          </div>

        </div>

      </div>

      {/* Secondary Row: Winter Smog Breakdown & 24h Hourly Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Smog Pollution Source Attribution (5 cols) */}
        <div className="lg:col-span-5 bg-[#0f172a]/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" aria-hidden="true" />
              <h3 className="font-bold text-white text-sm font-['Outfit']">Primary Winter Smog Contributors</h3>
            </div>
            <span className="text-[11px] text-slate-400">Source Receptor Model</span>
          </div>

          <div className="space-y-3" role="list">
            {city.primarySources.map((source, index) => {
              const IconMap = { Car, Flame, Factory, Building, CloudFog };
              const Icon = IconMap[source.icon] || Flame;
              return (
                <div key={index} className="space-y-1.5" role="listitem">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                      {source.name}
                    </span>
                    <span className="font-bold text-slate-200">{source.percentage}%</span>
                  </div>
                  <div 
                    role="progressbar"
                    aria-valuenow={source.percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${source.name}: ${source.percentage} percent`}
                    className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden"
                  >
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-amber-500"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            💡 <strong className="text-slate-300">Winter Physics Insight:</strong> Biomass smoke and vehicle soot contain black carbon aerosols that absorb infrared radiation, creating a self-reinforcing inversion cap.
          </div>
        </div>

        {/* 24-Hour Adaptive Forecast & Ventilation Slot (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f172a]/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-400" aria-hidden="true" />
                <h3 className="font-bold text-white text-sm font-['Outfit']">24-Hour Smog Progression & Safe Ventilation</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/50">
                Safe Slot: {city.solarMixingWindow}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Atmospheric mixing peaks between 1:00 PM and 3:30 PM. Keep all sashes sealed during morning and evening rush-hour inversions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2" role="list">
            {city.forecast.map((fc, i) => {
              const isVentWindow = fc.time === '14:00';
              return (
                <div 
                  key={i} 
                  role="listitem"
                  className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between ${
                    isVentWindow 
                      ? 'border-cyan-500/80 bg-cyan-950/30 ring-1 ring-cyan-500/50' 
                      : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="text-xs font-semibold text-slate-400">{fc.time}</div>
                  <div className={`text-xl font-extrabold my-1 font-['Outfit'] ${
                    fc.aqi > 350 ? 'text-red-400' : fc.aqi > 250 ? 'text-orange-400' : 'text-amber-300'
                  }`}>
                    {fc.aqi}
                  </div>
                  <div className="text-[10px] text-slate-400">{fc.temp}°C</div>
                  {isVentWindow && (
                    <div className="mt-1 text-[9px] font-bold text-cyan-300 bg-cyan-900/60 py-0.5 rounded">
                      VENTILATE
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-cyan-300/90 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-cyan-400" aria-hidden="true" />
            <span>
              AeroShield recommends setting a 15-minute timer during <strong>{city.solarMixingWindow}</strong> for rapid air turnover without soot accumulation.
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
