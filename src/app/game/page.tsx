'use client';

import { useState } from 'react';
import {
  ScenarioScreen,
  WaitingScreen,
  DebateScreen,
  OutcomeScreen,
} from '@/components';
import ResultsScreen from '@/components/ResultsScreen';
import { scenarios } from '@/lib/data/scenarios';
import { AgentType } from '@/lib/types/game';
import { determineParentingStyle } from '@/lib/data/parentingStyles';

type Screen = 'scenario' | 'waiting' | 'debate' | 'outcome' | 'results';

interface AgentResponse {
  agent: AgentType;
  response: string;
}

interface GameStats {
  energy: number;
  bond: number;
  sanity: number;
}

interface AgentTrust {
  baby: number;
  survival: number;
  rational: number;
  chaos: number;
  work: number;
}

export default function GamePage() {
  // Core game state
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<Screen>('scenario');

  // Scenario-level state
  const [round1Responses, setRound1Responses] = useState<AgentResponse[]>([]);
  const [round2Responses, setRound2Responses] = useState<AgentResponse[]>([]);
  const [currentAgent, setCurrentAgent] = useState<AgentType>('baby');
  const [progress, setProgress] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Current scenario stats (resets each scenario to that scenario's startingStats)
  const [currentStats, setCurrentStats] = useState<GameStats>({
    energy: scenarios[0].startingStats.energy,
    bond: scenarios[0].startingStats.bond,
    sanity: scenarios[0].startingStats.sanity,
  });

  const [agentTrust, setAgentTrust] = useState<AgentTrust>({
    baby: 50,
    survival: 50,
    rational: 50,
    chaos: 50,
    work: 50,
  });

  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);

  const currentScenario = scenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === scenarios.length - 1;

  // Get agents for current scenario (4 for scenarios 1-4, 5 for scenario 5)
  const getAgentsForScenario = (scenarioId: number): AgentType[] => {
    if (scenarioId === 5) {
      return ['baby', 'survival', 'rational', 'work', 'chaos'];
    }
    return ['baby', 'survival', 'rational', 'chaos'];
  };

  // Get waiting screen text based on scenario
  const getWaitingScreenText = (scenarioId: number): { title: string; subtitle: string; headerText: string } => {
    const texts: Record<number, { title: string; subtitle: string; headerText: string }> = {
      1: {
        headerText: 'The First Night',
        title: 'The advisors are weighing in on your 1:00 AM crisis...',
        subtitle: 'Processing physiological needs and emotional noise.',
      },
      2: {
        headerText: 'The Growth Spurt',
        title: 'The advisors are analyzing the growth spurt...',
        subtitle: 'Evaluating feeding patterns and supply concerns.',
      },
      3: {
        headerText: 'The Advice Avalanche',
        title: 'The advisors are cutting through the advice avalanche...',
        subtitle: 'Processing conflicting sleep method opinions.',
      },
      4: {
        headerText: 'The First Illness',
        title: 'The advisors are assessing the fever situation...',
        subtitle: 'Evaluating symptoms and appropriate responses.',
      },
      5: {
        headerText: 'The Return to Work',
        title: 'The advisors are navigating your work-life balance...',
        subtitle: 'Processing career demands and parenting needs.',
      },
    };
    return texts[scenarioId] || texts[1];
  };

  // API call handler for agent responses
  const handleConsultAdvisors = async () => {
    setCurrentScreen('waiting');
    setIsLoading(true);
    setProgress(0);

    const agents = getAgentsForScenario(currentScenario.id);
    const responses: AgentResponse[] = [];

    // Round 1
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      setCurrentAgent(agent);
      setProgress(Math.round(((i + 1) / (agents.length * 2)) * 100));

      const agentPrompt = currentScenario.agentPrompts.round1.find((p) => p.agent === agent);
      if (!agentPrompt) continue;

      try {
        const res = await fetch('/api/agent-response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt: agentPrompt.systemPrompt,
            userMessage: currentScenario.situation,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'API call failed');
        }

        responses.push({ agent, response: data.response });
      } catch (error) {
        console.error(`Error getting response from ${agent}:`, error);
        responses.push({
          agent,
          response: `[${agent} agent response would appear here]`,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setRound1Responses(responses);

    // Round 2
    await getRound2Responses(responses, agents);
  };

  const getRound2Responses = async (round1: AgentResponse[], agents: AgentType[]) => {
    const responses: AgentResponse[] = [];
    const round1Context = round1.map((r) => `${r.agent}: ${r.response}`).join('\n');

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      setCurrentAgent(agent);
      setProgress(50 + Math.round(((i + 1) / agents.length) * 50));

      const agentPrompt = currentScenario.agentPrompts.round2.find((p) => p.agent === agent);
      if (!agentPrompt) continue;

      try {
        const res = await fetch('/api/agent-response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt: agentPrompt.systemPrompt,
            userMessage: `Round 1 responses:\n${round1Context}\n\nNow respond ONLY as ${agent} agent. Do NOT repeat or summarize the other agents' responses. Give YOUR perspective only:`,
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

    // Find the choice and apply stat changes FROM SCENARIO'S STARTING STATS
    const choice = currentScenario.choices.find((c) => c.id === choiceId);
    if (choice) {
      setCurrentStats({
        energy: Math.max(
          0,
          Math.min(100, currentScenario.startingStats.energy + choice.statChanges.energy)
        ),
        bond: Math.max(
          0,
          Math.min(100, currentScenario.startingStats.bond + choice.statChanges.bond)
        ),
        sanity: Math.max(
          0,
          Math.min(100, currentScenario.startingStats.sanity + choice.statChanges.sanity)
        ),
      });

      // Record choice in history
      setChoiceHistory((prev) => [...prev, `${currentScenario.id}-${choiceId}`]);
    }

    setCurrentScreen('outcome');
  };

  const handleOutcomeContinue = () => {
    // Update agent trust based on outcome
    const outcome = currentScenario.outcomes[selectedChoice];
    if (outcome) {
      setAgentTrust((prev) => {
        const updated = { ...prev };
        outcome.agentReactions.forEach((reaction) => {
          updated[reaction.agent] = Math.max(
            0,
            Math.min(100, updated[reaction.agent] + reaction.trustChange)
          );
        });
        return updated;
      });
    }

    // Move to next scenario or results (Behind The Scenes is handled in OutcomeScreen)
    if (isLastScenario) {
      // Go to results screen
      setCurrentScreen('results');
    } else {
      // Move to next scenario
      const nextScenarioIndex = currentScenarioIndex + 1;
      const nextScenario = scenarios[nextScenarioIndex];

      // Reset stats to next scenario's starting stats
      setCurrentStats({
        energy: nextScenario.startingStats.energy,
        bond: nextScenario.startingStats.bond,
        sanity: nextScenario.startingStats.sanity,
      });

      setCurrentScenarioIndex(nextScenarioIndex);
      resetScenarioState();
      setCurrentScreen('scenario');
    }
  };

  const resetScenarioState = () => {
    setRound1Responses([]);
    setRound2Responses([]);
    setSelectedChoice('');
    setProgress(0);
    setCurrentAgent('baby');
  };

  const handleTimeout = () => {
    console.error('Request timed out');
    setIsLoading(false);
  };

  const handleRetry = () => {
    setRound1Responses([]);
    setRound2Responses([]);
    setProgress(0);
    handleConsultAdvisors();
  };

  // Get choice and outcome data
  const choice = currentScenario.choices.find((c) => c.id === selectedChoice);
  const outcome = selectedChoice ? currentScenario.outcomes[selectedChoice] : null;

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Debug Info */}
      <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-md p-4 rounded-xl text-white text-xs max-w-xs">
        <p className="font-bold mb-2">🎮 Game Mode</p>
        <p>Scenario: {currentScenarioIndex + 1}/5</p>
        <p>Screen: {currentScreen}</p>
        <p>Progress: {progress}%</p>
        <p className="mt-2 pt-2 border-t border-white/10">
          Energy: {currentStats.energy} | Bond: {currentStats.bond} | Sanity: {currentStats.sanity}
        </p>
        {isLoading && <p className="text-primary mt-2">⏳ Loading...</p>}
      </div>

      {/* Render Current Screen */}
      {currentScreen === 'scenario' && (
        <ScenarioScreen scenario={currentScenario} onConsultAdvisors={handleConsultAdvisors} />
      )}

      {currentScreen === 'waiting' && (
        <WaitingScreen
          currentAgent={currentAgent}
          progress={progress}
          title={getWaitingScreenText(currentScenario.id).title}
          subtitle={getWaitingScreenText(currentScenario.id).subtitle}
          headerText={getWaitingScreenText(currentScenario.id).headerText}
          onTimeout={handleTimeout}
          onRetry={handleRetry}
          scenarioId={currentScenario.id}
        />
      )}

      {currentScreen === 'debate' && (
        <DebateScreen
          agentResponses={{
            round1: round1Responses,
            round2: round2Responses,
          }}
          choices={currentScenario.choices}
          onChoiceSelect={handleChoiceSelect}
          currentStats={currentStats}
          scenarioId={currentScenario.id}
        />
      )}

      {currentScreen === 'outcome' && choice && outcome && (
        <OutcomeScreen
          choiceId={selectedChoice}
          choiceText={choice.text}
          outcomeText={outcome.text}
          statChanges={choice.statChanges}
          previousStats={currentScenario.startingStats}
          newStats={currentStats}
          agentReactions={outcome.agentReactions}
          scenarioNumber={currentScenario.id}
          onContinue={handleOutcomeContinue}
        />
      )}

      {currentScreen === 'results' && (
        <ResultsScreen
          parentingStyle={determineParentingStyle(agentTrust)}
        />
      )}
    </div>
  );
}
