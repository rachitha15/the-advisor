'use client';

import { useState } from 'react';
import WaitingScreen from '@/components/WaitingScreen';
import DebateScreen from '@/components/DebateScreen';
import { AgentType } from '@/lib/types/game';
import { scenarios } from '@/lib/data/scenarios';

export default function TestScreensPage() {
  const [currentScreen, setCurrentScreen] = useState<'waiting' | 'debate'>('waiting');
  const [currentAgent, setCurrentAgent] = useState<AgentType>('rational');

  // Example agent responses for DebateScreen
  const exampleResponses = {
    round1: [
      { agent: 'baby' as AgentType, response: 'I need you right now.' },
      { agent: 'survival' as AgentType, response: 'You are going to break.' },
      { agent: 'rational' as AgentType, response: "Crying won't harm the baby." },
      { agent: 'chaos' as AgentType, response: 'Try a warm bath! Or white noise? Maybe colic?' },
    ],
    round2: [
      { agent: 'baby' as AgentType, response: 'But I still need comfort...' },
      {
        agent: 'survival' as AgentType,
        response: "Your needs matter too. You can't pour from an empty cup.",
      },
      {
        agent: 'rational' as AgentType,
        response: 'Short breaks help you parent better.',
      },
      {
        agent: 'chaos' as AgentType,
        response: 'My aunt says never let them cry! But sleep training works!',
      },
    ],
  };

  const handleChoiceSelect = (choiceId: string) => {
    console.log('Choice selected:', choiceId);
    alert(`You selected: ${choiceId}`);
  };

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Screen Selector */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setCurrentScreen('waiting')}
          className={`px-4 py-2 rounded-lg font-bold text-sm ${
            currentScreen === 'waiting'
              ? 'bg-primary text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Waiting
        </button>
        <button
          onClick={() => setCurrentScreen('debate')}
          className={`px-4 py-2 rounded-lg font-bold text-sm ${
            currentScreen === 'debate'
              ? 'bg-primary text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Debate
        </button>
      </div>

      {/* Agent Selector for Waiting Screen */}
      {currentScreen === 'waiting' && (
        <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
          <p className="text-white text-xs font-bold">Current Agent:</p>
          {(['baby', 'survival', 'rational', 'chaos'] as AgentType[]).map((agent) => (
            <button
              key={agent}
              onClick={() => setCurrentAgent(agent)}
              className={`px-3 py-1 rounded-lg font-bold text-xs capitalize ${
                currentAgent === agent
                  ? 'bg-primary text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {agent}
            </button>
          ))}
        </div>
      )}

      {/* Render Current Screen */}
      {currentScreen === 'waiting' && (
        <WaitingScreen
          currentAgent={currentAgent}
          progress={88}
          title="The advisors are weighing in on your 1:00 AM crisis..."
          subtitle="Processing physiological needs and emotional noise."
          headerText="The First Night"
        />
      )}

      {currentScreen === 'debate' && (
        <DebateScreen
          agentResponses={exampleResponses}
          choices={scenarios[0].choices}
          onChoiceSelect={handleChoiceSelect}
          currentStats={{
            energy: 30,
            bond: 70,
            sanity: 40,
          }}
        />
      )}
    </div>
  );
}
