import Script from 'next/script';

export default function Head() {
  return (
    <>
      <title>Lumina Nova</title>
      <meta name="description" content="A sanctuary for seekers of resonance and remembrance." />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17077275471"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
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