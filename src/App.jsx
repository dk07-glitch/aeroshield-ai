import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import SmogHeroRadar from './components/SmogHeroRadar';
import GenAICopilot from './components/GenAICopilot';
import DailyRoutineScheduler from './components/DailyRoutineScheduler';
import IAQHacksLab from './components/IAQHacksLab';
import SustainableAlternatives from './components/SustainableAlternatives';
import ImpactCalculator from './components/ImpactCalculator';
import CommunityActionHub from './components/CommunityActionHub';
import ErrorBoundary from './components/ErrorBoundary';
import { CITIES, PERSONAS } from './data/mockData';
import { 
  HeartPulse, 
  ShieldAlert, 
  Wind, 
  ExternalLink, 
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';

export default function App() {
  const [currentCity, setCurrentCity] = useState(CITIES[0]); // Default New Delhi & NCR
  const [currentPersona, setCurrentPersona] = useState(PERSONAS[0]); // Default Young Family with Toddlers
  const [activeTab, setActiveTab] = useState('radar');
  const [showHealthEmergency, setShowHealthEmergency] = useState(false);

  const emergencyButtonRef = useRef(null);

  // Close emergency modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showHealthEmergency) {
        setShowHealthEmergency(false);
        emergencyButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHealthEmergency]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
        
        {/* Dynamic Ambient Background Glows */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" aria-hidden="true"></div>
        <div className="fixed bottom-10 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" aria-hidden="true"></div>

        {/* Navigation Bar */}
        <Navbar
          currentCity={currentCity}
          setCity={setCurrentCity}
          currentPersona={currentPersona}
          setPersona={setCurrentPersona}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Area */}
        <main 
          id="main-content" 
          role="main"
          className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 relative z-10"
        >
          {/* Quick Context Pill */}
          <div 
            role="region" 
            aria-label="Current Station & Household Context"
            className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl px-4 py-2.5 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Atmospheric Station:</span>
              <span className="font-bold text-white">{currentCity.name}</span>
              <span className="text-slate-600" aria-hidden="true">•</span>
              <span className="text-slate-400">Household Target:</span>
              <span className="font-bold text-purple-300">{currentPersona.title}</span>
              <span className="text-slate-600" aria-hidden="true">•</span>
              <span className="text-slate-400">Thermal Ventilation Slot:</span>
              <span className="font-bold text-cyan-300">{currentCity.solarMixingWindow}</span>
            </div>

            <button
              ref={emergencyButtonRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={showHealthEmergency}
              onClick={() => setShowHealthEmergency(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <HeartPulse className="w-3.5 h-3.5 text-red-400 animate-pulse" aria-hidden="true" />
              <span>Respiratory Triage & Symptoms Guide</span>
            </button>
          </div>

          {/* Tab Views */}
          <div 
            id={`panel-${activeTab}`} 
            role="tabpanel" 
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            className="focus-visible:outline-none"
          >
            {activeTab === 'radar' && (
              <SmogHeroRadar 
                city={currentCity} 
                persona={currentPersona} 
              />
            )}

            {activeTab === 'copilot' && (
              <GenAICopilot 
                city={currentCity} 
                persona={currentPersona} 
              />
            )}

            {activeTab === 'routine' && (
              <DailyRoutineScheduler 
                city={currentCity} 
                persona={currentPersona} 
              />
            )}

            {activeTab === 'iaq' && (
              <IAQHacksLab />
            )}

            {activeTab === 'alternatives' && (
              <SustainableAlternatives />
            )}

            {activeTab === 'impact' && (
              <ImpactCalculator 
                city={currentCity} 
                persona={currentPersona} 
              />
            )}

            {activeTab === 'community' && (
              <CommunityActionHub 
                city={currentCity} 
              />
            )}
          </div>

        </main>

        {/* Respiratory Health Emergency Modal */}
        {showHealthEmergency && (
          <div 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="emergency-dialog-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <div className="bg-[#0f172a] border border-red-500/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
                    <HeartPulse className="w-5 h-5 animate-pulse" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="emergency-dialog-title" className="text-lg font-bold text-white font-['Outfit']">
                      Respiratory Triage & Red-Flag Protocol
                    </h2>
                    <div className="text-[11px] text-red-400 font-semibold">
                      For Severe Winter Smog (PM2.5 &gt; 150 µg/m³)
                    </div>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setShowHealthEmergency(false);
                    emergencyButtonRef.current?.focus();
                  }}
                  aria-label="Close emergency triage guide"
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-4 my-5 text-xs text-slate-300">
                <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-800/40">
                  <h3 className="font-bold text-red-300 mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" aria-hidden="true" /> Seek Immediate Emergency Care If:
                  </h3>
                  <ul className="space-y-1 list-disc list-inside text-red-200">
                    <li>Inability to complete full sentences without gasping for breath</li>
                    <li>Retractions (chest/ribs pulling inward during breathing in children)</li>
                    <li>Bluish discoloration of lips, nailbeds, or tongue (cyanosis)</li>
                    <li>Peak flow drops below 50% of personal best despite rescue inhaler</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <h3 className="font-bold text-slate-100 flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-cyan-400" aria-hidden="true" /> At-Home Airway Recovery Protocols:
                  </h3>
                  <p>1. <strong>Nebulizer & Spacers:</strong> Always administer bronchodilators with a valve holding chamber/spacer for maximum lung deposition.</p>
                  <p>2. <strong>Warm Saline Gargle & Nasal Wash:</strong> Flushes coarse soot aerosols from the nasopharynx before they trigger mucosal swelling.</p>
                  <p>3. <strong>Elevated Sleeping Angle:</strong> Sleep with head elevated 30 degrees to minimize nocturnal airway collapse and post-nasal drip irritation.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowHealthEmergency(false);
                  emergencyButtonRef.current?.focus();
                }}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                I Understand & Acknowledge
              </button>
            </div>
          </div>
        )}

        {/* Elegant Footer */}
        <footer className="mt-12 border-t border-slate-800/80 bg-[#090d18] text-slate-400 text-xs py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white font-['Outfit']">AeroShield AI</span>
              <span>• Built for Families & Resilient Communities Facing Severe Urban Smog</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span>WHO IAQ Guideline Compliant</span>
              <span aria-hidden="true">•</span>
              <span>Corsi-Rosenthal Open Architecture</span>
              <span aria-hidden="true">•</span>
              <span>Atmospheric Boundary Modeling</span>
            </div>
          </div>
        </footer>

      </div>
    </ErrorBoundary>
  );
}
