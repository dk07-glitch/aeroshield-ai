import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sun, 
  Moon, 
  Car, 
  Utensils, 
  ShieldAlert, 
  Sparkles, 
  AlertCircle,
  TrendingDown,
  Wind,
  Coffee,
  Check
} from 'lucide-react';

export default function DailyRoutineScheduler({ city, persona, onTaskComplete }) {
  const [completedTasks, setCompletedTasks] = useState({});

  // Dynamic routine generator based on persona
  const routineSchedule = [
    {
      id: 'r1',
      time: '06:30 - 08:00',
      period: 'Morning Inversion Peak',
      title: 'Wakeup & Air Sanctuary Seal Check',
      category: 'Indoor Defense',
      icon: Moon,
      color: 'text-amber-400',
      aqiImpact: 'Peak exterior AQI (350+)',
      action: 'Keep bedroom doors & windows sealed. Check morning respiratory comfort and Peak Flow meter if asthmatic. Drink warm water to hydrate airway cilia.',
      lowEmissionTip: 'Avoid turning on space heaters with open resistive coils or burning fuel. Use radiant heat with thermostat.',
      protectionValue: 20
    },
    {
      id: 'r2',
      time: '08:00 - 09:30',
      period: 'Rush-Hour Smog Surge',
      title: 'Low-Exposure Commute & School Drop-off',
      category: 'Transit & Exposure',
      icon: Car,
      color: 'text-red-400',
      aqiImpact: 'High tailpipe diesel plume',
      action: 'Don an N95/FFP2 mask before stepping into building lobbies or streets. Avoid congested main intersections. If driving, set AC to 100% "Recirculation Mode".',
      lowEmissionTip: 'Switch to metro or shared EV shuttle instead of single-occupant car. Avoid idling outside school gates.',
      protectionValue: 25
    },
    {
      id: 'r3',
      time: '09:30 - 13:00',
      period: 'Mid-Morning Stagnation',
      title: 'Sealed Indoor Work & Dust Suppression',
      category: 'IAQ Management',
      icon: Coffee,
      color: 'text-blue-400',
      aqiImpact: 'Moderate-high stagnation',
      action: 'Run your Corsi-Rosenthal box or HEPA unit on Medium speed. Perform a quick 5-minute damp microfiber wipe of workspace surfaces to trap settled fine soot.',
      lowEmissionTip: 'Work remotely if air quality alerts are active in your city to eliminate vehicle tailpipe emissions.',
      protectionValue: 15
    },
    {
      id: 'r4',
      time: '13:00 - 15:30',
      period: 'Solar Thermal Mixing Window',
      title: '🌟 Synchronized 15-Minute Flush & Errands',
      category: 'Crucial Opportunity',
      icon: Sun,
      color: 'text-cyan-400',
      isGoldenWindow: true,
      aqiImpact: `Lowest AQI slot today (${city.solarMixingWindow})`,
      action: 'Open opposing windows for exactly 12-15 minutes to flush stale CO2 (>1200ppm) out. Take essential brief outdoor walks or errands during this specific interval.',
      lowEmissionTip: 'Walk or cycle for short neighborhood errands while ground-level stagnation is temporarily dissipated.',
      protectionValue: 30
    },
    {
      id: 'r5',
      time: '16:00 - 18:30',
      period: 'Sunset Boundary Compression',
      title: 'Evening Seal-Down & Induction Cooking',
      category: 'Cooking & Indoor Sources',
      icon: Utensils,
      color: 'text-orange-400',
      aqiImpact: 'Inversion re-forms as ground chills',
      action: 'Lock all windows tightly before 5:00 PM. In the kitchen, use induction cooktop or steam/bake with tight lids. Run exhaust hood to prevent indoor PM2.5 spikes.',
      lowEmissionTip: 'Avoid burning garden leaves or open firewood for evening warmth. Switch to thermal curtains.',
      protectionValue: 20
    },
    {
      id: 'r6',
      time: '19:00 - 22:30',
      period: 'Nighttime Cold Trap',
      title: 'Night Air Recovery & Clean Sleep Chamber',
      category: 'Restorative Sleep',
      icon: Wind,
      color: 'text-purple-400',
      aqiImpact: 'Stagnant cold layer traps smoke',
      action: 'Turn bedroom air purifier to low whisper mode. Maintain 45% relative humidity with cool-mist humidifier. Perform warm saline rinse if throat feels scratchy.',
      lowEmissionTip: 'Set timer on bedroom heating to turn off automatically during deep sleep to conserve grid energy.',
      protectionValue: 20
    }
  ];

  const toggleTask = (id, value) => {
    setCompletedTasks(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      if (onTaskComplete) {
        onTaskComplete(updated);
      }
      return updated;
    });
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const protectionScore = Math.min(100, Math.round((completedCount / routineSchedule.length) * 100));

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Score & Persona Context */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Personalized 24-Hour Smog Routine
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              {persona.title}
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Synchronized with <strong>{city.name}</strong>'s atmospheric boundary dynamics. Follow these timed defenses to minimize respiratory inhalation while slashing household emissions.
          </p>
        </div>

        {/* Protection Score Meter */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shrink-0 w-full md:w-auto">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-400 transition-all duration-700 ease-out"
                strokeDasharray={`${protectionScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-black text-sm text-cyan-300 font-['Outfit']">
              {protectionScore}%
            </span>
          </div>
          <div>
            <div className="text-xs font-bold text-white">Daily Shield Level</div>
            <div className="text-[11px] text-slate-400">
              {completedCount} of {routineSchedule.length} habits locked
            </div>
          </div>
        </div>
      </div>

      {/* Routine Timeline Cards */}
      <div className="space-y-4">
        {routineSchedule.map((item) => {
          const Icon = item.icon;
          const isDone = !!completedTasks[item.id];

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all p-5 ${
                item.isGoldenWindow 
                  ? 'border-cyan-500/60 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 shadow-lg shadow-cyan-950/30' 
                  : isDone 
                    ? 'border-emerald-800/40 bg-slate-900/60 opacity-80' 
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.isGoldenWindow ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cyan-400">{item.time}</span>
                      <span className="text-[11px] text-slate-400">• {item.period}</span>
                      {item.isGoldenWindow && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 animate-pulse">
                          🌟 Ventilation Window
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white font-['Outfit'] mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Mark as Done Toggle */}
                <button
                  onClick={() => toggleTask(item.id, item.protectionValue)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 ${
                    isDone 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isDone ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Completed (+{item.protectionValue}pts)</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-400" />
                      <span>Mark Complete</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {item.action}
              </p>

              {/* Low Emission Eco-Hack Pill */}
              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-start gap-2 text-xs">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <strong className="text-emerald-300">Eco-Alternative Action:</strong> {item.lowEmissionTip}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
