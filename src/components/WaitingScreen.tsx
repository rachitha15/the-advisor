'use client';

import { useEffect, useState } from 'react';
import { AgentType } from '@/lib/types/game';

interface WaitingScreenProps {
  currentAgent: AgentType;
  progress: number;
  title: string;
  subtitle: string;
  headerText: string; // Dynamic header text for each scenario
  onTimeout?: () => void;
  onRetry?: () => void;
  timeoutDuration?: number; // in milliseconds, default 30000 (30 seconds)
  scenarioId?: number; // Used to determine if Work agent should be shown (scenario 5)
}

export default function WaitingScreen({
  currentAgent,
  progress,
  title,
  subtitle,
  headerText,
  onTimeout,
  onRetry,
  timeoutDuration = 30000, // 30 seconds default
  scenarioId = 1,
}: WaitingScreenProps) {
  const showWorkAgent = scenarioId === 5;
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timeout logic
  useEffect(() => {
    const startTime = Date.now();

    const timeoutTimer = setTimeout(() => {
      setHasTimedOut(true);
      if (onTimeout) {
        onTimeout();
      }
    }, timeoutDuration);

    // Update elapsed time every second for "taking longer than expected" message
    const elapsedTimer = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => {
      clearTimeout(timeoutTimer);
      clearInterval(elapsedTimer);
    };
  }, [timeoutDuration, onTimeout]);

  // Reset timeout if progress changes (indicates activity)
  useEffect(() => {
    setHasTimedOut(false);
    setElapsedTime(0);
  }, [progress, currentAgent]);

  const isShowingSlowWarning = elapsedTime > 15000 && !hasTimedOut; // Show after 15 seconds

  // Agent configuration with icons and styling
  const agentConfig: Record<
    AgentType,
    { label: string; indicator?: string; animationClass?: string }
  > = {
    baby: {
      label: 'Baby',
      indicator: '?',
      animationClass: 'animate-bounce delay-700',
    },
    survival: {
      label: 'Survival',
      indicator: '...',
      animationClass: 'animate-pulse',
    },
    rational: {
      label: 'Rational',
      indicator: 'Talking...',
      animationClass: 'animate-bounce',
    },
    chaos: {
      label: 'Chaos',
      indicator: '!',
      animationClass: 'animate-ping opacity-50',
    },
    work: {
      label: 'Work',
      indicator: '...',
      animationClass: 'animate-pulse',
    },
  };

  const isAgentActive = (agent: AgentType) => agent === currentAgent;

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d1b11] dark:text-[#e0eadd] font-display min-h-screen flex flex-col overflow-hidden selection:bg-primary selection:text-black">
      {/* Header */}
      <header className="flex items-center p-4 pb-2 justify-between z-10">
        <button className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span aria-label="Back" className="material-symbols-outlined text-2xl">
            arrow_back
          </span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          {headerText}
        </h2>
        <button className="flex h-12 items-center justify-end px-2">
          <span className="text-primary text-base font-bold leading-normal tracking-[0.015em] shrink-0">
            Skip
          </span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 pb-12">
        {/* Agent Avatars Row */}
        <div className="relative w-full mb-8 mt-4">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 dark:bg-white/10 -translate-y-1/2 z-0"></div>

          {/* Agent Grid */}
          <div className={`grid ${showWorkAgent ? 'grid-cols-5' : 'grid-cols-4'} gap-1 relative z-10 w-full items-end`}>
            {/* Baby Agent */}
            <div
              className={`flex flex-col items-center gap-2 group ${
                isAgentActive('baby') ? 'relative -top-3' : 'pb-2'
              }`}
            >
              {isAgentActive('baby') && (
                <div className="absolute -top-8 animate-bounce z-20 w-max">
                  <div className="bg-primary text-[#102215] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                    Talking...
                  </div>
                </div>
              )}
              <div className="relative">
                {!isAgentActive('baby') && agentConfig.baby.indicator && (
                  <div className={`absolute -top-5 right-0 ${agentConfig.baby.animationClass}`}>
                    <span className="text-[10px] bg-white dark:bg-white/10 text-black dark:text-white px-1 py-0.5 rounded opacity-80 font-bold">
                      {agentConfig.baby.indicator}
                    </span>
                  </div>
                )}
                <div
                  className={`overflow-hidden ${
                    isAgentActive('baby') ? 'size-20' : 'size-14'
                  } rounded-full ${
                    isAgentActive('baby')
                      ? 'border-4 border-primary shadow-[0_0_20px_rgba(19,236,73,0.15)]'
                      : 'border-2 border-white dark:border-[#1a3320]'
                  } bg-gray-100 shadow-md`}
                >
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                {isAgentActive('baby') && (
                  <div className="absolute bottom-1 right-1 size-4 bg-primary rounded-full border-2 border-white dark:border-[#102215] z-20"></div>
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isAgentActive('baby')
                    ? 'text-primary text-xs'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {agentConfig.baby.label}
              </span>
            </div>

            {/* Survival Agent */}
            <div
              className={`flex flex-col items-center gap-2 group ${
                isAgentActive('survival') ? 'relative -top-3' : 'pb-2'
              }`}
            >
              {isAgentActive('survival') && (
                <div className="absolute -top-8 animate-bounce z-20 w-max">
                  <div className="bg-primary text-[#102215] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                    Talking...
                  </div>
                </div>
              )}
              <div className="relative">
                {!isAgentActive('survival') && agentConfig.survival.indicator && (
                  <div className={`absolute -top-5 right-0 ${agentConfig.survival.animationClass}`}>
                    <span className="text-lg leading-none text-yellow-500">
                      {agentConfig.survival.indicator}
                    </span>
                  </div>
                )}
                <div
                  className={`overflow-hidden ${
                    isAgentActive('survival') ? 'size-20' : 'size-14'
                  } rounded-full ${
                    isAgentActive('survival')
                      ? 'border-4 border-primary shadow-[0_0_20px_rgba(19,236,73,0.15)]'
                      : 'border-2 border-white dark:border-[#1a3320]'
                  } bg-gray-100 shadow-md`}
                >
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 sepia opacity-80"></div>
                </div>
                {isAgentActive('survival') && (
                  <div className="absolute bottom-1 right-1 size-4 bg-primary rounded-full border-2 border-white dark:border-[#102215] z-20"></div>
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isAgentActive('survival')
                    ? 'text-primary text-xs'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {agentConfig.survival.label}
              </span>
            </div>

            {/* Rational Agent */}
            <div
              className={`flex flex-col items-center gap-2 ${
                isAgentActive('rational') ? 'relative -top-3' : 'pb-2'
              }`}
            >
              {isAgentActive('rational') && (
                <div className="absolute -top-8 animate-bounce z-20 w-max">
                  <div className="bg-primary text-[#102215] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                    Talking...
                  </div>
                </div>
              )}
              <div className="relative">
                <div
                  className={`overflow-hidden ${
                    isAgentActive('rational') ? 'size-20' : 'size-14'
                  } rounded-full ${
                    isAgentActive('rational')
                      ? 'border-4 border-primary shadow-[0_0_20px_rgba(19,236,73,0.15)]'
                      : 'border-2 border-white dark:border-[#1a3320]'
                  } bg-gray-100 shadow-md z-10 relative`}
                >
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                {isAgentActive('rational') && (
                  <div className="absolute bottom-1 right-1 size-4 bg-primary rounded-full border-2 border-white dark:border-[#102215] z-20"></div>
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isAgentActive('rational')
                    ? 'text-primary text-xs'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {agentConfig.rational.label}
              </span>
            </div>

            {/* Chaos Agent */}
            <div
              className={`flex flex-col items-center gap-2 group ${
                isAgentActive('chaos') ? 'relative -top-3' : 'pb-2'
              }`}
            >
              {isAgentActive('chaos') && (
                <div className="absolute -top-8 animate-bounce z-20 w-max">
                  <div className="bg-primary text-[#102215] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                    Talking...
                  </div>
                </div>
              )}
              <div className="relative">
                {!isAgentActive('chaos') && agentConfig.chaos.indicator && (
                  <div className={`absolute -top-4 -right-2 ${agentConfig.chaos.animationClass}`}>
                    <span className="text-xs text-red-400">{agentConfig.chaos.indicator}</span>
                  </div>
                )}
                <div
                  className={`overflow-hidden ${
                    isAgentActive('chaos') ? 'size-20' : 'size-14'
                  } rounded-full ${
                    isAgentActive('chaos')
                      ? 'border-4 border-primary shadow-[0_0_20px_rgba(19,236,73,0.15)]'
                      : 'border-2 border-red-900/50 dark:border-red-500/30'
                  } bg-gray-100 shadow-md`}
                >
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 mix-blend-luminosity brightness-75"></div>
                </div>
                {isAgentActive('chaos') && (
                  <div className="absolute bottom-1 right-1 size-4 bg-primary rounded-full border-2 border-white dark:border-[#102215] z-20"></div>
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isAgentActive('chaos')
                    ? 'text-primary text-xs'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {agentConfig.chaos.label}
              </span>
            </div>

            {/* Work Agent - Only shown in Scenario 5 */}
            {showWorkAgent && (
              <div
                className={`flex flex-col items-center gap-2 group ${
                  isAgentActive('work') ? 'relative -top-3' : 'pb-2'
                }`}
              >
                {isAgentActive('work') && (
                  <div className="absolute -top-8 animate-bounce z-20 w-max">
                    <div className="bg-primary text-[#102215] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                      Talking...
                    </div>
                  </div>
                )}
                <div className="relative">
                  <div
                    className={`overflow-hidden ${
                      isAgentActive('work') ? 'size-20' : 'size-14'
                    } rounded-full ${
                      isAgentActive('work')
                        ? 'border-4 border-primary shadow-[0_0_20px_rgba(19,236,73,0.15)]'
                        : 'border-2 border-orange-500/30'
                    } bg-gray-100 shadow-md`}
                  >
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                  {isAgentActive('work') && (
                    <div className="absolute bottom-1 right-1 size-4 bg-primary rounded-full border-2 border-white dark:border-[#102215] z-20"></div>
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isAgentActive('work')
                      ? 'text-primary text-xs'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Work
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Text */}
        <div className="text-center mb-10 w-full px-4">
          <h1 className="text-2xl font-bold leading-tight mb-2">{title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-[280px] mb-12">
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 px-1">
            <span>Dissonance</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-primary rounded-full relative overflow-hidden animate-pulse transition-all duration-500"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
            </div>
          </div>
        </div>

        {/* Latest Response Preview Card or Error State */}
        {hasTimedOut ? (
          // Error State
          <div className="w-full bg-red-500/10 rounded-2xl p-5 shadow-sm border border-red-500/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="bg-red-500/20 rounded-full p-3 text-red-400">
                <span className="material-symbols-outlined text-3xl">error</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Request Timed Out
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  The advisors are taking longer than expected. Please try again.
                </p>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="bg-primary hover:bg-green-400 text-[#102215] font-bold py-3 px-6 rounded-full transition-all active:scale-95 flex items-center gap-2 mx-auto"
                  >
                    <span className="material-symbols-outlined">refresh</span>
                    Retry
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Normal State
          <div className="w-full bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2 shrink-0 text-primary">
                <span className="material-symbols-outlined text-xl">psychology</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0d1b11] dark:text-white mb-1">
                  {agentConfig[currentAgent].label} Agent
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Processing response...
                </p>
                {isShowingSlowWarning && (
                  <p className="text-xs text-yellow-400 mt-2 italic">
                    This is taking longer than expected...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Gradient Fade at Bottom */}
      <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
    </div>
  );
}
