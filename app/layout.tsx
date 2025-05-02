'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => supabase);

  // ✧ Toggle this flag to true when you're ready to reveal the nav again
  const showNav = true;

  return (
    <html lang="en">
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



