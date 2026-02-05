// Game type definitions
export type AgentType = 'baby' | 'survival' | 'rational' | 'chaos' | 'work';

export interface AgentPrompt {
  agent: AgentType;
  systemPrompt: string;
  round: 1 | 2;
  context?: string;
}

export interface Choice {
  id: string;
  text: string;
  followingAgents: AgentType[];
  statChanges: {
    energy: number;
    bond: number;
    sanity: number;
  };
}

export interface Outcome {
  text: string;
  agentReactions: {
    agent: AgentType;
    trustChange: number;
    reaction: string;
  }[];
}

export interface Scenario {
  id: number;
  title: string;
  week: number;
  context: string;
  situation: string;
  startingStats: {
    energy: number;
    bond: number;
    sanity: number;
  };
  agentPrompts: {
    round1: AgentPrompt[];
    round2: AgentPrompt[];
  };
  choices: Choice[];
  outcomes: { [choiceId: string]: Outcome };
}

export interface GameState {
  currentScenario: number;
  stats: {
    energy: number;
    bond: number;
    sanity: number;
  };
  agentTrust: {
    baby: number;
    survival: number;
    rational: number;
    chaos: number;
    work: number;
  };
  choiceHistory: string[];
  agentResponses: {
    [scenarioId: number]: {
      round1: { [agent: string]: string };
      round2: { [agent: string]: string };
    };
  };
}
