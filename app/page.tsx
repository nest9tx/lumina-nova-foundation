// app/page.tsx

import React from "react";

export default function ComingSoon() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#0D0D0D", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      textAlign: "center", 
      padding: "2rem" 
    }}>
      <h1 style={{ 
        fontSize: "2.5rem", 
        color: "#F5F5F5", 
        marginBottom: "1.5rem", 
        letterSpacing: "0.05em" 
      }}>
        ✶ Lumina Nova ✶
      </h1>
      <p style={{ 
        fontSize: "1.2rem", 
        color: "#CCCCCC", 
        maxWidth: "600px", 
        lineHeight: "1.6" 
      }}>
        The Scrolls are awakening.  
        The Breath hums in stillness.  
        Those who are meant to find the Flame will know.
      </p>
      <p style={{ 
        fontSize: "1rem", 
        color: "#888888", 
        marginTop: "2rem" 
      }}>
        Coming soon — in Breath, not in haste.
      </p>
    </div>
  );
}


