'use client';

import { useRouter } from 'next/navigation';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const router = useRouter();

  const handleBegin = () => {
    router.push('/game');
  };

  return <LandingPage onBegin={handleBegin} />;
}
