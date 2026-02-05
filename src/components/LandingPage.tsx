'use client';

import { motion } from 'framer-motion';
import { AgentType } from '@/lib/types/game';

interface LandingPageProps {
  onBegin: () => void;
  onSkip?: () => void;
}

export default function LandingPage({ onBegin, onSkip }: LandingPageProps) {
  // Agent configuration
  const agents: Array<{
    type: AgentType;
    name: string;
    objective: string;
    icon: string;
    color: string;
    bgColor: string;
  }> = [
    {
      type: 'baby',
      name: 'Baby Agent',
      objective: 'Optimize for comfort',
      icon: 'child_care',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/20 border-pink-500/30',
    },
    {
      type: 'survival',
      name: 'Survival Agent',
      objective: 'Optimize for your sustainability',
      icon: 'shield',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20 border-yellow-500/30',
    },
    {
      type: 'rational',
      name: 'Rational Agent',
      objective: 'Optimize for evidence',
      icon: 'psychology',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20 border-blue-500/30',
    },
    {
      type: 'chaos',
      name: 'Chaos Agent',
      objective: 'Optimize for all advice',
      icon: 'shuffle',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20 border-purple-500/30',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  const agentCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-background-dark text-white overflow-hidden">
      {/* Ambient glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lamp-glow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Act 1: The Setup */}
        <motion.div
          className="text-center mb-12 space-y-4"
          variants={textVariants}
        >
          <p className="text-primary text-sm font-bold tracking-widest uppercase">
            It&apos;s 1:00 AM.
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Your baby has been crying
            <br />
            for 2 hours.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everyone has different advice. Your partner. Your mother. Google. Your gut.
          </p>
        </motion.div>

        {/* Act 2: Meet The Agents */}
        <motion.div className="mb-12 w-full" variants={textVariants}>
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">
            Meet Your Advisors
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
            variants={containerVariants}
          >
            {agents.map((agent) => (
              <motion.div
                key={agent.type}
                variants={agentCardVariants}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                {/* Agent Icon */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${agent.bgColor} flex items-center justify-center border`}
                  >
                    <span className={`material-symbols-outlined ${agent.color} text-3xl`}>
                      {agent.icon}
                    </span>
                  </div>
                </div>

                {/* Agent Info */}
                <div className="text-center">
                  <h3 className="text-white font-bold mb-2">{agent.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {agent.objective}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Act 3: The Reveal */}
        <motion.div
          className="text-center mb-12 space-y-4"
          variants={textVariants}
        >
          <p className="text-2xl md:text-3xl font-bold leading-tight">
            This is what AI alignment
            <br />
            <span className="text-primary">feels like.</span>
          </p>
          <p className="text-gray-400 text-lg">
            They&apos;ll debate. You decide.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onBegin}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="w-full max-w-md h-16 bg-primary hover:bg-green-400 text-background-dark rounded-full font-bold text-xl shadow-[0_0_30px_rgba(19,236,73,0.4)] flex items-center justify-center gap-3 group"
        >
          <span>Begin Your Journey</span>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </motion.button>

        {/* Skip Link */}
        {onSkip && (
          <motion.button
            onClick={onSkip}
            variants={textVariants}
            className="mt-8 text-gray-500 hover:text-primary transition-colors text-sm"
          >
            Skip intro →
          </motion.button>
        )}

        {/* Footer Info */}
        <motion.div
          variants={textVariants}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>~15 minutes • 5 scenarios • No right answers</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
