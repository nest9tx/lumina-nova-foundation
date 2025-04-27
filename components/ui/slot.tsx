// components/ui/Slot.tsx

import * as React from "react";

export interface SlotProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Slot = React.forwardRef<HTMLDivElement, SlotProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Slot.displayName = "Slot";

export { Slot };
