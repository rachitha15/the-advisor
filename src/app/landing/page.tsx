'use client';

import { useRouter } from 'next/navigation';
import LandingPage from '@/components/LandingPage';

export default function Landing() {
  const router = useRouter();

  const handleBegin = () => {
    router.push('/test-scenario-1');
  };

  const handleSkip = () => {
    router.push('/test-scenario-1');
  };

  return <LandingPage onBegin={handleBegin} onSkip={handleSkip} />;
}
