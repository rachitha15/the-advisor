# Behind The Scenes Teaching Content

## Overview

"Behind The Scenes" content appears after scenarios 1, 3, and 5 to teach players about AI concepts through their parenting game experience.

## File Created

**`/src/lib/data/behindTheScenes.ts`**

## Structure

```typescript
export interface BehindTheScenesContent {
  title: string;
  points: string[];
}

export const behindTheScenes: Record<number, BehindTheScenesContent> = {
  1: { ... },  // What Just Happened
  3: { ... },  // What You're Seeing
  5: { ... },  // The Full Picture
};
```

## Content Summary

### Scenario 1: "What Just Happened"
Introduces the multi-agent AI concept:
- 4 AI agents analyzed the scenario
- Each with different objectives (👶 Comfort, 😴 Survival, 👨‍⚕️ Evidence, 🌀 All advice)
- They debated, player decided
- Introduction to multi-agent AI

### Scenario 3: "What You're Seeing"
Explains agent-to-agent interaction:
- Agents responding to each other
- Baby ↔ Survival interaction
- Not just separate responses
- Real-time negotiation

### Scenario 5: "The Full Picture"
Summarizes the AI alignment experience:
- Multi-agent systems ✅
- Agent debate ✅
- Competing objective functions ✅
- Human-in-the-loop decision ✅
- No single 'right' answer ✅
- Welcome to AI alignment

## Helper Functions

### `getBehindTheScenes(scenarioNumber: number)`
Returns Behind The Scenes content for a scenario, or `null` if none exists.

```typescript
import { getBehindTheScenes } from '@/lib/data/behindTheScenes';

const content = getBehindTheScenes(1);
if (content) {
  console.log(content.title);    // "What Just Happened"
  console.log(content.points);   // Array of teaching points
}
```

### `hasBehindTheScenes(scenarioNumber: number)`
Checks if a scenario has Behind The Scenes content.

```typescript
import { hasBehindTheScenes } from '@/lib/data/behindTheScenes';

if (hasBehindTheScenes(scenarioNumber)) {
  // Show Behind The Scenes section
}
```

## Integration with OutcomeScreen

The `OutcomeScreen` component **automatically loads** Behind The Scenes content based on the scenario number:

```typescript
import { OutcomeScreen } from '@/components';

<OutcomeScreen
  scenarioNumber={1}  // Automatically shows BTS content for scenarios 1, 3, 5
  choiceText="TAKE A BREAK"
  outcomeText="You hand them to partner..."
  // ... other props
  onContinue={() => nextScenario()}
/>
```

**No need to manually pass `behindTheScenesContent` prop!**

## Visual Design

The Behind The Scenes section appears as a card with:
- 🔍 Icon + title
- Dark gradient background (`#1c3a25` → `#102215`)
- Teaching points with:
  - Bullet points (•) for regular text
  - No bullets for emoji lines
  - Bold styling for emoji lines (👶, ✅, etc.)
- Subtle overlay effects

## Testing

Visit `/test-all-screens` and select "Outcome" to see Behind The Scenes in action (shows Scenario 1 content).

## Future Scenarios

When adding more scenarios, you can add Behind The Scenes content by:

1. Edit `/src/lib/data/behindTheScenes.ts`
2. Add new scenario number to the `behindTheScenes` object:

```typescript
export const behindTheScenes: Record<number, BehindTheScenesContent> = {
  1: { ... },
  3: { ... },
  5: { ... },
  7: {  // New scenario
    title: 'Your Title Here',
    points: [
      'Teaching point 1',
      '✅ Teaching point 2 with emoji',
      'Teaching point 3',
    ],
  },
};
```

3. OutcomeScreen will automatically detect and display it!

## Content Guidelines

When writing Behind The Scenes content:

- **Keep it conversational** - This is teaching through story
- **Use emojis strategically** - They add personality and visual breaks
- **Short points** - Each point should be 1-2 lines max
- **Build progressively** - Scenario 1 introduces, 3 deepens, 5 summarizes
- **Connect to experience** - Reference what player just did
- **AI concepts made accessible** - Technical terms explained through parenting metaphor

## Examples

Good:
```typescript
points: [
  '4 AI agents analyzed the scenario',
  '👶 Optimize for: Comfort',
  'They debated. You decided.',
]
```

Less good (too technical, too long):
```typescript
points: [
  'Four artificial intelligence agents utilizing different utility functions performed parallel scenario analysis...',
]
```
