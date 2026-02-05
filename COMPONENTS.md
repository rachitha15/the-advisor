# Game Screen Components Documentation

All components are TypeScript-based React components using Next.js 14 App Router conventions with the `'use client'` directive.

## Component Overview

### 1. ScenarioScreen.tsx
**Purpose:** Displays the initial scenario with context and situation

**Props:**
```typescript
{
  scenario: Scenario;           // From @/lib/types/game
  onConsultAdvisors: () => void;
}
```

**Features:**
- Shows scenario title, context (time/day), and situation
- Displays starting stats (Energy, Bond, Sanity) in card format
- Dark night theme with ambient glow effects
- Material Symbols icons
- Responsive mobile-first design

---

### 2. WaitingScreen.tsx
**Purpose:** Loading state while AI agents are responding

**Props:**
```typescript
{
  currentAgent: AgentType;      // Which agent is currently "talking"
  progress: number;              // 0-100 for progress bar
  title?: string;                // Optional custom title
  subtitle?: string;             // Optional custom subtitle
}
```

**Features:**
- 4 agent avatars in a row with connecting line
- Highlights active agent (larger size, "Talking..." badge)
- Animated indicators for inactive agents (?, ..., !)
- Progress bar showing "Dissonance" percentage
- Preview card showing latest agent response
- Dark green theme

**Agent Styling:**
- Baby: Question mark indicator, grayscale avatar
- Survival: Ellipsis indicator, sepia avatar
- Rational: Active by default in demo, full color
- Chaos: Exclamation indicator, darkened avatar

---

### 3. DebateScreen.tsx
**Purpose:** Shows agent debate with chat-style messages and player choices

**Props:**
```typescript
{
  agentResponses: {
    round1: AgentResponse[];
    round2: AgentResponse[];
  };
  choices: Choice[];            // From scenario data
  onChoiceSelect: (choiceId: string) => void;
  currentStats: {
    energy: number;
    bond: number;
    sanity: number;
  };
}

// Where AgentResponse is:
{
  agent: AgentType;
  response: string;
}
```

**Features:**
- Sticky header with 3 animated stat bars
- Chat-style agent messages:
  - Left-aligned: Baby Agent (green), Chaos Agent (purple)
  - Right-aligned: Survival Agent (gray), Rational Agent (blue)
- Unique styling per agent (colors, avatars, borders)
- 3 choice buttons at bottom
- First choice highlighted as primary
- Smooth scroll animations
- Mobile-optimized with gradient overlay

---

### 4. OutcomeScreen.tsx ✨ NEW
**Purpose:** Shows choice outcome, stat changes, and agent reactions

**Props:**
```typescript
{
  choiceId: string;
  choiceText: string;           // e.g., "TAKE A BREAK"
  outcomeText: string;          // Narrative outcome description
  statChanges: {
    energy?: number;
    bond?: number;
    sanity?: number;
  };
  previousStats: {
    energy: number;
    bond: number;
    sanity: number;
  };
  newStats: {
    energy: number;
    bond: number;
    sanity: number;
  };
  agentReactions: Array<{
    agent: AgentType;
    trustChange: number;
    reaction: string;           // Agent's quote/response
  }>;
  scenarioNumber: number;       // Auto-loads Behind The Scenes for 1, 3, 5
  onContinue: () => void;
}
```

**Features:**
- Shows chosen action as large title
- Outcome narrative in card format
- 3 stat change cards with:
  - Icon (bolt, favorite, psychology)
  - New value percentage
  - Change indicator (↑/↓ with amount)
  - Color coding (green for positive, red for negative)
- Agent reaction cards showing:
  - Agent icon and name
  - Trust change (thumbs up/down)
  - Agent's reaction quote
- Behind The Scenes section (automatically shown for scenarios 1, 3, 5):
  - Loaded from `/src/lib/data/behindTheScenes.ts`
  - Gradient background with overlay
  - Teaching points about AI concepts
  - Simple bullet-point format with emoji support
- Continue button at bottom

**Note:** Behind The Scenes content is automatically loaded based on `scenarioNumber`. No need to pass it as a prop!

---

### 5. ResultsScreen.tsx ✨ NEW
**Purpose:** Final screen showing parenting style profile and results

**Props:**
```typescript
{
  profileName: string;          // e.g., "THE RATIONAL OPTIMIZER"
  profileDescription: string;   // One-sentence description
  agentTrust: {
    baby: number;               // 0-100
    survival: number;
    rational: number;
    chaos: number;
    work?: number;
  };
  aiTerms: Array<{
    title: string;              // e.g., "Greedy Algorithm"
    description: string;
  }>;
  learnings: Array<{
    title: string;              // e.g., "Scenario 1: The First Night"
    description: string;
  }>;
  onShare: () => void;
  onPlayAgain: () => void;
  onReadBlog: () => void;
}
```

**Features:**
- Profile title with gradient glow effect
  - Splits last word as highlighted (e.g., "The Rational **Optimizer**")
- "Journey Complete" badge
- Agent Trust Distribution:
  - Sorted bars (highest to lowest)
  - Animated progress bars
  - Percentage labels
- "In AI Terms" card:
  - Dark gradient background
  - 3-4 technical concepts explained
  - Check circle icons
- "What You Experienced" section:
  - List of completed scenarios
  - Show/hide toggle for full list
  - Checkmark indicators
- Share Result Card preview:
  - Animated gradient blobs
  - Profile name display
  - Social share buttons (LinkedIn, Twitter, generic share)
- Blog post preview card (clickable)
- Sticky footer with:
  - Primary "Share My Results" button
  - Secondary "Play Again" button

---

## Shared Styling & Theme

All components use:
- **Font:** Spline Sans (loaded in layout.tsx)
- **Icons:** Material Symbols Outlined
- **Dark Mode:** Enabled by default with `dark:` classes
- **Colors:**
  - `primary`: #13ec49 (bright green)
  - `background-dark`: #102215 (dark green)
  - `card-dark`: #1c3022
  - `card-highlight`: #23482c
  - `surface-dark`: #1c3323
  - `night-bg`: #0B1015 (very dark blue-green)

## Usage Example

```tsx
import {
  ScenarioScreen,
  WaitingScreen,
  DebateScreen,
  OutcomeScreen,
  ResultsScreen,
} from '@/components';

// In your game flow component
function GameFlow() {
  const [screen, setScreen] = useState('scenario');

  return (
    <>
      {screen === 'scenario' && (
        <ScenarioScreen
          scenario={currentScenario}
          onConsultAdvisors={() => setScreen('waiting')}
        />
      )}

      {screen === 'waiting' && (
        <WaitingScreen
          currentAgent={activeAgent}
          progress={apiProgress}
        />
      )}

      {screen === 'debate' && (
        <DebateScreen
          agentResponses={responses}
          choices={scenario.choices}
          onChoiceSelect={handleChoice}
          currentStats={stats}
        />
      )}

      {screen === 'outcome' && (
        <OutcomeScreen
          choiceText="TAKE A BREAK"
          outcomeText={outcome.text}
          statChanges={changes}
          newStats={updatedStats}
          agentReactions={outcome.agentReactions}
          scenarioNumber={currentScenarioNum}
          behindTheScenesContent={btsContent}
          onContinue={() => setScreen('scenario')}
        />
      )}

      {screen === 'results' && (
        <ResultsScreen
          profileName={profile.name}
          profileDescription={profile.description}
          agentTrust={finalTrust}
          aiTerms={profile.aiTerms}
          learnings={completedScenarios}
          onShare={shareResults}
          onPlayAgain={resetGame}
          onReadBlog={openBlog}
        />
      )}
    </>
  );
}
```

## Testing

Visit `/test-all-screens` to see all components in action with example data and a screen switcher.

```bash
npm run dev
# Navigate to: http://localhost:3000/test-all-screens
```

## Files Created

- `/src/components/ScenarioScreen.tsx` ✅
- `/src/components/WaitingScreen.tsx` ✅
- `/src/components/DebateScreen.tsx` ✅
- `/src/components/OutcomeScreen.tsx` ✨ NEW
- `/src/components/ResultsScreen.tsx` ✨ NEW
- `/src/components/index.ts` - Barrel export file
- `/src/app/test-all-screens/page.tsx` - Interactive demo
- `/tailwind.config.ts` - Updated with all custom colors
- `/src/app/layout.tsx` - Updated with fonts and icons

## Next Steps

1. Integrate components into main game flow
2. Add API calls for agent responses
3. Implement game state management with GameContext
4. Add transitions between screens
5. Implement share functionality
6. Add analytics tracking
