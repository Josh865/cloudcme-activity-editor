import * as React from "react";
import { Listbox as ListboxPrimitive } from "@headlessui/react";
import * as Popover from "@radix-ui/react-popover";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "~/lib/utils";

const ListboxLabel = ListboxPrimitive.Label;

// Not ideal, but this type isn't exported from the Headless UI library, so it's
// reproduced here from the definition in the source.
type ListboxRenderProps = {
  open: boolean;
  disabled: boolean;
  value: unknown;
};

const Listbox = React.forwardRef<
  React.ElementRef<typeof ListboxPrimitive>,
  React.ComponentPropsWithoutRef<typeof ListboxPrimitive>
>(({ as = "div", className, children, ...props }, ref) => {
  const resolvedChildren = (listboxRenderProps: ListboxRenderProps) =>
    typeof children === "function" ? children(listboxRenderProps) : children;

  return (
    <ListboxPrimitive
      ref={ref}
      as={as}
      className={cn("w-full", className)}
      {...props}
    >
      {(listboxRenderProps) => (
        <Popover.Root open={listboxRenderProps.open}>
          {resolvedChildren(listboxRenderProps)}
        </Popover.Root>
      )}
    </ListboxPrimitive>
  );
});
Listbox.displayName = ListboxPrimitive.displayName;

const ListboxButton = React.forwardRef<
  React.ElementRef<typeof ListboxPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ListboxPrimitive.Button>
>(({ className, children, ...props }, ref) => {
  return (
    <Popover.Trigger asChild>
      <ListboxPrimitive.Button
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-left text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <>
          {children}
          <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
        </>
      </ListboxPrimitive.Button>
    </Popover.Trigger>
  );
});
ListboxButton.displayName = ListboxPrimitive.Button.displayName;

const ListboxOptions = React.forwardRef<
  React.ElementRef<typeof ListboxPrimitive.Options>,
  React.ComponentPropsWithoutRef<typeof ListboxPrimitive.Options>
>(({ className, children, ...props }, ref) => {
  return (
    <Popover.Portal>
      <Popover.Content
        sideOffset={4}
        className="z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      >
        <ListboxPrimitive.Options
          ref={ref}
          className={cn(
            "h-full max-h-[--radix-popper-available-height] w-full min-w-[var(--radix-popper-anchor-width)] max-w-xl overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className,
          )}
          {...props}
        >
          {children}
        </ListboxPrimitive.Options>
      </Popover.Content>
    </Popover.Portal>
  );
});
ListboxOptions.displayName = ListboxPrimitive.Options.displayName;

const ListboxOption = React.forwardRef<
  React.ElementRef<typeof ListboxPrimitive.Option>,
  React.ComponentPropsWithoutRef<typeof ListboxPrimitive.Option>
>(({ className, children, ...props }, ref) => (
  <ListboxPrimitive.Option
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
  </ListboxPrimitive.Option>
));
ListboxOption.displayName = ListboxPrimitive.Option.displayName;

export { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption };
