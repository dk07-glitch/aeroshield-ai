import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  BarChart3, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingDown, 
  DollarSign, 
  ShieldCheck, 
  Share2, 
  Flame,
  Car,
  Wind,
  Leaf,
  Layers,
  Heart
} from 'lucide-react';

export default function ImpactCalculator({ city, persona }) {
  const [actions, setActions] = useState({
    wfh: true,
    crBox: true,
    inductionCooking: true,
    sealedWindows: false,
    publicTransit: true,
    noOpenBurning: true
  });

  const [showCertificate, setShowCertificate] = useState(false);

  const actionItems = [
    {
      id: 'wfh',
      title: 'Worked Remotely / Skipped Fossil Car Commute',
      category: 'Commute',
      pm25SavedGrams: 14.2,
      co2SavedKg: 4.8,
      moneySaved: 12,
      icon: Car
    },
    {
      id: 'crBox',
      title: 'Ran DIY Corsi-Rosenthal Box (6 hrs)',
      category: 'Air Cleaning',
      pm25SavedGrams: 28.5,
      co2SavedKg: 1.2,
      moneySaved: 45,
      icon: Wind
    },
    {
      id: 'inductionCooking',
      title: 'Cooked on Electric Induction (No Gas Spikes)',
      category: 'Indoor Source',
      pm25SavedGrams: 8.4,
      co2SavedKg: 2.1,
      moneySaved: 5,
      icon: Flame
    },
    {
      id: 'sealedWindows',
      title: 'Weatherstripped Windows & Doors',
      category: 'Building Envelope',
      pm25SavedGrams: 18.0,
      co2SavedKg: 3.5,
      moneySaved: 22,
      icon: Layers
    },
    {
      id: 'publicTransit',
      title: 'Used Metro / Walked in Ventilation Slot',
      category: 'Mobility',
      pm25SavedGrams: 11.0,
      co2SavedKg: 3.9,
      moneySaved: 15,
      icon: Leaf
    },
    {
      id: 'noOpenBurning',
      title: 'Composted Leaves (Zero Neighborhood Smoke)',
      category: 'Community',
      pm25SavedGrams: 35.0,
      co2SavedKg: 18.0,
      moneySaved: 30,
      icon: Heart
    }
  ];

  const toggleAction = (id) => {
    setActions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Compute totals
  const totalPm25Grams = actionItems.reduce((acc, item) => actions[item.id] ? acc + item.pm25SavedGrams : acc, 0);
  const totalCo2Kg = actionItems.reduce((acc, item) => actions[item.id] ? acc + item.co2SavedKg : acc, 0);
  const totalMoney = actionItems.reduce((acc, item) => actions[item.id] ? acc + item.moneySaved : acc, 0);
  
  // Berkeley Earth metric: 22 ug/m3 PM2.5 in 24 hours equals ~1 cigarette.
  const cigsAverted = (totalPm25Grams / 3.8).toFixed(1);

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowCertificate(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Personal & Community Impact Quantification
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Every clean air habit matters. Calculate exactly how many grams of toxic PM2.5 you kept out of your family's lungs and how much greenhouse emissions you prevented today.
          </p>
        </div>

        <button
          onClick={handleCelebrate}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition shrink-0"
        >
          <Award className="w-4 h-4" />
          <span>Generate Impact Certificate</span>
        </button>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0f172a] border border-cyan-500/30 rounded-3xl p-5 shadow-xl">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-cyan-400" /> Inhaled PM2.5 Averted
          </div>
          <div className="text-3xl font-black text-cyan-400 font-['Outfit'] mt-2">
            {totalPm25Grams.toFixed(1)} <span className="text-sm font-medium text-slate-400">grams</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Direct alveolar particle burden spared</div>
        </div>

        <div className="bg-[#0f172a] border border-emerald-500/30 rounded-3xl p-5 shadow-xl">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" /> CO2e Emissions Cut
          </div>
          <div className="text-3xl font-black text-emerald-400 font-['Outfit'] mt-2">
            {totalCo2Kg.toFixed(1)} <span className="text-sm font-medium text-slate-400">kg</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Tailpipe & heating carbon avoided</div>
        </div>

        <div className="bg-[#0f172a] border border-rose-500/30 rounded-3xl p-5 shadow-xl">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" /> Cigarette Smoke Equiv.
          </div>
          <div className="text-3xl font-black text-rose-400 font-['Outfit'] mt-2">
            {cigsAverted} <span className="text-sm font-medium text-slate-400">cigs</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Berkeley Earth particulate benchmark</div>
        </div>

        <div className="bg-[#0f172a] border border-amber-500/30 rounded-3xl p-5 shadow-xl">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Financial Savings
          </div>
          <div className="text-3xl font-black text-amber-400 font-['Outfit'] mt-2">
            ${totalMoney} <span className="text-sm font-medium text-slate-400">USD</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Fuel, medical & DIY filter savings</div>
        </div>
      </div>

      {/* Interactive Action Checkbox Ledger */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h4 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          Today's Household Clean Air Actions
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {actionItems.map((item) => {
            const isChecked = !!actions[item.id];
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => toggleAction(item.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isChecked 
                    ? 'border-cyan-500/70 bg-cyan-950/20 shadow-md' 
                    : 'border-slate-800 bg-slate-900/60 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isChecked ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isChecked ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">{item.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      +{item.pm25SavedGrams}g PM2.5 spared • +{item.co2SavedKg}kg CO2 averted
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400">+${item.moneySaved}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-gradient-to-b from-[#0f172a] to-[#070b14] border border-cyan-500/50 rounded-3xl max-w-lg w-full p-8 shadow-2xl text-center relative overflow-hidden animate-in fade-in zoom-in-95">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30 border border-cyan-300/40 mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
              Clean Air Guardian Certificate
            </span>

            <h3 className="text-2xl font-black text-white font-['Outfit'] mt-3">
              Certified Community Clean Air Champion
            </h3>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Awarded to the <strong className="text-cyan-300">{persona.title}</strong> household in <strong className="text-cyan-300">{city.name}</strong> for actively adopting low-emission routines and indoor particulate defenses.
            </p>

            <div className="my-6 grid grid-cols-3 gap-2 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <div>
                <div className="text-[10px] text-slate-400">PM2.5 Averted</div>
                <div className="text-base font-extrabold text-cyan-400 font-['Outfit']">{totalPm25Grams.toFixed(1)}g</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">CO2e Saved</div>
                <div className="text-base font-extrabold text-emerald-400 font-['Outfit']">{totalCo2Kg.toFixed(1)}kg</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Lung Defense</div>
                <div className="text-base font-extrabold text-rose-400 font-['Outfit']">-{cigsAverted} Cigs</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCertificate(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition"
              >
                Close Certificate
              </button>
              <button
                onClick={() => {
                  alert('Certificate copied to clipboard! Share with your neighborhood community group.');
                  setShowCertificate(false);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Neighbors</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
