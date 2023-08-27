import { forwardRef } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "~/lib/utils";

const MultiselectLabel = Listbox.Label;

// const MultiselectLabel = forwardRef<
//   React.ElementRef<typeof Listbox.Label>,
//   React.ComponentPropsWithoutRef<typeof Listbox.Label>
// >(({ className, ...props }, ref) => (
//   <Listbox.Label
//     ref={ref}
//     className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
//     {...props}
//   />
// ));
// MultiselectLabel.displayName = Listbox.Label.displayName;

const Multiselect = forwardRef<
  React.ElementRef<typeof Listbox>,
  React.ComponentPropsWithoutRef<typeof Listbox>
>(({ as = "div", className, ...props }, ref) => (
  <Listbox
    ref={ref}
    as={as}
    className={cn("relative w-full", className)}
    {...props}
  ></Listbox>
));
Multiselect.displayName = Listbox.displayName;

const MultiselectTrigger = forwardRef<
  React.ElementRef<typeof Listbox.Button>,
  React.ComponentPropsWithoutRef<typeof Listbox.Button>
>(({ className, children, ...props }, ref) => (
  <Listbox.Button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <>
      {children}
      <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
    </>
  </Listbox.Button>
));
MultiselectTrigger.displayName = Listbox.Button.displayName;

const MultiselectOptions = forwardRef<
  React.ElementRef<typeof Listbox.Options>,
  React.ComponentPropsWithoutRef<typeof Listbox.Options>
>(({ className, children, ...props }, ref) => (
  <Listbox.Options
    ref={ref}
    className={cn(
      "absolute z-50 mt-1 max-h-32 w-full min-w-[8rem] overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md focus:outline-none data-[headlessui-state=open]:animate-in data-[headlessui-state=closed]:animate-out data-[headlessui-state=closed]:fade-out-0 data-[headlessui-state=open]:fade-in-0 data-[headlessui-state=closed]:zoom-out-95 data-[headlessui-state=open]:zoom-in-95",
      className,
    )}
    {...props}
  >
    {children}
  </Listbox.Options>
));
MultiselectOptions.displayName = Listbox.Options.displayName;

const MultiselectOption = forwardRef<
  React.ElementRef<typeof Listbox.Option>,
  React.ComponentPropsWithoutRef<typeof Listbox.Option>
>(({ className, children, ...props }, ref) => (
  <Listbox.Option
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[headlessui-state~=active]:bg-accent data-[headlessui-state~=active]:text-accent-foreground data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    {({ selected }) => (
      <>
        {selected && (
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <CheckIcon className="h-4 w-4" />
          </span>
        )}
        {children}
      </>
    )}
  </Listbox.Option>
));
MultiselectOption.displayName = Listbox.Option.displayName;

export {
  Multiselect,
  MultiselectLabel,
  MultiselectTrigger,
  MultiselectOptions,
  MultiselectOption,
};
