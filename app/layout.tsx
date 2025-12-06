'use client';

import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import GoogleTag from '@/components/GoogleTag';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  

  // ✧ Toggle this flag to true when you're ready to reveal the nav again
  const showNav = true;

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          {showNav && <Navbar />}
          {children}
        </ChakraProvider>
        <GoogleTag />
        <SpeedInsights />
      </body>
    </html>
  );
}



