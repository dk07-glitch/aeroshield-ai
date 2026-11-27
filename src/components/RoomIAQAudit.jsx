import React, { useState } from 'react';
import { 
  Home, 
  Baby, 
  Utensils, 
  Bed, 
  Sofa, 
  Briefcase, 
  ShieldCheck, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Wind, 
  Flame, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useVentilationTimer } from '../hooks/useVentilationTimer';

const ROOM_DATA = [
  {
    id: 'nursery',
    name: 'Nursery & Child Bedroom',
    icon: Baby,
    color: 'text-rose-400',
    bgColor: 'bg-rose-950/20',
    borderColor: 'border-rose-500/30',
    hazard: 'Sliding window draft seepage + floor-level aerosol settling',
    baselinePm25: 195,
    targetPm25: 12,
    baselineCo2: 1200,
    targetCo2: 650,
    primaryThreat: 'Children inhale 50% more air per kg; ground-level PM2.5 exacerbates early childhood asthma.',
    prescriptions: [
      'Install silicone V-strip compression weatherstripping on all sliding window sash gaps.',
      'Deploy 24/7 low-noise Corsi-Rosenthal box or True HEPA cleaner (aim for ≥6 ACH).',
      'Maintain 45% relative humidity with an ultrasonic cool-mist humidifier using distilled/boiled water.',
      'Keep child crib 1.5 meters away from exterior exterior walls and direct draft lines.'
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen & Meal Prep Zone',
    icon: Utensils,
    color: 'text-orange-400',
    bgColor: 'bg-orange-950/20',
    borderColor: 'border-orange-500/30',
    hazard: 'Gas stove combustion (NO2 > 280 ppb) + cooking oil vapor plumes (PM2.5 > 500 µg/m³)',
    baselinePm25: 380,
    targetPm25: 22,
    baselineCo2: 1400,
    targetCo2: 700,
    primaryThreat: 'Open frying produces carcinogenic acrolein and ultrafine PM0.1 particles that bypass airway filtration.',
    prescriptions: [
      'Switch from open gas burners to an electric induction cooktop to eliminate unburned methane & NO2.',
      'Switch cooking style: use steam, closed-lid pressure pots, and air fryers with condenser caps.',
      'Activate kitchen range hood 2 minutes BEFORE starting food prep, and keep running 5 mins after.',
      'Keep interior kitchen swinging door firmly closed to isolate the living and bedroom air circuits.'
    ]
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom Air Sanctuary',
    icon: Bed,
    color: 'text-purple-400',
    bgColor: 'bg-purple-950/20',
    borderColor: 'border-purple-500/30',
    hazard: 'Nocturnal CO2 buildup (>1800 ppm) + dry winter air paralyzing respiratory cilia',
    baselinePm25: 145,
    targetPm25: 10,
    baselineCo2: 1850,
    targetCo2: 620,
    primaryThreat: 'High overnight CO2 causes morning headaches, sleep fragmentation, and elevated vascular tension.',
    prescriptions: [
      'Place 2-3 mature Snake Plants (Sansevieria): they perform nocturnal CAM photosynthesis, releasing O2 at night.',
      'Slide a twin draft stopper under the hallway door to seal indoor corridor infiltration.',
      'Run bedroom air filtration on whisper mode (<38 dB) situated 1 meter above floor level.',
      'Moisturize nasal mucosa with warm saline rinse prior to sleep during inversion spells.'
    ]
  },
  {
    id: 'living',
    name: 'Living Room & Main Foyer',
    icon: Sofa,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950/20',
    borderColor: 'border-cyan-500/30',
    hazard: 'Front door chimney suction effect + street particulate tracking on footwear',
    baselinePm25: 240,
    targetPm25: 18,
    baselineCo2: 1100,
    targetCo2: 680,
    primaryThreat: 'Continuous outdoor door-opening introduces heavy pulses of road silt and diesel soot into the home core.',
    prescriptions: [
      'Place high-capacity DIY Corsi-Rosenthal Box centrally with cardboard shroud directing clean air upward.',
      'Establish a strict "Shoe-Off & Wet-Wipe" entryway mat to stop tracked toxic street dust.',
      'Hang dense double-lined velvet or thermal blackout curtains to block nocturnal thermal radiative chill.',
      'Perform wet microfiber floor mopping daily; avoid dry broom sweeping which resuspends settled soot.'
    ]
  },
  {
    id: 'office',
    name: 'Home Office / Study Sanctuary',
    icon: Briefcase,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/20',
    borderColor: 'border-emerald-500/30',
    hazard: 'Elevated CO2 triggering brain fog + electronics VOC emissions (benzene & flame retardants)',
    baselinePm25: 120,
    targetPm25: 8,
    baselineCo2: 1600,
    targetCo2: 580,
    primaryThreat: 'CO2 levels above 1200 ppm reduce cognitive decision-making scores by up to 25%.',
    prescriptions: [
      'Synchronize your 15-minute afternoon work break with the midday solar thermal window.',
      'Keep a desktop HEPA mini-scrubber directly within 1 meter of your respiratory breathing zone.',
      'Incorporate a potted Spider Plant or Areca Palm for daytime botanical VOC and formaldehyde uptake.',
      'Stay hydrated with warm herbal teas to keep pharyngeal mucous membranes moist and resilient.'
    ]
  }
];

export default function RoomIAQAudit({ city }) {
  const [activeRoomId, setActiveRoomId] = useState('nursery');
  const activeRoom = ROOM_DATA.find((r) => r.id === activeRoomId) || ROOM_DATA[0];

  const {
    formattedTime,
    progressPercent,
    isActive,
    isCompleted,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useVentilationTimer(15);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Ventilation Timer Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 cols: Intro */}
        <div className="lg:col-span-7 bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Room-by-Room Microclimate Audit
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Indoor air quality is not uniform. Particulate concentrations vary up to <strong>300%</strong> between your kitchen, nursery, and hallway. Select any micro-zone to inspect localized threats, particulate targets, and evidence-backed engineering solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-cyan-400" aria-hidden="true" /> Target: &lt;15 µg/m³ PM2.5
            </span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Target: &lt;700 ppm CO2
            </span>
          </div>
        </div>

        {/* Right 5 cols: Live 15-Minute Solar Ventilation Timer */}
        <div 
          role="region" 
          aria-label="Solar Ventilation Countdown Timer"
          className="lg:col-span-5 bg-gradient-to-br from-[#10172a] via-[#0f172a] to-cyan-950/40 border border-cyan-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <h4 className="font-bold text-white text-sm font-['Outfit']">
                Solar Mixing Ventilation Timer
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              {city.solarMixingWindow}
            </span>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            {isCompleted
              ? '✅ 15 minutes completed! Seal all windows immediately and spin your air cleaner to Turbo for 10 minutes.'
              : isActive
              ? '🪟 Windows open! Rapid cross-ventilation flushing stale CO2 while the solar boundary is high.'
              : 'Execute your daily 15-minute cross-ventilation during peak solar convection without soot infiltration.'}
          </p>

          <div className="my-3 flex items-center justify-between">
            <div 
              className="text-4xl font-black text-cyan-300 font-['Outfit'] tracking-wider"
              aria-live="polite"
              aria-label={`Time remaining: ${formattedTime}`}
            >
              {formattedTime}
            </div>

            <div className="flex items-center gap-2">
              {!isActive ? (
                <button
                  type="button"
                  onClick={startTimer}
                  aria-label="Start 15-minute solar ventilation timer"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Start Flush</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={pauseTimer}
                  aria-label="Pause solar ventilation timer"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Pause</span>
                </button>
              )}

              <button
                type="button"
                onClick={resetTimer}
                aria-label="Reset solar ventilation timer"
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div 
            role="progressbar" 
            aria-valuenow={progressPercent} 
            aria-valuemin="0" 
            aria-valuemax="100" 
            aria-label={`Ventilation flush is ${progressPercent} percent complete`}
            className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"
          >
            <div 
              className="bg-cyan-400 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Room Selection Tabs */}
      <div 
        role="tablist" 
        aria-label="Household microclimate rooms"
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs"
      >
        {ROOM_DATA.map((room) => {
          const Icon = room.icon;
          const isSelected = activeRoom.id === room.id;
          return (
            <button
              key={room.id}
              role="tab"
              aria-selected={isSelected}
              id={`tab-room-${room.id}`}
              aria-controls={`panel-room-${room.id}`}
              onClick={() => setActiveRoomId(room.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isSelected 
                  ? 'bg-slate-800 text-white border border-cyan-500/60 shadow-lg shadow-cyan-950/40 font-bold' 
                  : 'bg-[#0f172a] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? room.color : 'text-slate-400'}`} aria-hidden="true" />
              <span>{room.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Room Detail Audit Card */}
      <div 
        id={`panel-room-${activeRoom.id}`}
        role="tabpanel"
        aria-labelledby={`tab-room-${activeRoom.id}`}
        className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${activeRoom.bgColor} ${activeRoom.color} flex items-center justify-center border ${activeRoom.borderColor}`}>
              <activeRoom.icon className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-['Outfit']">
                {activeRoom.name}
              </h4>
              <p className="text-xs text-slate-400">
                Primary Hazard: <span className="text-slate-200 font-medium">{activeRoom.hazard}</span>
              </p>
            </div>
          </div>

          {/* Before vs After Metric Badges */}
          <div className="flex items-center gap-3">
            <div className="bg-red-950/30 border border-red-900/40 p-3 rounded-2xl text-right">
              <div className="text-[10px] text-red-300 font-semibold uppercase">Unsealed Baseline</div>
              <div className="text-lg font-black text-red-400 font-['Outfit']">{activeRoom.baselinePm25} µg/m³</div>
              <div className="text-[10px] text-slate-400">{activeRoom.baselineCo2} ppm CO2</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />

            <div className="bg-emerald-950/30 border border-emerald-700/50 p-3 rounded-2xl text-right">
              <div className="text-[10px] text-emerald-300 font-semibold uppercase">AeroShield Target</div>
              <div className="text-lg font-black text-emerald-400 font-['Outfit']">{activeRoom.targetPm25} µg/m³</div>
              <div className="text-[10px] text-slate-400">{activeRoom.targetCo2} ppm CO2</div>
            </div>
          </div>
        </div>

        {/* Clinical Threat Analysis */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-300">Physiological Vulnerability:</strong> {activeRoom.primaryThreat}
          </div>
        </div>

        {/* Prescribed Targeted Remedies */}
        <div>
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" aria-hidden="true" /> Prescribed IAQ Engineering Interventions
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list">
            {activeRoom.prescriptions.map((step, idx) => (
              <div 
                key={idx} 
                role="listitem"
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5" aria-hidden="true">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
