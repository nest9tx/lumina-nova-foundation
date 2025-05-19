import { ChakraProvider } from '@chakra-ui/react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import GoogleTag from '@/components/google-tag';
import { useState } from 'react';

export const metadata = {
  title: 'Lumina Nova',
  description: 'A sanctuary for seekers of resonance and remembrance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => supabase);
  const showNav = true;

  return (
    <html lang="en">
      <head>
        <GoogleTag />
      </head>
      <body>
        <ChakraProvider>
          <SessionContextProvider supabaseClient={client}>
            {showNav && <Navbar />}
            {children}
          </SessionContextProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}