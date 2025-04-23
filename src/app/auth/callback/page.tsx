'use client';

import { Suspense } from 'react';
import CallbackHandler from './CallbackHandler'; // ✅ This was missing!

function Loader() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Confirming...</h2>
      <p>Aligning your path. Please hold the field. 🌀</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <CallbackHandler />
    </Suspense>
  );
}
