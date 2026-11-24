import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Wind, 
  MapPin, 
  Users, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ChevronDown, 
  Activity, 
  CheckCircle2,
  Calendar,
  Wrench,
  Leaf,
  BarChart3,
  HeartHandshake
} from 'lucide-react';
import { CITIES, PERSONAS } from '../data/mockData';

export default function Navbar({ 
  currentCity, 
  setCity, 
  currentPersona, 
  setPersona,
  activeTab,
  setActiveTab
}) {
  const [showCityModal, setShowCityModal] = useState(false);
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [customCityName, setCustomCityName] = useState('');
  const [audioCtx, setAudioCtx] = useState(null);
  const [noiseNode, setNoiseNode] = useState(null);

  // Gentle Pink/Brown Noise Generator for Respiratory Calm & Focus using Web Audio API
  const toggleAmbientSound = () => {
    if (!isAudioPlaying) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Lowpass filter for smooth rain/air filter sound
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        setAudioCtx(ctx);
        setNoiseNode(whiteNoise);
        setIsAudioPlaying(true);
      } catch (err) {
        console.error('Web Audio error:', err);
      }
    } else {
      if (noiseNode) {
        try { noiseNode.stop(); } catch(e) {}
      }
      if (audioCtx) {
        try { audioCtx.close(); } catch(e) {}
      }
      setIsAudioPlaying(false);
    }
  };

  const navItems = [
    { id: 'radar', label: 'Smog Radar & Inversion', icon: Activity },
    { id: 'copilot', label: 'Aura GenAI Copilot', icon: Sparkles },
    { id: 'routine', label: 'Daily Routine', icon: Calendar },
    { id: 'iaq', label: 'IAQ Hacks & DIY Lab', icon: Wrench },
    { id: 'alternatives', label: 'Sustainable Switches', icon: Leaf },
    { id: 'impact', label: 'Impact Calculator', icon: BarChart3 },
    { id: 'community', label: 'Community Hub', icon: HeartHandshake },
  ];

  const handleAddCustomCity = (e) => {
    e.preventDefault();
    if (!customCityName.trim()) return;
    const newCity = {
      id: 'custom-' + Date.now(),
      name: customCityName.trim(),
      country: 'Custom Station',
      aqi: Math.floor(Math.random() * 200 + 150),
      category: 'Unhealthy / Smog Alert',
      color: '#f97316',
      pm25: 110.5,
      pm10: 160.0,
      no2: 45.0,
      so2: 15.0,
      co: 1.8,
      temp: 9,
      humidity: 76,
      windSpeed: 4.2,
      inversionHeight: 260,
      solarMixingWindow: '13:00 - 15:00',
      primarySources: [
        { name: 'Vehicular Traffic', percentage: 40, icon: 'Car' },
        { name: 'Domestic Biomass/Heating', percentage: 35, icon: 'Flame' },
        { name: 'Inversion Stagnation', percentage: 25, icon: 'CloudFog' }
      ],
      forecast: [
        { time: '06:00', aqi: 240, pm25: 160, temp: 7, advisory: 'Early morning inversion peak' },
        { time: '12:00', aqi: 180, pm25: 115, temp: 12, advisory: 'Solar boundary heating' },
        { time: '14:00', aqi: 155, pm25: 95, temp: 14, advisory: '15-minute ventilation window' },
        { time: '21:00', aqi: 235, pm25: 155, temp: 8, advisory: 'Nocturnal cooling trap' }
      ]
    };
    setCity(newCity);
    setCustomCityName('');
    setShowCityModal(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d18]/85 border-b border-slate-800/80 shadow-2xl transition-all">
      {/* Top Banner Alert Bar */}
      <div className="bg-gradient-to-r from-red-950/70 via-amber-950/50 to-red-950/70 border-b border-red-500/20 px-4 py-1.5 text-xs flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-semibold text-red-300">Severe Winter Smog Alert:</span>
          <span className="hidden sm:inline text-slate-300">
            {currentCity.name} experiencing extreme atmospheric stagnation (Inversion height {currentCity.inversionHeight}m).
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-medium">Ventilation Window: {currentCity.solarMixingWindow}</span>
          <button 
            onClick={toggleAmbientSound}
            title={isAudioPlaying ? "Mute Air Sanctuary Sound" : "Play Clean Air Ambient Rain/Noise"}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700 transition"
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden md:inline">{isAudioPlaying ? "Soothing Air Sound ON" : "Soothing Air Sound"}</span>
          </button>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('radar')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 shadow-lg shadow-cyan-500/25 border border-cyan-300/30">
              <ShieldAlert className="w-6 h-6 text-white" />
              <Wind className="w-3.5 h-3.5 text-cyan-200 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent font-['Outfit']">
                  AeroShield AI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                  GenAI v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Winter Smog & Urban Clean Air Navigator
              </p>
            </div>
          </div>

          {/* Quick Controls: City Picker & Persona Picker */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* City Selector Button */}
            <button
              onClick={() => setShowCityModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/70 hover:border-cyan-500/50 transition-all text-xs font-medium text-slate-200 shadow-sm group"
            >
              <MapPin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 leading-none">Location</div>
                <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                  {currentCity.name}
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                    currentCity.aqi > 300 ? 'bg-red-950 text-red-400' : 
                    currentCity.aqi > 150 ? 'bg-orange-950 text-orange-400' : 'bg-amber-950 text-amber-400'
                  }`}>
                    {currentCity.aqi} AQI
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Persona Selector Button */}
            <button
              onClick={() => setShowPersonaModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/70 hover:border-purple-500/50 transition-all text-xs font-medium text-slate-200 shadow-sm group"
            >
              <Users className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <div className="text-left hidden md:block">
                <div className="text-[10px] text-slate-400 leading-none">Family Persona</div>
                <div className="font-semibold text-slate-100 truncate max-w-[130px]">
                  {currentPersona.title}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

        </div>

        {/* Tab Navigation Navigation Pills */}
        <nav className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'copilot' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Modal: Select City */}
      {showCityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-slate-700/80 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Outfit']">Select Smog Hotspot or Add City</h3>
              </div>
              <button 
                onClick={() => setShowCityModal(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* City Preset List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4 max-h-60 overflow-y-auto pr-1">
              {CITIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCity(c);
                    setShowCityModal(false);
                  }}
                  className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    currentCity.id === c.id 
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200' 
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className="text-[11px] text-slate-400">{c.country}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: `${c.color}25`, color: c.color }}>
                      {c.aqi} AQI
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">{c.temp}°C | {c.windSpeed} km/h</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom City Input Form */}
            <form onSubmit={handleAddCustomCity} className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Or enter custom neighborhood/city..."
                value={customCityName}
                onChange={(e) => setCustomCityName(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition"
              >
                Set Location
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Select Persona */}
      {showPersonaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-slate-700/80 rounded-2xl w-full max-w-xl p-6 shadow-2xl text-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white font-['Outfit']">Select Household & Lifestyle Persona</h3>
              </div>
              <button 
                onClick={() => setShowPersonaModal(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              AeroShield customizes all daily schedules, outdoor warnings, and IAQ filtration thresholds based on the physiological vulnerability of your household.
            </p>

            <div className="space-y-2.5 my-4 max-h-80 overflow-y-auto pr-1">
              {PERSONAS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setPersona(p);
                    setShowPersonaModal(false);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    currentPersona.id === p.id 
                      ? 'border-purple-500 bg-purple-950/30' 
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">{p.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/50">
                        {p.badge}
                      </span>
                    </div>
                    {currentPersona.id === p.id && (
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.vulnerabilities.map((v, i) => (
                      <span key={i} className="text-[10px] bg-slate-800/90 text-slate-400 px-2 py-0.5 rounded-md">
                        • {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
