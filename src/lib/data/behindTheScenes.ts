// Behind The Scenes teaching content for scenarios 1, 3, and 5
// Explains AI concepts after key scenarios

export interface BehindTheScenesContent {
  title: string;
  points: string[];
}

export const behindTheScenes: Record<number, BehindTheScenesContent> = {
  1: {
    title: 'Behind The Scenes',
    points: [
      'Same scenario. 4 different objectives.',
      '',
      '[BABY] Maximize comfort',
      '[SURVIVAL] Maximize your rest',
      '[RATIONAL] Maximize evidence',
      '[CHAOS] Maximize all opinions',
      '',
      'Both Baby and You had valid needs.',
      'Both couldn\'t win.',
      '',
      'This is objective function conflict.',
      'You just decided whose goal mattered more.',
    ],
  },
  3: {
    title: 'Behind The Scenes',
    points: [
      'Too much advice = Worse decisions.',
      '',
      '[CHAOS] Chaos gave you 47 options.',
      'More research didn\'t help - it paralyzed you.',
      '',
      'This is the exploration-exploitation problem:',
      'Keep gathering data? Or act on what you have?',
      '',
      'Indecision has a cost.',
      'Your sanity proved it.',
    ],
  },
  5: {
    title: 'Behind The Scenes',
    points: [
      'A 5th agent just appeared: [WORK] Work.',
      '',
      'Real multi-agent systems aren\'t static.',
      'Agents join when context changes.',
      '',
      'You returned to work → Work objectives activated.',
      '',
      'Your decision space just got more complex.',
      '',
      'This is how AI systems adapt to new priorities.',
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
