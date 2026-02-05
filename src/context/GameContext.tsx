'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, AgentType } from '@/lib/types/game';

interface GameContextType {
  gameState: GameState;
  updateStats: (changes: Partial<GameState['stats']>) => void;
  updateAgentTrust: (agent: AgentType, change: number) => void;
  recordChoice: (choiceId: string) => void;
  saveAgentResponse: (
    scenarioId: number,
    round: 1 | 2,
    agent: AgentType,
    response: string
  ) => void;
  nextScenario: () => void;
  resetGame: () => void;
}

const initialGameState: GameState = {
  currentScenario: 0,
  stats: {
    energy: 30,
    bond: 70,
    sanity: 40,
  },
  agentTrust: {
    baby: 50,
    survival: 50,
    rational: 50,
    chaos: 50,
    work: 50,
  },
  choiceHistory: [],
  agentResponses: {},
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const updateStats = (changes: Partial<GameState['stats']>) => {
    setGameState((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        energy: Math.max(
          0,
          Math.min(100, prev.stats.energy + (changes.energy ?? 0))
        ),
        bond: Math.max(
          0,
          Math.min(100, prev.stats.bond + (changes.bond ?? 0))
        ),
        sanity: Math.max(
          0,
          Math.min(100, prev.stats.sanity + (changes.sanity ?? 0))
        ),
      },
    }));
  };

  const updateAgentTrust = (agent: AgentType, change: number) => {
    setGameState((prev) => ({
      ...prev,
      agentTrust: {
        ...prev.agentTrust,
        [agent]: Math.max(0, Math.min(100, prev.agentTrust[agent] + change)),
      },
    }));
  };

  const recordChoice = (choiceId: string) => {
    setGameState((prev) => ({
      ...prev,
      choiceHistory: [...prev.choiceHistory, choiceId],
    }));
  };

  const saveAgentResponse = (
    scenarioId: number,
    round: 1 | 2,
    agent: AgentType,
    response: string
  ) => {
    setGameState((prev) => {
      const roundKey = round === 1 ? 'round1' : 'round2';
      const existingScenarioData = prev.agentResponses[scenarioId] || {
        round1: {},
        round2: {},
      };

      return {
        ...prev,
        agentResponses: {
          ...prev.agentResponses,
          [scenarioId]: {
            ...existingScenarioData,
            [roundKey]: {
              ...existingScenarioData[roundKey],
              [agent]: response,
            },
          },
        },
      };
    });
  };

  const nextScenario = () => {
    setGameState((prev) => ({
      ...prev,
      currentScenario: prev.currentScenario + 1,
    }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  const value: GameContextType = {
    gameState,
    updateStats,
    updateAgentTrust,
    recordChoice,
    saveAgentResponse,
    nextScenario,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
