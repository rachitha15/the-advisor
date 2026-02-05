'use client';

import { AgentType, Choice } from '@/lib/types/game';

interface AgentResponse {
  agent: AgentType;
  response: string;
}

interface DebateScreenProps {
  agentResponses: {
    round1: AgentResponse[];
    round2: AgentResponse[];
  };
  choices: Choice[];
  onChoiceSelect: (choiceId: string) => void;
  currentStats: {
    energy: number;
    bond: number;
    sanity: number;
  };
  scenarioId?: number; // Used to determine if Work agent should be shown (scenario 5)
}

export default function DebateScreen({
  agentResponses,
  choices,
  onChoiceSelect,
  currentStats,
  scenarioId = 1,
}: DebateScreenProps) {
  // Agent configuration for styling and icons
  const agentConfig: Record<
    AgentType,
    {
      label: string;
      color: string;
      bgColor: string;
      borderColor: string;
      alignment: 'left' | 'right';
    }
  > = {
    baby: {
      label: 'Baby Agent',
      color: 'text-primary',
      bgColor: 'bg-card-highlight',
      borderColor: 'border-primary/20',
      alignment: 'left',
    },
    survival: {
      label: 'Survival Agent',
      color: 'text-slate-400',
      bgColor: 'bg-[#1e2a24]',
      borderColor: 'border-white/5',
      alignment: 'right',
    },
    rational: {
      label: 'Rational Agent',
      color: 'text-blue-400',
      bgColor: 'bg-[#1a2530]',
      borderColor: 'border-blue-500/10',
      alignment: 'right',
    },
    work: {
      label: 'Work Agent',
      color: 'text-orange-400',
      bgColor: 'bg-[#2a1f1d]',
      borderColor: 'border-orange-500/10',
      alignment: 'left',
    },
    chaos: {
      label: 'Chaos Agent',
      color: 'text-purple-400',
      bgColor: 'bg-[#2a1d2e]',
      borderColor: 'border-purple-500/10',
      alignment: 'right',
    },
  };

  // Choice icons mapping
  const choiceIcons: Record<string, string> = {
    choice1: 'child_care',
    choice2: 'coffee',
    choice3: 'call',
  };

  // Combine all responses in order
  const allResponses = [
    ...agentResponses.round1.map((r) => ({ ...r, round: 1 })),
    ...agentResponses.round2.map((r) => ({ ...r, round: 2 })),
  ];

  // Find the primary choice (first one) for highlighting
  const primaryChoiceId = choices[0]?.id;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-x-hidden">
      {/* Mobile Container Wrapper */}
      <div className="relative flex flex-col min-h-screen w-full md:max-w-[420px] md:mx-auto md:border-x md:border-white/5 shadow-2xl">
        {/* Header / Stats Section */}
        <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-white/5 pt-6 pb-4 px-4">
          <div className="flex items-center justify-between gap-3">
            {/* Energy Stat */}
            <div className="flex flex-col items-center flex-1 gap-1">
              <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Energy
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.4)] transition-all duration-500"
                  style={{ width: `${currentStats.energy}%` }}
                ></div>
              </div>
            </div>

            {/* Sanity Stat */}
            <div className="flex flex-col items-center flex-1 gap-1">
              <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                Sanity
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(19,236,73,0.4)] transition-all duration-500"
                  style={{ width: `${currentStats.sanity}%` }}
                ></div>
              </div>
            </div>

            {/* Bond Stat */}
            <div className="flex flex-col items-center flex-1 gap-1">
              <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">favorite</span>
                Bond
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.4)] transition-all duration-500"
                  style={{ width: `${currentStats.bond}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 flex flex-col p-4 pb-96 gap-6">
          {/* Section Title */}
          <div className="text-center py-2">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-primary mb-2">
              Current Conflict
            </span>
            <h1 className="text-2xl font-bold leading-tight tracking-tight">The Debate</h1>
          </div>

          {/* Agent Messages / Chat */}
          <div className="flex flex-col gap-5">
            {allResponses.map((response, index) => {
              const config = agentConfig[response.agent];
              const isLeftAligned = config.alignment === 'left';

              return (
                <div
                  key={`${response.agent}-${response.round}-${index}`}
                  className={`flex items-start gap-3 ${
                    isLeftAligned ? '' : 'flex-row-reverse'
                  } group animate-in slide-in-from-bottom-2 fade-in duration-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Agent Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 bg-cover bg-center ${
                        response.agent === 'baby'
                          ? 'ring-2 ring-primary shadow-[0_0_15px_rgba(19,236,73,0.3)]'
                          : response.agent === 'rational'
                          ? 'opacity-80 ring-1 ring-blue-400/30'
                          : response.agent === 'chaos'
                          ? 'ring-1 ring-purple-500/50'
                          : 'opacity-80 ring-1 ring-white/20 grayscale'
                      }`}
                    ></div>
                    {/* Special indicator for Baby agent */}
                    {response.agent === 'baby' && (
                      <div className="absolute -bottom-1 -right-1 bg-primary text-black rounded-full p-[2px]">
                        <span className="material-symbols-outlined text-[12px] block font-bold">
                          priority_high
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`flex flex-col ${
                      isLeftAligned ? 'items-start' : 'items-end'
                    } gap-1 max-w-[85%]`}
                  >
                    <span
                      className={`${config.color} text-xs font-bold uppercase tracking-wide ${
                        isLeftAligned ? 'ml-1' : 'mr-1'
                      }`}
                    >
                      {config.label}
                    </span>
                    <div
                      className={`${config.bgColor} ${config.borderColor} rounded-2xl ${
                        isLeftAligned ? 'rounded-tl-none' : 'rounded-tr-none'
                      } px-4 py-3 text-white border shadow-lg`}
                    >
                      <p className="text-sm font-medium leading-relaxed">{response.response}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Bottom Action Deck - Choice Buttons */}
        <div className="fixed md:absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-dark via-background-dark to-transparent pt-12 z-30">
          <div className="flex flex-col gap-3">
            {choices.map((choice, index) => {
              const isPrimary = choice.id === primaryChoiceId;
              const icon = choiceIcons[choice.id] || 'psychology';

              return (
                <button
                  key={choice.id}
                  onClick={() => onChoiceSelect(choice.id)}
                  className={`relative w-full group overflow-hidden rounded-xl ${
                    isPrimary
                      ? 'bg-card-highlight border-primary/30'
                      : 'bg-card-dark border-white/5 hover:border-slate-500/50'
                  } border p-4 text-left transition-all active:scale-[0.98]`}
                >
                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 ${
                      isPrimary
                        ? 'bg-primary/0 group-hover:bg-primary/5'
                        : 'bg-white/0 group-hover:bg-white/5'
                    } transition-colors duration-300`}
                  ></div>

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                          isPrimary ? 'bg-primary/10 text-primary' : 'bg-white/5 text-slate-300'
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">{icon}</span>
                      </div>

                      {/* Choice Text */}
                      <div>
                        <h3
                          className={`text-base font-bold ${
                            isPrimary
                              ? 'text-white group-hover:text-primary'
                              : 'text-slate-200'
                          } transition-colors`}
                        >
                          {choice.text}
                        </h3>
                        <p className="text-xs font-medium text-slate-500">
                          {choice.followingAgents
                            .map((agent) => agentConfig[agent].label.replace(' Agent', ''))
                            .join(' + ')}{' '}
                          focus
                        </p>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <span
                      className={`material-symbols-outlined ${
                        isPrimary
                          ? 'text-slate-500 group-hover:text-primary'
                          : 'text-slate-600 group-hover:text-slate-300'
                      } transition-colors`}
                    >
                      arrow_forward_ios
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
