import * as React from "react";

import { cn } from "@/utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-white/10 backdrop-blur-md shadow-md p-6 transition hover:shadow-lg",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };


