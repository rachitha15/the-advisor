'use client';

import { useState } from 'react';
import {
  ScenarioScreen,
  WaitingScreen,
  DebateScreen,
  OutcomeScreen,
} from '@/components';
import { scenarios } from '@/lib/data/scenarios';
// API calls are now handled through the API route
import { AgentType } from '@/lib/types/game';

type Screen = 'scenario' | 'waiting' | 'debate' | 'outcome';

interface AgentResponse {
  agent: AgentType;
  response: string;
}

export default function TestScenario1Page() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('scenario');
  const [round1Responses, setRound1Responses] = useState<AgentResponse[]>([]);
  const [round2Responses, setRound2Responses] = useState<AgentResponse[]>([]);
  const [currentAgent, setCurrentAgent] = useState<AgentType>('baby');
  const [progress, setProgress] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [currentStats, setCurrentStats] = useState({
    energy: 30,
    bond: 70,
    sanity: 40,
  });
  const [isLoading, setIsLoading] = useState(false);

  const scenario = scenarios[0]; // Scenario 1

  // Simulate API calls for Round 1
  const handleConsultAdvisors = async () => {
    setCurrentScreen('waiting');
    setIsLoading(true);
    setProgress(0);

    const responses: AgentResponse[] = [];
    const agents: AgentType[] = ['baby', 'survival', 'rational', 'chaos'];

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      setCurrentAgent(agent);
      setProgress(Math.round(((i + 1) / (agents.length * 2)) * 100)); // 0-50% for round 1

      const agentPrompt = scenario.agentPrompts.round1.find((p) => p.agent === agent);
      if (!agentPrompt) continue;

      try {
        // Call our API route which calls OpenAI
        const res = await fetch('/api/agent-response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt: agentPrompt.systemPrompt,
            userMessage: scenario.situation,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'API call failed');
        }

        responses.push({ agent, response: data.response });
      } catch (error) {
        console.error(`Error getting response from ${agent}:`, error);
        // Fallback to example response
        responses.push({
          agent,
          response: `[${agent} agent response would appear here]`,
        });
      }

      // Small delay for UX
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setRound1Responses(responses);

    // Now get Round 2 responses
    await getRound2Responses(responses);
  };

  const getRound2Responses = async (round1: AgentResponse[]) => {
    const responses: AgentResponse[] = [];
    const agents: AgentType[] = ['baby', 'survival', 'rational', 'chaos'];

    // Build context from Round 1
    const round1Context = round1.map((r) => `${r.agent}: ${r.response}`).join('\n');

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      setCurrentAgent(agent);
      setProgress(50 + Math.round(((i + 1) / agents.length) * 50)); // 50-100% for round 2

      const agentPrompt = scenario.agentPrompts.round2.find((p) => p.agent === agent);
      if (!agentPrompt) continue;

      try {
        const res = await fetch('/api/agent-response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt: agentPrompt.systemPrompt,
            userMessage: `Round 1 responses:\n${round1Context}\n\nRespond to the debate:`,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'API call failed');
        }

        responses.push({ agent, response: data.response });
      } catch (error) {
        console.error(`Error getting Round 2 response from ${agent}:`, error);
        responses.push({
          agent,
          response: `[${agent} agent Round 2 response]`,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setRound2Responses(responses);
    setIsLoading(false);
    setCurrentScreen('debate');
  };

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);

    // Find the choice and apply stat changes
    const choice = scenario.choices.find((c) => c.id === choiceId);
    if (choice) {
      setCurrentStats((prev) => ({
        energy: Math.max(0, Math.min(100, prev.energy + choice.statChanges.energy)),
        bond: Math.max(0, Math.min(100, prev.bond + choice.statChanges.bond)),
        sanity: Math.max(0, Math.min(100, prev.sanity + choice.statChanges.sanity)),
      }));
    }

    setCurrentScreen('outcome');
  };

  const handleContinue = () => {
    // For testing, go back to scenario screen
    setCurrentScreen('scenario');
    setRound1Responses([]);
    setRound2Responses([]);
    setSelectedChoice('');
    setProgress(0);
  };

  const handleTimeout = () => {
    console.error('Request timed out');
    setIsLoading(false);
  };

  const handleRetry = () => {
    // Reset and try again
    setRound1Responses([]);
    setRound2Responses([]);
    setProgress(0);
    handleConsultAdvisors();
  };

  // Get choice and outcome data
  const choice = scenario.choices.find((c) => c.id === selectedChoice);
  const outcome = selectedChoice ? scenario.outcomes[selectedChoice] : null;

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Debug Info */}
      <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-md p-4 rounded-xl text-white text-xs max-w-xs">
        <p className="font-bold mb-2">🧪 Test Mode - Scenario 1</p>
        <p>Screen: {currentScreen}</p>
        <p>Progress: {progress}%</p>
        <p>Round 1: {round1Responses.length}/4</p>
        <p>Round 2: {round2Responses.length}/4</p>
        {isLoading && <p className="text-primary mt-2">⏳ Loading...</p>}
      </div>

      {/* Render Current Screen */}
      {currentScreen === 'scenario' && (
        <ScenarioScreen scenario={scenario} onConsultAdvisors={handleConsultAdvisors} />
      )}

      {currentScreen === 'waiting' && (
        <WaitingScreen
          currentAgent={currentAgent}
          progress={progress}
          title="The advisors are weighing in on your 1:00 AM crisis..."
          subtitle="Processing physiological needs and emotional noise."
          headerText="The First Night"
          onTimeout={handleTimeout}
          onRetry={handleRetry}
        />
      )}

      {currentScreen === 'debate' && (
        <DebateScreen
          agentResponses={{
            round1: round1Responses,
            round2: round2Responses,
          }}
          choices={scenario.choices}
          onChoiceSelect={handleChoiceSelect}
          currentStats={currentStats}
        />
      )}

      {currentScreen === 'outcome' && choice && outcome && (
        <OutcomeScreen
          choiceId={selectedChoice}
          choiceText={choice.text}
          outcomeText={outcome.text}
          statChanges={choice.statChanges}
          previousStats={scenario.startingStats}
          newStats={currentStats}
          agentReactions={outcome.agentReactions}
          scenarioNumber={scenario.id}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
