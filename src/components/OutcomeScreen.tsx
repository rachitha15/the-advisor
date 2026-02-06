'use client';

import { AgentType } from '@/lib/types/game';
import { getBehindTheScenes } from '@/lib/data/behindTheScenes';

interface StatChange {
  energy?: number;
  bond?: number;
  sanity?: number;
}

interface AgentReaction {
  agent: AgentType;
  trustChange: number;
  reaction: string;
}

interface OutcomeScreenProps {
  choiceId: string;
  choiceText: string;
  outcomeText: string;
  statChanges: StatChange;
  previousStats: {
    energy: number;
    bond: number;
    sanity: number;
  };
  newStats: {
    energy: number;
    bond: number;
    sanity: number;
  };
  agentReactions: AgentReaction[];
  scenarioNumber: number;
  onContinue: () => void;
}

export default function OutcomeScreen({
  choiceText,
  outcomeText,
  statChanges,
  newStats,
  agentReactions,
  scenarioNumber,
  onContinue,
}: OutcomeScreenProps) {
  // Get Behind The Scenes content for this scenario
  const behindTheScenesContent = getBehindTheScenes(scenarioNumber);
  const showBehindTheScenes = behindTheScenesContent !== null;

  // Agent config for icons and colors
  const agentConfig: Record<
    AgentType,
    { icon: string; color: string; bgColor: string }
  > = {
    baby: {
      icon: 'child_care',
      color: 'text-pink-300',
      bgColor: 'bg-pink-500/20 border-pink-500/30',
    },
    survival: {
      icon: 'shield',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-500/20 border-yellow-500/30',
    },
    rational: {
      icon: 'psychology',
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20 border-blue-500/30',
    },
    chaos: {
      icon: 'shuffle',
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20 border-purple-500/30',
    },
    work: {
      icon: 'work',
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20 border-orange-500/30',
    },
  };

  // Get stat icon and color
  const getStatConfig = (statName: string) => {
    const configs = {
      energy: { icon: 'bolt', color: 'text-yellow-400' },
      bond: { icon: 'favorite', color: 'text-pink-400' },
      sanity: { icon: 'psychology', color: 'text-blue-400' },
    };
    return configs[statName as keyof typeof configs];
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-32">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
          <div className="flex items-center justify-center px-4 py-3">
            <h2 className="text-base font-bold leading-tight tracking-wide uppercase opacity-90">
              Scenario {scenarioNumber} Complete
            </h2>
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-6 p-4">
          {/* Choice Title */}
          <div className="flex flex-col items-center pt-4">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                Your Choice
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-center leading-tight tracking-tight">
              {choiceText}
            </h1>
          </div>

          {/* Outcome Text */}
          <div className="bg-white/5 dark:bg-white/5 rounded-2xl p-5 border border-white/5">
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {outcomeText}
            </p>
          </div>

          {/* Stat Changes */}
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(statChanges).map(([stat, change]) => {
              if (change === undefined) return null;
              const config = getStatConfig(stat);
              const newValue = newStats[stat as keyof typeof newStats];
              const isPositive = change > 0;
              const isNeutral = change === 0;

              return (
                <div
                  key={stat}
                  className="relative flex flex-col items-center justify-center gap-2 rounded-xl bg-[#1c3a25] p-4 text-center shadow-lg border border-white/5"
                >
                  {/* Floating Change Badge */}
                  {!isNeutral && (
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full font-bold text-sm shadow-lg ${
                        isPositive
                          ? 'bg-primary text-black'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">
                          {isPositive ? 'arrow_upward' : 'arrow_downward'}
                        </span>
                        {isPositive ? '+' : ''}
                        {change}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mt-1 rounded-full bg-white/10 p-2">
                    <span className={`material-symbols-outlined ${config.color} text-[20px]`}>
                      {config.icon}
                    </span>
                  </div>

                  {/* Stat Name */}
                  <p className="text-xs font-medium text-gray-300 uppercase tracking-wide capitalize">
                    {stat}
                  </p>

                  {/* Final Value - Larger */}
                  <p className="text-2xl font-bold text-white">{newValue}/100</p>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isPositive
                          ? 'bg-primary'
                          : isNeutral
                          ? 'bg-gray-500'
                          : 'bg-red-500'
                      } transition-all duration-500`}
                      style={{ width: `${newValue}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Agent Reactions */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white px-2">Advisor Reactions</h3>
            <div className="flex flex-col gap-3">
              {agentReactions.map((reaction) => {
                const config = agentConfig[reaction.agent];
                const isPositive = reaction.trustChange > 0;
                const trustLevel = isPositive ? 'Trust High' : 'Trust Lowered';

                return (
                  <div
                    key={reaction.agent}
                    className="flex items-center gap-4 rounded-xl bg-white/5 p-4 border border-white/5"
                  >
                    {/* Agent Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className={`size-12 rounded-full ${config.bgColor} flex items-center justify-center border`}
                      >
                        <span className={`material-symbols-outlined ${config.color}`}>
                          {config.icon}
                        </span>
                      </div>
                      {/* Thumb indicator */}
                      <div
                        className={`absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full ${
                          isPositive ? 'bg-primary text-black' : 'bg-red-500 text-white'
                        } ring-2 ring-[#102215]`}
                      >
                        <span className="material-symbols-outlined text-[14px] font-bold">
                          {isPositive ? 'thumb_up' : 'thumb_down'}
                        </span>
                      </div>
                    </div>

                    {/* Agent Name and Trust Bar */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-bold text-white truncate capitalize">
                          {reaction.agent} Agent
                        </p>
                        <span
                          className={`text-xs font-semibold ${
                            isPositive ? 'text-primary' : 'text-red-400'
                          }`}
                        >
                          {trustLevel}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2 italic">&quot;{reaction.reaction}&quot;</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Behind The Scenes - Only for scenarios 1, 3, 5 */}
          {showBehindTheScenes && behindTheScenesContent && (
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10 group bg-[#1c3a25]">
              {/* Background Pattern */}
              <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay"></div>
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1c3a25]/90 to-[#102215]"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col p-6 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    {behindTheScenesContent.title}
                  </h3>
                  <div className="space-y-4">
                    {behindTheScenesContent.points.map((point, index) => {
                      // Empty strings for spacing
                      if (point === '') {
                        return <div key={index} className="h-2"></div>;
                      }

                      // Regular paragraph - clean and readable
                      return (
                        <p
                          key={index}
                          className="text-gray-200 text-base leading-relaxed"
                        >
                          {point}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-40">
          <button
            onClick={onContinue}
            className="w-full h-14 bg-primary hover:bg-green-400 text-[#102215] rounded-full font-bold text-lg shadow-[0_0_20px_rgba(19,236,73,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            {scenarioNumber === 5 ? 'See Your Results' : 'Continue to Next Scenario'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
