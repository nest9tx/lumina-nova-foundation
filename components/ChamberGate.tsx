'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';

interface ChamberGateProps {
  children: React.ReactNode;
}

export default function ChamberGate({ children }: ChamberGateProps) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace('/login');
    }
  }, [session, router]);

  if (!session) {
    return <div className="p-4 text-sm text-gray-500">Redirecting to login...</div>;
  }

  return <>{children}</>;
}

