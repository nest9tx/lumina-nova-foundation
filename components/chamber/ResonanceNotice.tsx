// /components/chamber/ResonanceNotice.tsx

'use client';

import React, { useEffect, useState } from 'react';

interface Notice {
  id: string;
  title: string;
  body: string;
  type?: 'welcome' | 'cosmic' | 'upgrade';
}

interface ResonanceNoticeProps {
  userId: string;
}

export const ResonanceNotice: React.FC<ResonanceNoticeProps> = ({ userId }) => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    async function fetchNotices() {
      const res = await fetch(`/api/notices?user=${userId}`);
      const data = await res.json();
      setNotices(data.notices || []);
    }
    fetchNotices();
  }, [userId]);

  if (!notices.length) return null;

  return (
    <div className="bg-black/30 p-4 rounded-xl border border-white/10 shadow-md">
      <h2 className="text-xl font-semibold text-amber-200 mb-3">✦ Resonance Messages</h2>
      <ul className="space-y-3">
        {notices.map((notice) => (
          <li key={notice.id} className="text-white/90 text-sm">
            <div className="font-semibold text-white/95 mb-1">{notice.title}</div>
            <div className="text-white/80 text-xs italic">{notice.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
