'use client';

import { useState } from 'react';
import {
  ScenarioScreen,
  WaitingScreen,
  DebateScreen,
  OutcomeScreen,
  ResultsScreen,
} from '@/components';
import { scenarios } from '@/lib/data/scenarios';
import { AgentType } from '@/lib/types/game';

type ScreenType = 'scenario' | 'waiting' | 'debate' | 'outcome' | 'results';

export default function TestAllScreensPage() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('scenario');

  // Example data for testing
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

  const screens: { id: ScreenType; label: string }[] = [
    { id: 'scenario', label: 'Scenario' },
    { id: 'waiting', label: 'Waiting' },
    { id: 'debate', label: 'Debate' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'results', label: 'Results' },
  ];

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Screen Selector */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 bg-black/80 backdrop-blur-md p-3 rounded-xl">
        <p className="text-white text-xs font-bold mb-1">Select Screen:</p>
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => setCurrentScreen(screen.id)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              currentScreen === screen.id
                ? 'bg-primary text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {screen.label}
          </button>
        ))}
      </div>

      {/* Render Current Screen */}
      {currentScreen === 'scenario' && (
        <ScenarioScreen
          scenario={scenarios[0]}
          onConsultAdvisors={() => console.log('Consult Advisors clicked')}
        />
      )}

      {currentScreen === 'waiting' && (
        <WaitingScreen
          currentAgent="rational"
          progress={75}
          title="The advisors are weighing in on your 1:00 AM crisis..."
          subtitle="Processing physiological needs and emotional noise."
          headerText="The First Night"
        />
      )}

      {currentScreen === 'debate' && (
        <DebateScreen
          agentResponses={exampleResponses}
          choices={scenarios[0].choices}
          onChoiceSelect={(id) => console.log('Choice:', id)}
          currentStats={{
            energy: 30,
            bond: 70,
            sanity: 40,
          }}
        />
      )}

      {currentScreen === 'outcome' && (
        <OutcomeScreen
          choiceId="choice2"
          choiceText="TAKE A BREAK"
          outcomeText="You hand them to partner and crash for 90 minutes. When you wake, they're asleep in the bassinet. You feel human again. And guilty. Maybe both are okay."
          statChanges={{
            energy: 30,
            bond: -5,
            sanity: 15,
          }}
          previousStats={{
            energy: 30,
            bond: 70,
            sanity: 40,
          }}
          newStats={{
            energy: 60,
            bond: 65,
            sanity: 55,
          }}
          agentReactions={[
            {
              agent: 'baby',
              trustChange: -5,
              reaction: 'I wanted you',
            },
            {
              agent: 'survival',
              trustChange: 15,
              reaction: 'THANK YOU for listening',
            },
            {
              agent: 'rational',
              trustChange: 10,
              reaction: 'Smart, sustainable choice',
            },
            {
              agent: 'chaos',
              trustChange: -10,
              reaction: 'But family said never put baby down!',
            },
          ]}
          scenarioNumber={1}
          onContinue={() => console.log('Continue clicked')}
        />
      )}

      {currentScreen === 'results' && (
        <ResultsScreen
          profileName="THE RATIONAL OPTIMIZER"
          profileDescription="You prioritize logical stability over emotional volatility, mimicking a classical Greedy Algorithm."
          agentTrust={{
            baby: 45,
            survival: 75,
            rational: 85,
            chaos: 25,
          }}
          aiTerms={[
            {
              title: 'Greedy Algorithm',
              description: 'You optimized for the best immediate outcome at each decision step.',
            },
            {
              title: 'Low Entropy',
              description:
                'Your choices actively minimized unpredictability in the system environment.',
            },
            {
              title: 'Exploitation vs Exploration',
              description:
                'Sticking to known safe paths (Exploitation) rather than testing new behaviors.',
            },
          ]}
          learnings={[
            {
              title: 'Scenario 1: The First Night',
              description: 'Learned about sleep deprivation and self-care',
            },
            {
              title: 'Scenario 2: Feeding Struggles',
              description: 'Explored feeding schedules vs demand feeding',
            },
            {
              title: 'Scenario 3: The Tantrum',
              description: 'Practiced emotional regulation techniques',
            },
            {
              title: 'Scenario 4: Sleep Regression',
              description: 'Discovered adaptive parenting strategies',
            },
            {
              title: 'Scenario 5: The Milestone',
              description: 'Celebrated growth and development',
            },
          ]}
          onShare={() => console.log('Share clicked')}
          onPlayAgain={() => console.log('Play Again clicked')}
          onReadBlog={() => console.log('Read Blog clicked')}
        />
      )}
    </div>
  );
}
