// components/ui/card.tsx

import * as React from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-md",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };

// components/ui/button.tsx

import * as React from "react";
import { Slot } from "./slot";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost";

const buttonVariants = ({
  variant = "default",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  return cn(base, variants[variant], className);
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp ref={ref} className={buttonVariants({ variant, className })} {...props} />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };

// components/ui/slot.tsx

export interface SlotProps extends React.HTMLAttributes<HTMLDivElement> {}

const Slot = React.forwardRef<HTMLDivElement, SlotProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
));
Slot.displayName = "Slot";

export { Slot };



