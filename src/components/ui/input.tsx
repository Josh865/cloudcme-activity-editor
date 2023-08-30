import * as React from "react";

import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  addOn?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, addOn, ...props }, ref) => {
    return (
      <div className="flex">
        {addOn ? (
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-muted-foreground sm:text-sm">
            {addOn}
          </span>
        ) : null}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            addOn ? "rounded-r-md" : "rounded-md",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
