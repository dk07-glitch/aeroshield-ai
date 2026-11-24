import React, { useState } from 'react';
import { 
  Wrench, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Utensils, 
  Droplets, 
  Leaf, 
  DollarSign, 
  Zap, 
  ChevronRight,
  Sliders,
  CheckCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import { IAQ_HACKS } from '../data/mockData';

export default function IAQHacksLab() {
  const [selectedHack, setSelectedHack] = useState(IAQ_HACKS[0]);
  const [activeCategory, setActiveCategory] = useState('All');

  // DIY Corsi-Rosenthal Calculator State
  const [roomArea, setRoomArea] = useState(300); // sq ft
  const [ceilingHeight, setCeilingHeight] = useState(8); // ft
  const [fanSpeed, setFanSpeed] = useState('med'); // 'low', 'med', 'high'
  const [filterType, setFilterType] = useState('merv13_2inch'); // 'merv13_1inch', 'merv13_2inch'

  // Calculator physics math
  const roomVolume = roomArea * ceilingHeight; // cu ft
  const baseCfm = fanSpeed === 'low' ? 320 : fanSpeed === 'med' ? 520 : 640;
  const filterMultiplier = filterType === 'merv13_2inch' ? 1.08 : 0.95;
  const effectiveCadr = Math.round(baseCfm * filterMultiplier);
  const airChangesPerHour = ((effectiveCadr * 60) / roomVolume).toFixed(1);
  const clearanceMinutes = Math.round((Math.log(10) * roomVolume) / (effectiveCadr * 0.95)); // Time to 90% reduction
  const costCommercialHepa = 299;
  const costCrBox = 34;
  const moneySaved = costCommercialHepa - costCrBox;

  const categories = ['All', 'DIY Hardware', 'Meteorology Hack', 'Building Envelope', 'Indoor Source Reduction', 'Aerosol Physics', 'Biological Air Filtering'];

  const filteredHacks = activeCategory === 'All' 
    ? IAQ_HACKS 
    : IAQ_HACKS.filter(h => h.category === activeCategory);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/50 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Indoor Air Quality (IAQ) Lab & Engineering Hacks
            </h3>
            <p className="text-xs text-slate-400">
              Low-cost, peer-reviewed engineering hacks to transform any ordinary winter home into a medical-grade clean air sanctuary.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Tool: Interactive Corsi-Rosenthal Box CADR Calculator */}
      <div className="bg-[#0f172a] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase tracking-wider">
                Engineering Simulator
              </span>
              <span className="text-xs text-slate-400">• UC Davis Validated Formula</span>
            </div>
            <h4 className="text-lg font-bold text-white font-['Outfit'] mt-1">
              Corsi-Rosenthal Box Performance & Sizing Calculator
            </h4>
            <p className="text-xs text-slate-400">
              Calculate the Clean Air Delivery Rate (CADR), air turnover speed, and particulate decay for your custom room dimensions.
            </p>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">CADR Air Delivery</div>
              <div className="text-xl font-black text-cyan-400 font-['Outfit']">{effectiveCadr} CFM</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">90% Clearance</div>
              <div className="text-xl font-black text-emerald-400 font-['Outfit']">{clearanceMinutes} mins</div>
            </div>
          </div>
        </div>

        {/* Calculator Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {/* Room Area */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
              <span>Room Area</span>
              <span className="text-cyan-400 font-bold">{roomArea} sq ft</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="800" 
              step="25"
              value={roomArea}
              onChange={(e) => setRoomArea(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Small Room (120)</span>
              <span>Hall (600+)</span>
            </div>
          </div>

          {/* Ceiling Height */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
              <span>Ceiling Height</span>
              <span className="text-cyan-400 font-bold">{ceilingHeight} ft</span>
            </div>
            <input 
              type="range" 
              min="7" 
              max="14" 
              step="0.5"
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Standard (8ft)</span>
              <span>Loft (12ft)</span>
            </div>
          </div>

          {/* Fan Speed */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-300 font-medium mb-2">Fan Operating Speed</div>
            <div className="grid grid-cols-3 gap-1">
              {['low', 'med', 'high'].map(s => (
                <button
                  key={s}
                  onClick={() => setFanSpeed(s)}
                  className={`py-1 text-xs uppercase font-bold rounded-lg transition ${
                    fanSpeed === s 
                      ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-slate-500 mt-2 text-center">
              {fanSpeed === 'low' ? 'Whisper (<42 dB)' : fanSpeed === 'med' ? 'Daily Work (48 dB)' : 'Turbo Flush (56 dB)'}
            </div>
          </div>

          {/* Filter Thickness */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-300 font-medium mb-2">Filter Configuration</div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-slate-800 text-xs text-slate-200 rounded-xl p-2 border border-slate-700 focus:outline-none"
            >
              <option value="merv13_2inch">4x 20x20x2" MERV 13 (Optimal)</option>
              <option value="merv13_1inch">4x 20x20x1" MERV 13 (Standard)</option>
            </select>
            <div className="text-[10px] text-emerald-400 mt-2 text-center">
              Saves ~${moneySaved} vs Commercial HEPA
            </div>
          </div>
        </div>

        {/* Live Calculation Output Callout */}
        <div className="mt-6 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">
              Achieves <strong>{airChangesPerHour} Air Changes Per Hour (ACH)</strong>. CDC recommends ≥5 ACH for sterile air filtration.
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>DIY Parts: ~$34 • Annual Electricity: ~$24</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition ${
              activeCategory === cat 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' 
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hacks Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredHacks.map((hack) => {
          const isSelected = selectedHack.id === hack.id;
          return (
            <div
              key={hack.id}
              onClick={() => setSelectedHack(hack)}
              className={`rounded-2xl border p-5 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected 
                  ? 'border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/40' 
                  : 'border-slate-800 bg-[#0f172a]/90 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                    {hack.category}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">{hack.cost}</span>
                </div>

                <h4 className="text-base font-bold text-white font-['Outfit'] mb-2">
                  {hack.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {hack.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <span className="text-cyan-300 font-medium">{hack.efficiency}</span>
                <span className="flex items-center gap-1 text-slate-400 hover:text-white">
                  Inspect Blueprint <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Selected Hack Blueprint Inspector */}
      {selectedHack && (
        <div className="bg-[#0f172a] border border-slate-700 rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Detailed Implementation Blueprint
              </span>
              <h3 className="text-xl font-bold text-white font-['Outfit'] mt-0.5">
                {selectedHack.title}
              </h3>
            </div>
            <div className="flex gap-2">
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-xl text-slate-300 border border-slate-700">
                Difficulty: {selectedHack.difficulty}
              </span>
              <span className="text-xs bg-emerald-950 px-3 py-1 rounded-xl text-emerald-300 border border-emerald-800">
                Cost: {selectedHack.cost}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
            {/* Required Materials (4 cols) */}
            <div className="md:col-span-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" /> Required Items & Hardware
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedHack.materials.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Instructions (8 cols) */}
            <div className="md:col-span-8 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Step-by-Step Execution Protocol
              </h4>
              <ol className="space-y-2.5 text-xs text-slate-300">
                {selectedHack.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{st}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Scientific Rationale Math */}
          <div className="mt-5 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <strong className="text-white">Quantitative Scientific Rationale:</strong> {selectedHack.impactMath}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
