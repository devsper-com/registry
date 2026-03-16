import { forwardRef, type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type Variant = "default" | "outline" | "ghost" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "default" | "sm" | "lg";
}

const variants: Record<Variant, string> = {
  default:
    "bg-ds-text text-ds-bg border border-ds-border hover:bg-ds-accent hover:text-ds-bg transition-opacity",
  outline:
    "bg-transparent border border-ds-border text-ds-text hover:bg-ds-surface transition-opacity",
  ghost: "bg-transparent text-ds-text hover:bg-ds-surface transition-opacity",
  destructive:
    "bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 transition-opacity",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "inline-flex items-center justify-center font-mono text-xs tracking-wider uppercase focus:outline-none focus:ring-1 focus:ring-ds-muted disabled:opacity-50 disabled:pointer-events-none",
        size === "default" && "px-4 py-2",
        size === "sm" && "px-3 py-1.5 text-[10px]",
        size === "lg" && "px-6 py-3 text-sm",
        variants[variant],
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
);
Button.displayName = "Button";
