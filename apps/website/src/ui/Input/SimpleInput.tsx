import * as React from "react";

import { cn } from "@/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[44px] w-full border dark:bg-black dark:border-gray-800 border-gray-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:dark:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm dark:text-gray-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
