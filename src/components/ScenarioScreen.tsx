'use client';

import { Scenario } from '@/lib/types/game';

interface ScenarioScreenProps {
  scenario: Scenario;
  onConsultAdvisors: () => void;
}

export default function ScenarioScreen({
  scenario,
  onConsultAdvisors,
}: ScenarioScreenProps) {
  const { title, context, situation, startingStats } = scenario;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-night-bg shadow-xl overflow-hidden">
      {/* Ambient glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-lamp-glow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Header */}
      <header className="flex items-center px-6 pt-12 pb-4 w-full z-10">
        <div className="flex flex-col items-start">
          <span className="text-xs font-bold tracking-widest text-primary/80 uppercase mb-1">
            {context}
          </span>
          <h1 className="text-lg font-bold leading-tight text-white tracking-tight">
            {title}
          </h1>
        </div>
      </header>

      {/* Starting Stats */}
      <div className="px-6 pb-6">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 pl-1">
          Starting Stats
        </h3>
        <div className="flex gap-3">
          {/* Energy Stat */}
          <div className="flex-1 bg-white/5 rounded-2xl p-2.5 border border-white/5 flex flex-col items-center gap-1 shadow-sm backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                battery_low
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-200">
                {startingStats.energy}/100
              </span>
              <span className="text-[9px] uppercase tracking-wide text-gray-500">
                Energy
              </span>
            </div>
          </div>

          {/* Sanity Stat */}
          <div className="flex-1 bg-white/5 rounded-2xl p-2.5 border border-white/5 flex flex-col items-center gap-1 shadow-sm backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                psychology
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-200">
                {startingStats.sanity}/100
              </span>
              <span className="text-[9px] uppercase tracking-wide text-gray-500">
                Sanity
              </span>
            </div>
          </div>

          {/* Bond Stat */}
          <div className="flex-1 bg-white/5 rounded-2xl p-2.5 border border-white/5 flex flex-col items-center gap-1 shadow-sm backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                favorite
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-200">
                {startingStats.bond}/100
              </span>
              <span className="text-[9px] uppercase tracking-wide text-gray-500">
                Bond
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col relative px-6 pb-6">
        {/* Scenario Situation Card */}
        <div className="relative bg-[#1A232E] rounded-3xl p-6 border border-white/5 shadow-lg">
          {/* Speech bubble triangle */}
          <div className="absolute -top-3 left-8 w-6 h-6 bg-[#1A232E] rotate-45 border-t border-l border-white/5"></div>
          <p className="text-lg leading-relaxed text-gray-300">{situation}</p>
        </div>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full p-6 pt-8 bg-gradient-to-t from-night-bg via-night-bg to-transparent pointer-events-none flex justify-center max-w-md mx-auto left-0 right-0">
        <button
          onClick={onConsultAdvisors}
          className="pointer-events-auto w-full bg-primary hover:bg-[#0fd641] active:scale-[0.98] transition-all duration-200 text-text-dark font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group ring-4 ring-primary/10"
        >
          <span>Consult Advisors</span>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
