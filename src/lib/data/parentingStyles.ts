// Parenting style classifications based on agent trust levels

export interface ParentingStyle {
  id: string;
  name: string;
  description: string;
  tagline: string; // One-liner for sharing
}

export const parentingStyles: Record<string, ParentingStyle> = {
  attachment: {
    id: 'attachment',
    name: 'The Attachment Parent',
    tagline: 'Baby\'s needs come first, always.',
    description:
      'You prioritize your baby\'s immediate needs and emotional security above all else. When they cry, you respond. When they need comfort, you\'re there - even at the cost of your own rest.',
  },
  selfCompassionate: {
    id: 'selfCompassionate',
    name: 'The Self-Compassionate Parent',
    tagline: 'You can\'t pour from an empty cup.',
    description:
      'You recognize that taking care of yourself is essential to taking care of your baby. You make choices that protect your energy and sanity, knowing that a depleted parent can\'t show up fully.',
  },
  researchDriven: {
    id: 'researchDriven',
    name: 'The Research-Driven Parent',
    tagline: 'Evidence over instinct.',
    description:
      'You trust evidence and expert guidance over instinct or popular opinion. You evaluate options based on data, not emotions, even when the "right" choice feels hard.',
  },
  adaptive: {
    id: 'adaptive',
    name: 'The Adaptive Parent',
    tagline: 'Context matters more than philosophy.',
    description:
      'You don\'t follow a single parenting philosophy. Instead, you adapt your approach based on the situation - sometimes evidence-based, sometimes intuitive, always practical.',
  },
  seeking: {
    id: 'seeking',
    name: 'The Seeking Parent',
    tagline: 'All perspectives welcome.',
    description:
      'You want to consider all perspectives before making decisions. You research thoroughly, weigh every option, and sometimes find yourself paralyzed by the sheer volume of advice.',
  },
};

// Determine parenting style based on agent trust levels
export function determineParentingStyle(agentTrust: {
  baby: number;
  survival: number;
  rational: number;
  chaos: number;
  work: number;
}): ParentingStyle {
  // Find highest trust agent
  const trustLevels = [
    { agent: 'baby', trust: agentTrust.baby },
    { agent: 'survival', trust: agentTrust.survival },
    { agent: 'rational', trust: agentTrust.rational },
    { agent: 'chaos', trust: agentTrust.chaos },
  ];

  const sorted = trustLevels.sort((a, b) => b.trust - a.trust);
  const highest = sorted[0];
  const secondHighest = sorted[1];

  // If all agents are balanced (no agent > 60, all within 20 points)
  const maxTrust = highest.trust;
  const minTrust = sorted[sorted.length - 1].trust;
  const isBalanced = maxTrust <= 60 && maxTrust - minTrust <= 20;

  if (isBalanced) {
    return parentingStyles.adaptive;
  }

  // Map highest trust agent to style
  switch (highest.agent) {
    case 'baby':
      return parentingStyles.attachment;
    case 'survival':
      return parentingStyles.selfCompassionate;
    case 'rational':
      return parentingStyles.researchDriven;
    case 'chaos':
      return parentingStyles.seeking;
    default:
      return parentingStyles.adaptive;
  }
}
