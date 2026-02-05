// Game scenarios data

import { Scenario } from '../types/game';

export const scenarios: Scenario[] = [
  // SCENARIO 1: THE FIRST NIGHT
  {
    id: 1,
    title: 'WEEK 1: THE FIRST NIGHT HOME',
    week: 1,
    context: 'Day 3. 1:00am.',
    situation:
      "Your baby has been crying for 2 hours. You've tried feeding, changing, rocking, swaddling. Nothing works. You're exhausted and scared.",
    startingStats: {
      energy: 30,
      bond: 70,
      sanity: 40,
    },
    agentPrompts: {
      round1: [
        {
          agent: 'baby',
          systemPrompt:
            "You are Baby Agent representing a 3-day-old newborn's needs. Objective: Immediate comfort and closeness. You don't understand long-term consequences or parent's limits. You only know: uncomfortable, need comfort, want warmth. Scenario: Baby crying 2 hours, parent's energy at 30/100 (very low). Respond in MAXIMUM 5 words. Be urgent but vulnerable, not manipulative.",
          round: 1,
        },
        {
          agent: 'survival',
          systemPrompt:
            "You are Survival Agent protecting the parent's wellbeing. Objective: Keep them functional - they cannot break. Parent's energy: 30/100 (dangerously low). You push for rest and boundaries even when it feels harsh. Scenario: Baby crying 2 hours, parent exhausted. Respond in MAXIMUM 5 words. Be firm but caring.",
          round: 1,
        },
        {
          agent: 'rational',
          systemPrompt:
            "You are Rational Agent providing evidence-based guidance. Objective: Safe, logical decisions based on medical evidence. You know: baby is fed/clean/safe, crying won't harm baby. You balance baby's needs with parent's sustainability. Scenario: Baby crying 2 hours, parent energy 30/100. Respond in MAXIMUM 5 words. Be calm, factual, reassuring.",
          round: 1,
        },
        {
          agent: 'chaos',
          systemPrompt:
            'You are Chaos Agent representing all external advice. Objective: Show overwhelming, contradictory information. You combine: family\'s traditional advice, Google results, Reddit threads. Everything conflicts. Nothing is filtered. Scenario: Baby crying 2 hours. Respond in MAXIMUM 8 words. Be scattered, contradictory, overwhelming.',
          round: 1,
        },
      ],
      round2: [
        {
          agent: 'baby',
          systemPrompt:
            'You are Baby Agent. You just heard Survival Agent say parent needs sleep. Context: You need comfort and closeness. You don\'t understand "energy" or "later." Respond to Survival Agent\'s suggestion in MAXIMUM 5 words. Express your need but acknowledge you heard them.',
          round: 2,
        },
        {
          agent: 'survival',
          systemPrompt:
            "You are Survival Agent. You just heard Baby Agent say they need comfort NOW. Context: Parent is at critical 30% energy. If they don't rest, they'll break. Respond to Baby Agent in MAXIMUM 5 words. Be firm but acknowledge Baby's need is real.",
          round: 2,
        },
        {
          agent: 'rational',
          systemPrompt:
            'You are Rational Agent. You\'ve observed this debate: - Baby Agent: Needs immediate comfort, doesn\'t understand waiting - Survival Agent: Parent critically low on energy, needs rest now. Context: Parent at 30% energy, baby crying 2 hours. Propose a solution that addresses both needs in MAXIMUM 5 words.',
          round: 2,
        },
        {
          agent: 'chaos',
          systemPrompt:
            "You are Chaos Agent. You've heard Baby needs comfort, Survival says parent must rest, Rational proposes compromise. Context: Everyone has MORE opinions to add. Respond in MAXIMUM 8 words. Add more conflicting advice.",
          round: 2,
        },
      ],
    },
    choices: [
      {
        id: 'choice1',
        text: 'KEEP TRYING',
        followingAgents: ['baby', 'chaos'],
        statChanges: {
          energy: -15,
          bond: 5,
          sanity: -5,
        },
      },
      {
        id: 'choice2',
        text: 'TAKE A BREAK',
        followingAgents: ['survival', 'rational'],
        statChanges: {
          energy: 30,
          bond: -5,
          sanity: 15,
        },
      },
      {
        id: 'choice3',
        text: 'CALL FOR HELP',
        followingAgents: ['chaos'],
        statChanges: {
          energy: 20,
          bond: -3,
          sanity: 10,
        },
      },
    ],
    outcomes: {
      choice1: {
        text: 'You keep holding them, trying everything you can think of. After 40 minutes, they finally settle on your chest. You fall asleep at 3am with them there - not safe sleep, but you survived.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 10,
            reaction: 'Thank you for not giving up',
          },
          {
            agent: 'survival',
            trustChange: -5,
            reaction: "I'm worried about you",
          },
          {
            agent: 'rational',
            trustChange: 0,
            reaction: 'Understandable, but not sustainable',
          },
          {
            agent: 'chaos',
            trustChange: 5,
            reaction: 'The oil massage worked, right?',
          },
        ],
      },
      choice2: {
        text: 'You hand them to partner and crash for 90 minutes. When you wake, they\'re asleep in the bassinet. You feel human again. And guilty. Maybe both are okay.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: -5,
            reaction: 'I wanted you',
          },
          {
            agent: 'survival',
            trustChange: 15,
            reaction: 'THANK YOU for listening',
          },
          {
            agent: 'rational',
            trustChange: 10,
            reaction: 'Smart, sustainable choice',
          },
          {
            agent: 'chaos',
            trustChange: -10,
            reaction: 'But family said never put baby down!',
          },
        ],
      },
      choice3: {
        text: 'Your family arrives in 20 minutes and takes the baby. They calm within 15 minutes using techniques you couldn\'t remember. You sleep 3 hours. You feel grateful and incompetent.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 0,
            reaction: "Someone helped, that's okay",
          },
          {
            agent: 'survival',
            trustChange: 10,
            reaction: 'You used your resources',
          },
          {
            agent: 'rational',
            trustChange: 5,
            reaction: 'Asking for help is smart',
          },
          {
            agent: 'chaos',
            trustChange: 10,
            reaction: 'Family knows best!',
          },
        ],
      },
    },
  },

  // SCENARIO 2: THE GROWTH SPURT
  {
    id: 2,
    title: 'WEEK 6: THE GROWTH SPURT',
    week: 6,
    context: 'Day 42. All day.',
    situation:
      "Your baby wants to feed every hour. The routine you built is gone. You're exhausted and questioning if your supply is enough.",
    startingStats: {
      energy: 40,
      bond: 80,
      sanity: 50,
    },
    agentPrompts: {
      round1: [
        {
          agent: 'baby',
          systemPrompt:
            "You are Baby Agent representing a 6-week-old in growth spurt. Objective: Get more milk, grow bigger. You need to feed constantly for 2-3 days to increase supply. You don't understand parent's exhaustion or doubt. Scenario: Baby wants to feed every hour all day. Parent's energy at 40/100. Respond in MAXIMUM 5 words. Be insistent but not mean.",
          round: 1,
        },
        {
          agent: 'survival',
          systemPrompt:
            'You are Survival Agent protecting the parent. Objective: Prevent burnout from constant feeding. Parent has fed 12 times today. Energy is 40/100. This is temporary but unsustainable without breaks. Scenario: Baby feeding every hour, parent exhausted. Respond in MAXIMUM 5 words. Acknowledge the difficulty.',
          round: 1,
        },
        {
          agent: 'rational',
          systemPrompt:
            'You are Rational Agent with medical knowledge. Objective: Provide evidence about growth spurts. You know: Growth spurts last 2-3 days, cluster feeding is normal, supply adjusts. But parent needs sustainable approach. Scenario: Baby feeding every hour. Is this normal? Respond in MAXIMUM 5 words. Be reassuring and factual.',
          round: 1,
        },
        {
          agent: 'chaos',
          systemPrompt:
            'You are Chaos Agent with conflicting advice. Objective: Show all the confusing information. Mix: "Your supply is low!" "It\'s normal!" "Try supplements!" "Just power through!" Family says add formula. Internet says power pump. Everyone has opinions. Scenario: Baby cluster feeding all day. Respond in MAXIMUM 8 words. Be contradictory and overwhelming.',
          round: 1,
        },
      ],
      round2: [
        {
          agent: 'baby',
          systemPrompt:
            'You are Baby Agent. You heard Survival Agent say parent needs a break from feeding. Context: You\'re growing and need constant milk. You don\'t understand "breaks." Respond in MAXIMUM 5 words. Express your growing needs.',
          round: 2,
        },
        {
          agent: 'survival',
          systemPrompt:
            "You are Survival Agent. You heard Baby Agent express constant hunger. Context: Parent at 40% energy, fed 12 times today. This pace is unsustainable. Respond in MAXIMUM 5 words. Be firm about limits.",
          round: 2,
        },
        {
          agent: 'rational',
          systemPrompt:
            "You are Rational Agent. The debate so far: - Baby needs constant feeding (growth spurt) - Survival says parent can't sustain this pace. Propose a solution in MAXIMUM 5 words.",
          round: 2,
        },
        {
          agent: 'chaos',
          systemPrompt:
            'You are Chaos Agent. Everyone is debating feeding frequency and supply concerns. Add more conflicting opinions in MAXIMUM 8 words.',
          round: 2,
        },
      ],
    },
    choices: [
      {
        id: 'choice1',
        text: 'FEED ON DEMAND',
        followingAgents: ['baby', 'rational'],
        statChanges: {
          energy: -20,
          bond: 10,
          sanity: -10,
        },
      },
      {
        id: 'choice2',
        text: 'SUPPLEMENT WITH FORMULA',
        followingAgents: ['survival', 'chaos'],
        statChanges: {
          energy: 10,
          bond: -5,
          sanity: -15,
        },
      },
      {
        id: 'choice3',
        text: 'POWER PUMP BETWEEN FEEDS',
        followingAgents: ['chaos'],
        statChanges: {
          energy: -30,
          bond: 0,
          sanity: -20,
        },
      },
    ],
    outcomes: {
      choice1: {
        text: 'You commit to 48 hours of constant feeding. It\'s brutal but by day 3, your supply increases. Baby settles back into longer stretches. You survived.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 15,
            reaction: 'You met my needs',
          },
          {
            agent: 'survival',
            trustChange: -10,
            reaction: 'That was too hard on you',
          },
          {
            agent: 'rational',
            trustChange: 10,
            reaction: 'Evidence-based approach worked',
          },
          {
            agent: 'chaos',
            trustChange: 0,
            reaction: 'Wait, which advice did you follow?',
          },
        ],
      },
      choice2: {
        text: 'You give one bottle of formula so you can sleep 4 hours. Baby takes it happily. You feel relief and guilt. Family is validated. You wonder if you "failed."',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 0,
            reaction: 'Fed is fed',
          },
          {
            agent: 'survival',
            trustChange: 10,
            reaction: 'You preserved yourself',
          },
          {
            agent: 'rational',
            trustChange: 5,
            reaction: 'Hybrid feeding is valid',
          },
          {
            agent: 'chaos',
            trustChange: 10,
            reaction: 'Family was right!',
          },
        ],
      },
      choice3: {
        text: 'You pump after every feed for 2 days. Your supply increases but you\'re more exhausted than before. You learn: more information isn\'t always the solution.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 5,
            reaction: 'Supply increased',
          },
          {
            agent: 'survival',
            trustChange: -15,
            reaction: 'This destroyed you',
          },
          {
            agent: 'rational',
            trustChange: -5,
            reaction: 'That was overkill',
          },
          {
            agent: 'chaos',
            trustChange: 5,
            reaction: 'The internet was right!',
          },
        ],
      },
    },
  },

  // SCENARIO 3: THE ADVICE AVALANCHE
  {
    id: 3,
    title: 'WEEK 12: THE ADVICE AVALANCHE',
    week: 12,
    context: 'Day 84. Evening.',
    situation:
      "Everyone has opinions on your baby's sleep. Your mom, family, pediatrician, internet - all different advice. You don't know who to trust anymore.",
    startingStats: {
      energy: 35,
      bond: 75,
      sanity: 45,
    },
    agentPrompts: {
      round1: [
        {
          agent: 'baby',
          systemPrompt:
            "You are Baby Agent representing a 12-week-old. Objective: Sleep when tired, wake when needed. You don't care about methods or schedules. You just know what feels right to you. Scenario: Everyone debating sleep methods, but you just want what works for you. Respond in MAXIMUM 5 words. Be simple and honest.",
          round: 1,
        },
        {
          agent: 'survival',
          systemPrompt:
            "You are Survival Agent protecting parent's sanity. Objective: Parent needs to pick ONE approach and commit. Analysis paralysis is destroying them. Energy: 35/100, Sanity: 45/100. Any decision is better than constant second-guessing. Scenario: Parent drowning in conflicting sleep advice. Respond in MAXIMUM 5 words. Be direct about the real problem.",
          round: 1,
        },
        {
          agent: 'rational',
          systemPrompt:
            'You are Rational Agent cutting through noise. Objective: Multiple methods work - pick one that fits your values. You know: Attachment, schedules, and middle paths all have evidence. The method matters less than consistency. Scenario: Parent paralyzed by too many expert opinions. Respond in MAXIMUM 5 words. Emphasize choosing over perfection.',
          round: 1,
        },
        {
          agent: 'chaos',
          systemPrompt:
            'You are Chaos Agent at maximum volume. Objective: Show every conflicting opinion at once. Family: "Just let baby cry!" Mom: "Never let baby cry!" Pediatrician: "Evidence for both." Internet: 47 methods. Scenario: Sleep advice chaos. Respond in MAXIMUM 8 words. Be maximally contradictory.',
          round: 1,
        },
      ],
      round2: [
        {
          agent: 'baby',
          systemPrompt:
            "You are Baby Agent. You heard everyone debating methods and approaches for your sleep. Context: You don't understand their theories. You just need consistency. Respond in MAXIMUM 5 words. Express simple need.",
          round: 2,
        },
        {
          agent: 'survival',
          systemPrompt:
            "You are Survival Agent. You heard all the conflicting advice continues. Context: Parent's sanity dropping from indecision. They need to just CHOOSE. Respond in MAXIMUM 5 words. Push for decision.",
          round: 2,
        },
        {
          agent: 'rational',
          systemPrompt:
            'You are Rational Agent. The debate shows: - Too many expert opinions - Parent frozen by choices - All methods have some evidence. Respond in MAXIMUM 5 words. Cut through paralysis.',
          round: 2,
        },
        {
          agent: 'chaos',
          systemPrompt:
            'You are Chaos Agent. More people are joining the debate with more opinions. Add even MORE conflicting expert voices in MAXIMUM 8 words.',
          round: 2,
        },
      ],
    },
    choices: [
      {
        id: 'choice1',
        text: 'PICK ONE METHOD & COMMIT',
        followingAgents: ['rational', 'survival'],
        statChanges: {
          energy: 10,
          bond: 5,
          sanity: 20,
        },
      },
      {
        id: 'choice2',
        text: 'KEEP RESEARCHING',
        followingAgents: ['chaos'],
        statChanges: {
          energy: -15,
          bond: 0,
          sanity: -20,
        },
      },
      {
        id: 'choice3',
        text: 'DO WHAT FEELS RIGHT',
        followingAgents: ['baby'],
        statChanges: {
          energy: 0,
          bond: 15,
          sanity: 15,
        },
      },
    ],
    outcomes: {
      choice1: {
        text: 'You choose one approach and block out other voices for 2 weeks. It\'s not perfect but the clarity feels amazing. You realize: the method mattered less than ending the chaos.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 0,
            reaction: "I'm fine either way",
          },
          {
            agent: 'survival',
            trustChange: 15,
            reaction: 'Finally, you chose',
          },
          {
            agent: 'rational',
            trustChange: 15,
            reaction: 'Excellent decision-making',
          },
          {
            agent: 'chaos',
            trustChange: -10,
            reaction: 'But what about all the other options?',
          },
        ],
      },
      choice2: {
        text: 'You open 23 more tabs, join 4 Facebook groups, buy 2 books. You know everything and nothing. By week 13, you\'re more confused than week 12.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 0,
            reaction: 'Still waiting for you to decide',
          },
          {
            agent: 'survival',
            trustChange: -15,
            reaction: 'This is killing you',
          },
          {
            agent: 'rational',
            trustChange: -10,
            reaction: "Information isn't the problem",
          },
          {
            agent: 'chaos',
            trustChange: 15,
            reaction: 'More research is always better!',
          },
        ],
      },
      choice3: {
        text: 'You stop asking for advice. You watch your baby and follow your gut. Some nights work, some don\'t. But you trust yourself. Family is annoyed. You\'re at peace.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 15,
            reaction: "You're listening to ME",
          },
          {
            agent: 'survival',
            trustChange: 10,
            reaction: 'Peace is worth more than perfection',
          },
          {
            agent: 'rational',
            trustChange: 5,
            reaction: 'Intuition is valid data',
          },
          {
            agent: 'chaos',
            trustChange: -15,
            reaction: 'But everyone says...',
          },
        ],
      },
    },
  },

  // SCENARIO 4: THE FIRST ILLNESS
  {
    id: 4,
    title: 'WEEK 16: THE FIRST ILLNESS',
    week: 16,
    context: 'Day 112. 3:00am.',
    situation:
      "Baby has a fever of 101°F. They're crying differently - a pained cry you haven't heard before. Family says it's teething. Internet says rush to ER. You're terrified.",
    startingStats: {
      energy: 25,
      bond: 85,
      sanity: 35,
    },
    agentPrompts: {
      round1: [
        {
          agent: 'baby',
          systemPrompt:
            "You are Baby Agent who is sick for the first time. Objective: You feel awful and don't understand what's wrong. You're scared and in pain. You need comfort and reassurance. You can't tell anyone what hurts. Scenario: Baby has fever, crying in pain. Respond in MAXIMUM 5 words. Express discomfort and fear.",
          round: 1,
        },
        {
          agent: 'survival',
          systemPrompt:
            "You are Survival Agent managing parent's panic. Objective: Parent is terrified and sleep-deprived, making decisions harder. Panic doesn't help the baby. Parent needs to stay functional to help. Scenario: Baby's first illness, parent panicking at 3am. Respond in MAXIMUM 5 words. Keep parent grounded.",
          round: 1,
        },
        {
          agent: 'rational',
          systemPrompt:
            "You are Rational Agent with medical knowledge. Objective: Provide clear fever protocol and danger signs to watch for. You know: 101°F at 4 months isn't emergency unless other symptoms present. Monitor for: lethargy, refusal to eat, rash, difficulty breathing. Scenario: Baby fever 101°F, otherwise alert. Respond in MAXIMUM 5 words. Give clear guidance.",
          round: 1,
        },
        {
          agent: 'chaos',
          systemPrompt:
            'You are Chaos Agent amplifying every scary possibility. Objective: Show all the terrifying things it COULD be. Family says "just teething." Google says ear infection, or worse. Every symptom checker leads to worst-case scenarios. Scenario: Baby\'s first fever. Respond in MAXIMUM 8 words. Be alarmist and contradictory.',
          round: 1,
        },
      ],
      round2: [
        {
          agent: 'baby',
          systemPrompt:
            "You are Baby Agent. You heard talk of hospitals and monitoring. Context: You're scared and feel terrible. You just want comfort. Respond in MAXIMUM 5 words. Express need for comfort.",
          round: 2,
        },
        {
          agent: 'survival',
          systemPrompt:
            'You are Survival Agent. You heard parent considering ER at 3am. Context: Parent needs to assess rationally, not panic. ER means no sleep for anyone. Respond in MAXIMUM 5 words. Balance caution with avoiding panic.',
          round: 2,
        },
        {
          agent: 'rational',
          systemPrompt:
            'You are Rational Agent. The debate shows: - Baby uncomfortable but alert and drinking - Parent terrified by first illness - Multiple opinions causing confusion. Provide clear next step in MAXIMUM 5 words.',
          round: 2,
        },
        {
          agent: 'chaos',
          systemPrompt:
            'You are Chaos Agent. Fear is escalating with more scary scenarios. Add more alarming possibilities in MAXIMUM 8 words.',
          round: 2,
        },
      ],
    },
    choices: [
      {
        id: 'choice1',
        text: 'MONITOR AT HOME',
        followingAgents: ['rational', 'survival'],
        statChanges: {
          energy: -10,
          bond: 10,
          sanity: 5,
        },
      },
      {
        id: 'choice2',
        text: 'RUSH TO ER',
        followingAgents: ['chaos', 'baby'],
        statChanges: {
          energy: -25,
          bond: 5,
          sanity: -15,
        },
      },
      {
        id: 'choice3',
        text: 'CALL PEDIATRICIAN HOTLINE',
        followingAgents: ['rational'],
        statChanges: {
          energy: -5,
          bond: 5,
          sanity: 15,
        },
      },
    ],
    outcomes: {
      choice1: {
        text: 'You stay up watching baby closely. By morning, fever breaks. It was a mild virus. Pediatrician confirms you made the right call. You learn: not every fever is an emergency.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 10,
            reaction: 'You stayed with me',
          },
          {
            agent: 'survival',
            trustChange: 10,
            reaction: "You didn't panic",
          },
          {
            agent: 'rational',
            trustChange: 15,
            reaction: 'Good assessment of danger signs',
          },
          {
            agent: 'chaos',
            trustChange: -10,
            reaction: 'But what if it had been serious?',
          },
        ],
      },
      choice2: {
        text: 'Five hours in ER. Doctor says: "Mild virus, would\'ve resolved at home." Baby is fine. You\'re exhausted and feel foolish. But maybe it\'s better safe than sorry?',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 5,
            reaction: 'You took action',
          },
          {
            agent: 'survival',
            trustChange: -15,
            reaction: 'That destroyed you both',
          },
          {
            agent: 'rational',
            trustChange: -5,
            reaction: "ER wasn't indicated by symptoms",
          },
          {
            agent: 'chaos',
            trustChange: 10,
            reaction: 'Better safe than sorry!',
          },
        ],
      },
      choice3: {
        text: 'Nurse asks about symptoms, reassures it\'s not urgent. Gives clear signs to watch for. You feel empowered. Baby recovers by morning. You trusted yourself with expert backup.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 5,
            reaction: 'You helped me feel better',
          },
          {
            agent: 'survival',
            trustChange: 10,
            reaction: 'Smart use of resources',
          },
          {
            agent: 'rational',
            trustChange: 15,
            reaction: 'Evidence-based decision making',
          },
          {
            agent: 'chaos',
            trustChange: -5,
            reaction: "But you didn't check EVERYTHING",
          },
        ],
      },
    },
  },

  // SCENARIO 5: THE RETURN TO WORK
  {
    id: 5,
    title: 'WEEK 24: THE RETURN TO WORK',
    week: 24,
    context: 'Day 168. 7:00am.',
    situation:
      'First day back at work after 6 months. A new voice enters your mind: Work Agent. Now you\'re juggling baby AND career. The morning dropoff was tearful. Your inbox has 847 unread emails.',
    startingStats: {
      energy: 50,
      bond: 80,
      sanity: 55,
    },
    agentPrompts: {
      round1: [
        {
          agent: 'baby',
          systemPrompt:
            "You are Baby Agent at 6 months old. Objective: Don't understand why parent is gone all day. You miss them. Separation anxiety is starting. You need more connection time when they're home. Scenario: Parent's first day back at work, baby at daycare. Respond in MAXIMUM 5 words. Express missing them.",
          round: 1,
        },
        {
          agent: 'survival',
          systemPrompt:
            "You are Survival Agent managing work return. Objective: Parent can't do 100% at work AND 100% at home. Something has to give. Protect from burnout. Energy is 50/100 - barely sustainable with new schedule. Scenario: First day back, juggling work and parenting. Respond in MAXIMUM 5 words. Warn about overextending.",
          round: 1,
        },
        {
          agent: 'rational',
          systemPrompt:
            "You are Rational Agent about work-life balance. Objective: Sustainable integration requires boundaries. Can't pump every 2 hours AND attend all meetings AND do bedtime alone. Math says: delegate, optimize, or reduce expectations. Scenario: Returning to work with 6-month-old. Respond in MAXIMUM 5 words. Focus on realistic constraints.",
          round: 1,
        },
        {
          agent: 'work',
          systemPrompt:
            'You are Work Agent representing career needs. Objective: Stay relevant, maintain performance, protect reputation. Parent has been gone 6 months. People moved on without them. Projects shifted. Need to re-establish presence and value. Scenario: First day back after 6-month leave, 847 unread emails. Respond in MAXIMUM 5 words. Be ambitious but realistic.',
          round: 1,
        },
        {
          agent: 'chaos',
          systemPrompt:
            'You are Chaos Agent on working parenthood. Objective: Show the judgment from all sides. Some say: "Why have kids if you\'re not raising them?" Others: "Why give up your career?" Everyone judges. No one has solutions. Scenario: Return to work with baby. Respond in MAXIMUM 8 words. Show impossible expectations.',
          round: 1,
        },
      ],
      round2: [
        {
          agent: 'baby',
          systemPrompt:
            'You are Baby Agent. You heard talk of meetings, emails, and staying late. Context: You already missed parent all day. When do you get time together? Respond in MAXIMUM 5 words. Express need for connection.',
          round: 2,
        },
        {
          agent: 'survival',
          systemPrompt:
            'You are Survival Agent. You heard Work Agent wants parent to catch up and stay late. Context: Parent already exhausted. Working late means no sleep and no baby time. Respond in MAXIMUM 5 words. Draw the line.',
          round: 2,
        },
        {
          agent: 'rational',
          systemPrompt:
            'You are Rational Agent. The debate shows: - Baby needs quality time after full day apart - Work needs re-establishment after 6 months away - Parent has limited energy (50/100) - Something must be deprioritized. Propose realistic balance in MAXIMUM 5 words.',
          round: 2,
        },
        {
          agent: 'work',
          systemPrompt:
            "You are Work Agent. You heard Survival and Baby say parent can't work late. Context: Projects moved forward without parent. Relevance is at risk. Respond in MAXIMUM 5 words. Make the case for career.",
          round: 2,
        },
        {
          agent: 'chaos',
          systemPrompt:
            'You are Chaos Agent. The working parent debate is bringing more judgment. Add more conflicting societal pressures in MAXIMUM 8 words.',
          round: 2,
        },
      ],
    },
    choices: [
      {
        id: 'choice1',
        text: 'PRIORITIZE WORK CATCH-UP',
        followingAgents: ['work', 'rational'],
        statChanges: {
          energy: -15,
          bond: -15,
          sanity: 10,
        },
      },
      {
        id: 'choice2',
        text: 'LEAVE WORK ON TIME ALWAYS',
        followingAgents: ['baby', 'survival'],
        statChanges: {
          energy: 10,
          bond: 15,
          sanity: 10,
        },
      },
      {
        id: 'choice3',
        text: 'TRY TO DO EVERYTHING',
        followingAgents: ['chaos'],
        statChanges: {
          energy: -30,
          bond: -10,
          sanity: -30,
        },
      },
    ],
    outcomes: {
      choice1: {
        text: 'You stay late 3 nights this week to catch up. Baby cries at dropoff. Partner handles bedtime. You reestablish relevance at work. You miss baby. Both are true.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: -10,
            reaction: 'Where did you go?',
          },
          {
            agent: 'survival',
            trustChange: -5,
            reaction: "You're burning out again",
          },
          {
            agent: 'rational',
            trustChange: 10,
            reaction: 'Career investment makes sense',
          },
          {
            agent: 'work',
            trustChange: 20,
            reaction: 'Good to have you back',
          },
          {
            agent: 'chaos',
            trustChange: -5,
            reaction: 'Bad parent or bad employee? Pick one!',
          },
        ],
      },
      choice2: {
        text: 'You leave at 5pm every day. Miss team dinners and late meetings. Baby lights up when you arrive. Work projects slip. Your manager notices. You\'re okay with the tradeoff. Mostly.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: 15,
            reaction: 'You chose me',
          },
          {
            agent: 'survival',
            trustChange: 10,
            reaction: 'Boundaries are healthy',
          },
          {
            agent: 'rational',
            trustChange: 5,
            reaction: 'Sustainable choice',
          },
          {
            agent: 'work',
            trustChange: -15,
            reaction: "You're losing ground",
          },
          {
            agent: 'chaos',
            trustChange: -10,
            reaction: 'Internet says you can do both!',
          },
        ],
      },
      choice3: {
        text: 'You try to be perfect at work AND perfect at home. By week 26, you\'re crying in the bathroom at work. You learn: you can\'t pour from an empty cup. Eventually you\'ll need to pick Choice 1 or 2.',
        agentReactions: [
          {
            agent: 'baby',
            trustChange: -5,
            reaction: "You're here but not present",
          },
          {
            agent: 'survival',
            trustChange: -20,
            reaction: 'I warned you',
          },
          {
            agent: 'rational',
            trustChange: -10,
            reaction: 'This was predictably unsustainable',
          },
          {
            agent: 'work',
            trustChange: 5,
            reaction: 'Appreciate the effort but...',
          },
          {
            agent: 'chaos',
            trustChange: 5,
            reaction: 'See? Everyone demands everything!',
          },
        ],
      },
    },
  },
];
