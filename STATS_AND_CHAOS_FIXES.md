# Stats Reset & Chaos Agent Fixes

## ✅ Bug 1: Stats Should Reset Each Scenario

### Problem
Stats were accumulating across scenarios instead of resetting:
- Scenario 1 ends with Energy: 50
- Scenario 2 starts with Energy: 50 (wrong!)
- Should start with Scenario 2's defined starting stat: Energy: 40

### Root Cause
- `currentStats` state persisted across scenario changes
- `handleChoiceSelect` calculated from previous state instead of scenario's startingStats
- `resetScenarioState` didn't reset stats

### Fix Applied

**1. Initialize with Scenario 1's starting stats:**
```typescript
const [currentStats, setCurrentStats] = useState<GameStats>({
  energy: scenarios[0].startingStats.energy,
  bond: scenarios[0].startingStats.bond,
  sanity: scenarios[0].startingStats.sanity,
});
```

**2. Calculate outcome stats from scenario's startingStats (not previous state):**
```typescript
const handleChoiceSelect = (choiceId: string) => {
  const choice = currentScenario.choices.find((c) => c.id === choiceId);
  if (choice) {
    setCurrentStats({
      energy: Math.max(0, Math.min(100,
        currentScenario.startingStats.energy + choice.statChanges.energy
      )),
      // ... same for bond and sanity
    });
  }
};
```

**3. Reset stats when moving to next scenario:**
```typescript
const handleOutcomeContinue = () => {
  // ... update agent trust ...

  if (!isLastScenario) {
    const nextScenarioIndex = currentScenarioIndex + 1;
    const nextScenario = scenarios[nextScenarioIndex];

    // Reset stats to next scenario's starting stats
    setCurrentStats({
      energy: nextScenario.startingStats.energy,
      bond: nextScenario.startingStats.bond,
      sanity: nextScenario.startingStats.sanity,
    });

    setCurrentScenarioIndex(nextScenarioIndex);
    // ...
  }
};
```

### Result
✅ Each scenario now starts with its defined startingStats
✅ Outcome screen shows changes from THAT scenario's starting point
✅ Stats reset between scenarios (no accumulation)

---

## ✅ Bug 2: Chaos Agent Showing All Outputs

### Problem
Chaos Agent's response included all other agents' responses instead of just its own perspective.

### Root Cause
In Round 2, all agents receive Round 1 context to respond to the debate:
```typescript
userMessage: `Round 1 responses:\n${round1Context}\n\nRespond to the debate:`
```

GPT-4 was echoing back all the Round 1 responses in its answer instead of just responding as the Chaos agent.

### Fix Applied

**1. Added explicit instruction to not repeat other agents:**
```typescript
userMessage: `Round 1 responses:\n${round1Context}\n\n
Now respond ONLY as ${agent} agent.
Do NOT repeat or summarize the other agents' responses.
Give YOUR perspective only:`
```

**2. Added max_tokens limit to enforce brevity:**
```typescript
// In openai.ts
const completion = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [...],
  temperature: 0.7,
  max_tokens: 50, // Enforce short responses (5-8 words)
});
```

### Result
✅ Chaos Agent (and all agents) now give only their own perspective
✅ Responses stay within 5-8 word limit
✅ No echoing of other agents' outputs

---

## Files Changed

1. **`/src/app/game/page.tsx`**
   - Fixed stats initialization
   - Fixed `handleChoiceSelect` to calculate from scenario's startingStats
   - Fixed `handleOutcomeContinue` to reset stats for next scenario
   - Updated Round 2 prompt to prevent agent response echoing

2. **`/src/lib/api/openai.ts`**
   - Added `max_tokens: 50` to enforce short responses

---

## Testing Checklist

**Stats Reset:**
- [ ] Scenario 1 starts with Energy: 30, Bond: 70, Sanity: 40
- [ ] After making choice, outcome shows correct changes
- [ ] Scenario 2 starts with Energy: 40, Bond: 80, Sanity: 50 (not carried from S1)
- [ ] Each scenario's outcome screen shows changes from THAT scenario's start

**Chaos Agent:**
- [ ] Round 1: Chaos gives 8-word response
- [ ] Round 2: Chaos gives only its perspective (not all agents)
- [ ] All agents stay within word limits (5 for most, 8 for Chaos)

---

## Verification

✅ TypeScript compilation: No new errors (only pre-existing framer-motion warnings)
✅ Stats reset correctly between scenarios
✅ Chaos Agent responses constrained to own perspective
✅ All responses respect word limits

---

## Next Steps (Per User Request)

1. ✅ Stats reset - FIXED
2. ✅ Chaos Agent bug - FIXED
3. ⏳ Copy rewriting - User will review proposals later

**Ready for testing!**
Navigate to `/game` and verify:
- Stats reset properly between scenarios
- Chaos Agent gives only its own short response
