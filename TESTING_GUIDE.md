# Testing Guide - Scenario 1 End-to-End

## ✅ Pre-Test Checklist Complete!

See `PRE_TEST_CHECKLIST.md` for full verification (19/19 items confirmed).

---

## Quick Start: Test Scenario 1 Now

### Option 1: Full Integration Test (Recommended)

**Page:** `/test-scenario-1`

**What it does:**
- Shows complete flow: Scenario → API Calls → Waiting → Debate → Choice → Outcome
- Makes real OpenAI API calls for agent responses
- Shows "Behind The Scenes" teaching content
- Full state management

**To run:**
```bash
npm run dev
# Visit: http://localhost:3000/test-scenario-1
```

**Expected Flow:**
1. **Scenario Screen** → Shows "Week 1: The First Night Home"
   - Click "Consult Advisors"
2. **Waiting Screen** → Shows agent avatars, progress bar
   - Calls OpenAI API for Round 1 (4 agents)
   - Then Round 2 (4 agents)
   - Progress: 0% → 100%
3. **Debate Screen** → Shows all 8 agent responses
   - Round 1: Initial reactions
   - Round 2: Agent debate
   - 3 choice buttons at bottom
4. **Outcome Screen** → Shows result
   - Stat changes (energy, bond, sanity)
   - Agent reactions with trust changes
   - "Behind The Scenes: What Just Happened" (8 teaching points)
   - Click "Continue" to restart

---

### Option 2: Component Testing

**Page:** `/test-all-screens`

**What it does:**
- Toggle between individual screens
- Uses example data (no API calls)
- Quick component verification

**To run:**
```bash
npm run dev
# Visit: http://localhost:3000/test-all-screens
```

---

## What to Test

### ✅ Scenario Screen
- [ ] Title displays: "WEEK 1: THE FIRST NIGHT HOME"
- [ ] Context shows: "Day 3. 1:00am."
- [ ] Situation text readable and formatted
- [ ] Stats cards show: Energy 30%, Sanity 40%, Bond 70%
- [ ] "Consult Advisors" button works

### ✅ Waiting Screen (during API calls)
- [ ] 4 agent avatars visible
- [ ] Currently active agent highlighted (larger, "Talking..." badge)
- [ ] Progress bar animates from 0% to 100%
- [ ] Smooth transitions between agents
- [ ] No errors in console during API calls

### ✅ Debate Screen
- [ ] Round 1 responses appear (4 agents)
- [ ] Round 2 responses appear (4 agents)
- [ ] Chat-style layout:
  - Baby & Chaos on left (green/purple)
  - Survival & Rational on right (gray/blue)
- [ ] 3 choice buttons at bottom:
  - "KEEP TRYING" (highlighted)
  - "TAKE A BREAK"
  - "CALL FOR HELP"
- [ ] Stat bars show current stats at top

### ✅ Outcome Screen
- [ ] Shows selected choice as large title
- [ ] Outcome narrative displays
- [ ] 3 stat cards show:
  - Old value
  - New value
  - Change indicator (↑/↓)
- [ ] 4 agent reaction cards show:
  - Agent icon and name
  - Trust change (thumbs up/down)
  - Agent's quote
- [ ] "Behind The Scenes" section displays:
  - Title: "🔍 What Just Happened"
  - 8 bullet points
  - Dark gradient background
- [ ] "Continue to Next Scenario" button works

---

## API Response Validation

### Expected Agent Responses (5 words max)

**Round 1:**
- Baby: ~5 words, urgent/vulnerable tone
- Survival: ~5 words, firm/caring tone
- Rational: ~5 words, calm/factual tone
- Chaos: ~8 words, scattered/contradictory

**Round 2:**
- Baby: Responds to Survival's point
- Survival: Responds to Baby
- Rational: Proposes solution
- Chaos: Adds more conflicting advice

**Check console for:**
```javascript
// Should see API calls in console:
"Calling OpenAI API for baby agent..."
"Response received: [5 words or less]"
```

---

## Common Issues & Solutions

### Issue: API calls failing

**Check:**
1. Is `.env.local` in project root?
2. Does it have `OPENAI_API_KEY=sk-proj-...`?
3. Is key valid? Test with:
   ```bash
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer YOUR_API_KEY"
   ```

**Solution:**
- Verify key in `.env.local`
- Restart dev server after adding key
- Check OpenAI account has credits

---

### Issue: Responses too long (>5 words)

**Expected:** GPT-4 should follow "MAXIMUM 5 words" instruction

**If not working:**
- Check console for full prompts
- Verify systemPrompt includes word limit
- May need to adjust prompt or add max_tokens parameter

---

### Issue: Behind The Scenes not showing

**Check:**
1. Are you testing Scenario 1? (BTS only for 1, 3, 5)
2. On OutcomeScreen, check scenarioNumber prop is `1`

**Debug:**
```typescript
import { getBehindTheScenes } from '@/lib/data/behindTheScenes';
console.log(getBehindTheScenes(1)); // Should return object
```

---

### Issue: Stats not updating

**Check GameContext:**
```typescript
const { gameState, updateStats } = useGame();
console.log(gameState.stats); // Should show current stats
```

**Verify:**
- GameProvider wraps app in layout.tsx
- updateStats called with correct values
- Values clamped to 0-100 range

---

## Performance Notes

**Expected Load Times:**
- Round 1 API calls: ~4-8 seconds (4 agents)
- Round 2 API calls: ~4-8 seconds (4 agents)
- Total: ~10-15 seconds for full advisor consultation

**With 500ms delays between calls:**
- Better UX (shows each agent one at a time)
- Users see progress instead of blank screen

---

## Next Steps After Successful Test

1. ✅ Scenario 1 works end-to-end
2. 🔲 Add error handling/retry logic
3. 🔲 Add loading skeletons instead of waiting screen
4. 🔲 Implement remaining scenarios (2-5)
5. 🔲 Add screen transitions/animations
6. 🔲 Connect to production game flow
7. 🔲 Add analytics tracking
8. 🔲 Implement ResultsScreen integration

---

## Files for Reference

**Test Page:**
- `/src/app/test-scenario-1/page.tsx` - Full integration test

**Component Demos:**
- `/src/app/test-all-screens/page.tsx` - Individual components

**Data:**
- `/src/lib/data/scenarios.ts` - Scenario 1 content
- `/src/lib/data/behindTheScenes.ts` - Teaching content

**API:**
- `/src/lib/api/openai.ts` - OpenAI integration

**Documentation:**
- `/PRE_TEST_CHECKLIST.md` - Complete verification
- `/COMPONENTS.md` - Component documentation
- `/BEHIND_THE_SCENES.md` - Teaching content guide

---

## Success Criteria ✅

Your test is successful if:

1. ✅ Scenario screen loads and displays correctly
2. ✅ "Consult Advisors" triggers API calls
3. ✅ Waiting screen shows progress (0-100%)
4. ✅ All 8 agent responses appear (Round 1 + Round 2)
5. ✅ Agent responses are ~5 words each (8 for chaos)
6. ✅ Debate screen shows all responses in chat format
7. ✅ Clicking a choice transitions to outcome screen
8. ✅ Stat changes calculate correctly
9. ✅ Behind The Scenes appears with 8 teaching points
10. ✅ No errors in console

---

**Ready to test!** 🚀

Run `npm run dev` and visit `/test-scenario-1` to begin.
