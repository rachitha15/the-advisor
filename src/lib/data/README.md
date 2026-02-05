# Game Data Files

## scenarios.ts

Contains all game scenario data including:
- Scenario context and situation
- Starting stats
- Agent prompts for round 1 and 2
- Player choices with stat changes
- Outcomes with agent reactions

**Usage:**
```typescript
import { scenarios } from '@/lib/data/scenarios';

const scenario1 = scenarios[0]; // First scenario
```

## behindTheScenes.ts

Contains teaching content shown after scenarios 1, 3, and 5 to explain AI concepts.

**Structure:**
```typescript
export interface BehindTheScenesContent {
  title: string;
  points: string[];
}
```

**Usage:**
```typescript
import { getBehindTheScenes, hasBehindTheScenes } from '@/lib/data/behindTheScenes';

// Check if scenario has BTS content
if (hasBehindTheScenes(scenarioNumber)) {
  const content = getBehindTheScenes(scenarioNumber);
  console.log(content.title);
  console.log(content.points);
}
```

**Automatic Loading in OutcomeScreen:**

The `OutcomeScreen` component automatically loads Behind The Scenes content based on the scenario number. No need to pass it as a prop!

```typescript
<OutcomeScreen
  scenarioNumber={1}  // Will automatically show BTS for scenarios 1, 3, 5
  // ... other props
/>
```

**Content for Each Scenario:**

- **Scenario 1:** Introduces multi-agent AI concept
- **Scenario 3:** Explains agent-to-agent interaction
- **Scenario 5:** Summarizes full AI alignment experience

**Available Scenarios:**
- Scenario 1 ✅
- Scenario 3 ✅
- Scenario 5 ✅

All other scenarios (2, 4, etc.) will not show Behind The Scenes content.
