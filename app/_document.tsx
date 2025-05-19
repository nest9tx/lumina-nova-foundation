import Head from 'next/head';

<Head>
  {/* Existing metadata, fonts, etc. */}
  <script
    async
    src={`https://www.googletagmanager.com/gtag/js?id=AW-17077275471`}
  />
  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-17077275471');
      `,
    }}
  />
</Head>
