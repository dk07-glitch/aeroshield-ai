import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartHandshake, 
  Users, 
  MapPin, 
  AlertOctagon, 
  ShoppingBag, 
  GraduationCap, 
  MessageSquare, 
  Plus, 
  Check, 
  ExternalLink, 
  Shield, 
  Send,
  X
} from 'lucide-react';
import { sanitizeInput } from '../utils/security';

export default function CommunityActionHub({ city }) {
  const [reports, setReports] = useState([
    {
      id: 'rep-1',
      title: 'Open Leaf & Garden Waste Smoldering',
      location: 'Sector 4 / Greenfield Park East',
      status: 'Civic Team Dispatched',
      time: '24 mins ago',
      severity: 'High'
    },
    {
      id: 'rep-2',
      title: 'Excessive Diesel Bus Idling near School Entrance',
      location: 'Central Academy Crossing',
      status: 'Warning Issued',
      time: '1 hour ago',
      severity: 'Medium'
    }
  ]);

  const [newReportTitle, setNewReportTitle] = useState('');
  const [newReportLocation, setNewReportLocation] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [joinedDrives, setJoinedDrives] = useState({});

  const reportButtonRef = useRef(null);

  // Close report modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showReportModal) {
        setShowReportModal(false);
        reportButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showReportModal]);

  const communityDrives = [
    {
      id: 'drive-bulk-filters',
      title: 'Bulk MERV-13 Filter Group Buy',
      organizer: `${city.name} Clean Air Alliance`,
      discount: '45% Wholesale Discount ($8.50 per filter)',
      participants: 128,
      goal: 150,
      icon: ShoppingBag,
      description: 'Pooling bulk orders directly from industrial filter manufacturers to distribute affordable Corsi-Rosenthal build kits to 150 families.'
    },
    {
      id: 'drive-walking-bus',
      title: 'Electric Shuttle & Walking Bus for Elementary Schools',
      organizer: 'Neighborhood Parents Guild',
      discount: 'Zero-Idling School Zone',
      participants: 64,
      goal: 80,
      icon: GraduationCap,
      description: 'Staggered drop-offs and collective walking buses through interior parks to eliminate the 8:00 AM idling gridlock outside school gates.'
    },
    {
      id: 'drive-public-sanctuary',
      title: 'Public Clean Air Safe-Haven Mapping',
      organizer: 'Civic Resilience Council',
      discount: 'Free HEPA Sanctuaries',
      participants: 210,
      goal: 250,
      icon: Shield,
      description: 'Designating local public libraries, community halls, and transit lounges with continuous HEPA air cleaning for delivery riders and vulnerable citizens.'
    }
  ];

  const handleCreateReport = (e) => {
    e.preventDefault();
    const cleanTitle = sanitizeInput(newReportTitle, 100);
    const cleanLoc = sanitizeInput(newReportLocation, 100);
    if (!cleanTitle || !cleanLoc) return;

    const newRep = {
      id: 'rep-' + Date.now(),
      title: cleanTitle,
      location: cleanLoc,
      status: 'Logged & Broadcasted to Civic Cell',
      time: 'Just now',
      severity: 'High'
    };

    setReports([newRep, ...reports]);
    setNewReportTitle('');
    setNewReportLocation('');
    setShowReportModal(false);
    reportButtonRef.current?.focus();
  };

  const toggleJoinDrive = (id) => {
    setJoinedDrives(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section aria-labelledby="community-heading" className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <HeartHandshake className="w-5 h-5 text-purple-400" aria-hidden="true" />
            <h2 id="community-heading" className="text-xl font-bold text-white font-['Outfit']">
              Community Mutual Aid & Collective Smog Action
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Clean air is a public commons. Connect with neighbors in <strong>{city.name}</strong> to bulk-buy filters, eliminate neighborhood burning, and advocate for zero-idling school zones.
          </p>
        </div>

        <button
          ref={reportButtonRef}
          type="button"
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <AlertOctagon className="w-4 h-4" aria-hidden="true" />
          <span>Report Open Burning / Hotspot</span>
        </button>
      </div>

      {/* Community Drives Grid */}
      <div>
        <h3 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-400" aria-hidden="true" />
          Active Community Clean Air Initiatives in {city.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" role="list">
          {communityDrives.map((drive) => {
            const Icon = drive.icon;
            const isJoined = !!joinedDrives[drive.id];
            const currentCount = drive.participants + (isJoined ? 1 : 0);
            const percent = Math.round((currentCount / drive.goal) * 100);

            return (
              <div
                key={drive.id}
                role="listitem"
                className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                      {drive.discount}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base font-['Outfit'] mb-1">
                    {drive.title}
                  </h4>

                  <div className="text-[11px] text-slate-400 mb-3">
                    By {drive.organizer}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {drive.description}
                  </p>
                </div>

                <div>
                  {/* Progress bar */}
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Pledged Citizens</span>
                      <span className="text-cyan-400 font-bold">{currentCount} / {drive.goal}</span>
                    </div>
                    <div 
                      role="progressbar"
                      aria-valuenow={currentCount}
                      aria-valuemin="0"
                      aria-valuemax={drive.goal}
                      aria-label={`${drive.title} pledges: ${currentCount} of ${drive.goal}`}
                      className="w-full bg-slate-800 h-2 rounded-full overflow-hidden"
                    >
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-pressed={isJoined}
                    onClick={() => toggleJoinDrive(drive.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                      isJoined 
                        ? 'bg-purple-950 text-purple-300 border border-purple-700' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-4 h-4 text-purple-400" aria-hidden="true" />
                        <span>You Pledged Support</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Join Neighborhood Initiative</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Citizen Smog & Burning Incident Tracker */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-400" aria-hidden="true" />
            <h3 className="font-bold text-white text-base font-['Outfit']">
              Live Citizen Burning & Hotspot Reports
            </h3>
          </div>
          <span className="text-xs text-slate-400">GPS & Timestamp Verified</span>
        </div>

        <div className="space-y-3" role="list">
          {reports.map((rep) => (
            <div 
              key={rep.id}
              role="listitem"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-100">{rep.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 font-semibold">
                    {rep.severity} Alert
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  <span>{rep.location}</span>
                  <span>• {rep.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                  {rep.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="report-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 id="report-dialog-title" className="font-bold text-white text-base font-['Outfit'] flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-red-400" aria-hidden="true" /> Report Smog Source
              </h3>
              <button 
                type="button"
                onClick={() => {
                  setShowReportModal(false);
                  reportButtonRef.current?.focus();
                }}
                aria-label="Close report dialog"
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4 mt-4">
              <div>
                <label htmlFor="incident-title-input" className="text-xs font-semibold text-slate-300 block mb-1">
                  Incident Type
                </label>
                <input
                  id="incident-title-input"
                  type="text"
                  required
                  maxLength={100}
                  placeholder="e.g. Open plastic/leaf burning, diesel generator smoke..."
                  value={newReportTitle}
                  onChange={(e) => setNewReportTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus-visible:outline-none focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="incident-location-input" className="text-xs font-semibold text-slate-300 block mb-1">
                  Neighborhood / Locus
                </label>
                <input
                  id="incident-location-input"
                  type="text"
                  required
                  maxLength={100}
                  placeholder="e.g. Near Community Center / Highway Exit 4..."
                  value={newReportLocation}
                  onChange={(e) => setNewReportLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus-visible:outline-none focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                />
              </div>

              <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-xl text-[11px] text-red-300">
                Reports are instantly queued into local municipal control dispatch and broadcast to neighboring community monitors.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowReportModal(false);
                    reportButtonRef.current?.focus();
                  }}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/20 flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Submit Incident</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
