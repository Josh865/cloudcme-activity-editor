import React from "react";
import { parseTime } from "@internationalized/date";
import {
  TimeField as AriaTimeField,
  DateInput,
  DateSegment,
} from "react-aria-components";

import { cn } from "~/lib/utils";

type TimeFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

const TimeField = React.forwardRef<
  React.ElementRef<typeof AriaTimeField>,
  TimeFieldProps
>(({ value, onChange, ...props }, ref) => {
  return (
    <AriaTimeField
      ref={ref}
      value={parseTime(value)}
      onChange={(value) => onChange(value.toString())}
      {...props}
    >
      <DateInput
        className={cn(
          "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {(segment) => (
          <DateSegment
            className={cn(
              "rounded-md p-1 text-end outline-none focus:bg-muted focus:text-muted-foreground",
            )}
            segment={segment}
          />
        )}
      </DateInput>
    </AriaTimeField>
  );
});
TimeField.displayName = "Time Field";

export { TimeField };
