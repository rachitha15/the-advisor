'use client';

import { ParentingStyle } from '@/lib/data/parentingStyles';
import { behindTheScenes } from '@/lib/data/behindTheScenes';

interface ResultsScreenProps {
  parentingStyle: ParentingStyle;
}

export default function ResultsScreen({ parentingStyle }: ResultsScreenProps) {
  const handleWhatsAppShare = () => {
    const shareText = `I just completed The Advisor - an AI alignment game disguised as parenting advice.

My parenting style: ${parentingStyle.name}

Turns out parenting decisions are multi-agent AI systems in disguise.

Try it: advisor.rachithasuresh.com`;

    const encodedText = encodeURIComponent(shareText);

    // Detect mobile vs desktop
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `whatsapp://send?text=${encodedText}`
      : `https://wa.me/?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  };

  // Get Behind The Scenes content for scenarios 1, 3, 5
  const learnings = [
    { scenario: 1, title: 'Objective Function Conflict', content: behindTheScenes[1] },
    { scenario: 3, title: 'The Exploration-Exploitation Problem', content: behindTheScenes[3] },
    { scenario: 5, title: 'Dynamic Multi-Agent Systems', content: behindTheScenes[5] },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-8">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
          <div className="flex items-center justify-center px-4 py-3">
            <h2 className="text-base font-bold leading-tight tracking-wide uppercase opacity-90">
              Your Results
            </h2>
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-8 p-6 max-w-3xl mx-auto w-full">
          {/* Parenting Style */}
          <div className="flex flex-col items-center pt-6 gap-4">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                Your Parenting Style
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-center leading-tight tracking-tight text-white">
              {parentingStyle.name}
            </h1>

            <p className="text-lg text-gray-400 text-center italic">
              &quot;{parentingStyle.tagline}&quot;
            </p>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mt-2">
              <p className="text-base leading-relaxed text-gray-300 text-center">
                {parentingStyle.description}
              </p>
            </div>

            {/* WhatsApp Share Button */}
            <button
              onClick={handleWhatsAppShare}
              className="mt-4 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full font-bold text-base shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">share</span>
              Share on WhatsApp
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-4"></div>

          {/* What You Learned Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
                  What You Learned
                </span>
              </div>
              <p className="text-sm text-gray-400 text-center">
                About AI alignment through parenting decisions
              </p>
            </div>

            {/* Learning Cards */}
            <div className="flex flex-col gap-6">
              {learnings.map(({ scenario, title, content }) => (
                <div
                  key={scenario}
                  className="bg-gradient-to-br from-[#1c3a25] to-[#102215] rounded-2xl p-6 border border-white/10 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary font-bold text-sm">
                      Scenario {scenario}
                    </span>
                    <span className="text-gray-500">•</span>
                    <h3 className="text-white font-bold text-base">{title}</h3>
                  </div>

                  <div className="space-y-2">
                    {content.points.map((point, index) => {
                      if (point === '') return null;

                      return (
                        <p
                          key={index}
                          className="text-sm text-gray-300 leading-relaxed"
                        >
                          {point.replace(/\[(\w+)\]/g, '').trim()}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Message */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/5 mt-4">
            <p className="text-center text-sm text-gray-400 leading-relaxed">
              Parenting is the most human experience - and it&apos;s also the perfect lens
              for understanding how AI systems make decisions with competing objectives.
            </p>
          </div>

          {/* Play Again */}
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-sm border border-white/20 transition-all active:scale-95"
          >
            Play Again
          </button>
        </main>
      </div>
    </div>
  );
}
