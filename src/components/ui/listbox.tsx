import * as React from "react";
import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
  type UseFloatingReturn,
} from "@floating-ui/react-dom";
import { Listbox as ListboxPrimitive } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn, mergeRefs } from "~/lib/utils";

type FloatingContextValue = Pick<UseFloatingReturn, "refs" | "floatingStyles">;

const FloatingContext = React.createContext<FloatingContextValue>(
  {} as FloatingContextValue,
);

const useFloatingContext = () => {
  const floatingContext = React.useContext(FloatingContext);

  if (!floatingContext) {
    throw new Error(
      "useFloatingContext should be used within <FloatingProvider>",
    );
  }

  return floatingContext;
};

const FloatingProvider = ({
  value,
  children,
}: {
  value: FloatingContextValue;
  children: React.ReactNode;
}) => (
  <FloatingContext.Provider value={value}>{children}</FloatingContext.Provider>
);

const ListboxLabel = ListboxPrimitive.Label;

const Listbox = React.forwardRef<
  React.ElementRef<typeof ListboxPrimitive>,
  React.ComponentPropsWithoutRef<typeof ListboxPrimitive>
>(({ as = "div", className, ...props }, ref) => {
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      size({
        apply({ availableHeight, elements, rects }) {
          Object.assign(elements.floating.style ?? {}, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 16,
      }),
    ],
  });

  return (
    <FloatingProvider value={{ refs, floatingStyles }}>
      <ListboxPrimitive
        ref={ref}
        as={as}
        className={cn("w-full", className)}
        {...props}
      />
    </FloatingProvider>
  );
});
Listbox.displayName = ListboxPrimitive.displayName;

const ListboxButton = React.forwardRef<
  React.ElementRef<typeof ListboxPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ListboxPrimitive.Button>
>(({ className, children, ...props }, ref) => {
  const { refs: floatingRefs } = useFloatingContext();

  return (
    <ListboxPrimitive.Button
      ref={mergeRefs(ref, floatingRefs.setReference)}
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
  );
});
ListboxButton.displayName = ListboxPrimitive.Button.displayName;

const ListboxOptions = React.forwardRef<
  React.ElementRef<typeof ListboxPrimitive.Options>,
  React.ComponentPropsWithoutRef<typeof ListboxPrimitive.Options>
>(({ className, children, style, ...props }, ref) => {
  const { refs: floatingRefs, floatingStyles } = useFloatingContext();

  // This strategy gives the consumer the ability to override the computed
  // maxHeight set by the Floating UI libaray, which could cause the options
  // list to extend beyond the availabile screen space. Presumably, this would
  // be intentional, but it's something to be aware of.
  const mergedStyles = { ...floatingStyles, ...style };

  return (
    <ListboxPrimitive.Options
      ref={mergeRefs(ref, floatingRefs.setFloating)}
      className={cn(
        "z-50 max-h-96 max-w-xl overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md focus:outline-none",
        className,
      )}
      style={mergedStyles}
      {...props}
    >
      {children}
    </ListboxPrimitive.Options>
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
