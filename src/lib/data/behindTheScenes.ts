// Behind The Scenes teaching content for scenarios 1, 3, and 5
// Explains AI concepts after key scenarios

export interface BehindTheScenesContent {
  title: string;
  points: string[];
}

export const behindTheScenes: Record<number, BehindTheScenesContent> = {
  1: {
    title: 'What Just Happened?',
    points: [
      'You experienced the alignment problem - the core challenge of AI safety.',
      '',
      'Baby wants comfort NOW. You need rest to function TOMORROW. Both valid. Both important. Both can\'t win.',
      '',
      'When goals conflict, someone decides whose values matter more. You just made that call.',
    ],
  },
  3: {
    title: 'What Just Happened?',
    points: [
      'You experienced the exploration-exploitation problem.',
      '',
      'Chaos gave you endless options. More research didn\'t help - it paralyzed you. At some point, you have to stop exploring and start acting.',
      '',
      'AI systems face this constantly: When is "good enough" actually good enough? You just learned the cost of indecision.',
    ],
  },
  5: {
    title: 'What Just Happened?',
    points: [
      'A 5th agent just appeared when you returned to work.',
      '',
      'Real AI systems aren\'t static - they adapt when context changes. New priorities activate new agents. Your decision space just got more complex.',
      '',
      'This is how multi-agent systems evolve in real time.',
    ],
  },
};

// Helper function to get Behind The Scenes content for a scenario
export function getBehindTheScenes(
  scenarioNumber: number
): BehindTheScenesContent | null {
  return behindTheScenes[scenarioNumber] || null;
}

// Check if a scenario has Behind The Scenes content
export function hasBehindTheScenes(scenarioNumber: number): boolean {
  return scenarioNumber in behindTheScenes;
}
