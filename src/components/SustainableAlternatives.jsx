import React, { useState } from 'react';
import { 
  Leaf, 
  ArrowRight, 
  Check, 
  Zap, 
  Train, 
  Recycle, 
  FlameKindling, 
  GraduationCap, 
  TrendingUp, 
  DollarSign, 
  Heart,
  Sparkles
} from 'lucide-react';
import { SUSTAINABLE_ALTERNATIVES } from '../data/mockData';

export default function SustainableAlternatives({ onAdoptAlternative }) {
  const [adoptedItems, setAdoptedItems] = useState({});

  const toggleAdopt = (id, alt) => {
    setAdoptedItems(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      if (onAdoptAlternative) {
        onAdoptAlternative(id, !prev[id], alt);
      }
      return updated;
    });
  };

  const adoptedCount = Object.values(adoptedItems).filter(Boolean).length;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Sustainable Alternatives & Systemic Emission Reductions
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Smog is not an inevitable weather event — it is man-made emissions trapped by atmospheric physics. Adopt high-impact alternatives tailored to heating, commuting, cooking, and community waste.
          </p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shrink-0">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-400">Adopted Lifestyle Switches</div>
            <div className="text-2xl font-black text-emerald-400 font-['Outfit']">{adoptedCount} / {SUSTAINABLE_ALTERNATIVES.length}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Alternatives Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SUSTAINABLE_ALTERNATIVES.map((item) => {
          const isAdopted = !!adoptedItems[item.id];
          const IconMap = { Zap, Train, Recycle, FlameKindling, GraduationCap };
          const Icon = IconMap[item.icon] || Leaf;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border p-6 transition-all flex flex-col justify-between ${
                isAdopted 
                  ? 'border-emerald-500 bg-emerald-950/20 shadow-xl shadow-emerald-950/20 ring-1 ring-emerald-500/50' 
                  : 'border-slate-800 bg-[#0f172a]/90 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-base font-['Outfit']">
                      {item.title}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.impactLevel === 'Critical' 
                      ? 'bg-red-950 text-red-300 border border-red-800' 
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {item.impactLevel} Impact
                  </span>
                </div>

                {/* Direct Comparison Box */}
                <div className="space-y-2 mb-4">
                  {/* Conventional Bad Practice */}
                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-xs">
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-wide mb-0.5">
                      ❌ Conventional High-Emission Habit
                    </div>
                    <div className="text-slate-300 font-medium">
                      {item.conventional}
                    </div>
                  </div>

                  {/* Clean Alternative */}
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-700/40 text-xs">
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide mb-0.5">
                      ✨ AeroShield Sustainable Switch
                    </div>
                    <div className="text-white font-semibold">
                      {item.sustainable}
                    </div>
                  </div>
                </div>

                {/* Quantified Impact Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-cyan-400" /> Emissions Averted
                    </div>
                    <div className="text-xs font-bold text-cyan-300 mt-1">{item.emissionsSaved}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" /> Financial ROI
                    </div>
                    <div className="text-xs font-bold text-emerald-300 mt-1">{item.costROI}</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800 mb-4 flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span><strong>Health Defense:</strong> {item.healthBonus}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => toggleAdopt(item.id, item)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  isAdopted 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {isAdopted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adopted in Household Plan</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Adopt This Switch Today</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
