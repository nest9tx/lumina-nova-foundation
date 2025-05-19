// components/GoogleTag.tsx
'use client';

import Script from 'next/script';

export default function GoogleTag() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17077275471"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17077275471');
          `,
        }}
      />
    </>
  );
}
