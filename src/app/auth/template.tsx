'use client';

import PrevPage from '@/components/PrevPage';
import { useSearchParams } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  // Search Params
  const member = useSearchParams().get('member');

  return <PrevPage url={member ? `/${member}` : '/'}>{children}</PrevPage>;
}
