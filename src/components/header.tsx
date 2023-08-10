import { useEffect, useState } from "react";
import {
  BuildingIcon,
  CalendarIcon,
  MapPinIcon,
  SearchIcon,
} from "lucide-react";
import { RouteObject, useNavigate } from "react-router-dom";

import { cn } from "~/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { routes } from "~/main";

type HeaderProps = {
  title: string;
  facility?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
};

export function Header({
  title,
  facility,
  location,
  startDate,
  endDate,
}: HeaderProps) {
  function dateRange() {
    if (startDate && endDate) {
      return `${startDate}–${endDate}`;
    }

    return startDate || endDate || null;
  }

  return (
    <div className="container flex flex-col justify-between gap-y-1.5 pt-6 md:flex-row md:items-center">
      <div>
        <h3 className="text-2xl font-medium">{title}</h3>
        <div className="mt-2 flex flex-col gap-y-1.5 md:flex-row md:flex-wrap md:gap-x-6">
          {facility ? (
            <div className="flex items-center text-sm">
              <BuildingIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              {facility}
            </div>
          ) : null}
          {location ? (
            <div className="flex items-center text-sm">
              <MapPinIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              {location}
            </div>
          ) : null}
          {dateRange() ? (
            <div className="flex items-center text-sm">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              {dateRange()}
            </div>
          ) : null}
        </div>
      </div>

      <OptionSearch className="mt-2 md:mt-0" />
    </div>
  );
}

// ---

function hasLabel(route: RouteObject) {
  return Boolean(route?.handle?.label);
}

function OptionSearch({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const items: RouteObject[] = routes[0].children.filter((r) => !r.index);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className={className}>
      <button
        type="button"
        className={cn(
          "flex h-10 w-full items-center gap-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground/50 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-72",
        )}
        onClick={() => setOpen(!open)}
      >
        <SearchIcon className="h-3.5 w-3.5" />
        <span>Search for an option...</span>
        <kbd className="ml-auto hidden items-center gap-x-0.5 text-muted-foreground/50 md:flex">
          <abbr title="Command" className="no-underline">
            ⌘
          </abbr>
          <span className="text-xs">K</span>
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for an option..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {items.map((route) =>
            hasLabel(route) ? (
              <CommandGroup key={route.path} heading={route?.handle?.label}>
                {route.children?.map((child) =>
                  hasLabel(child) ? (
                    <CommandItem
                      key={child.path}
                      onSelect={() => {
                        setOpen(false);
                        navigate(`${route.path}/${child.path}`);
                      }}
                    >
                      {child?.handle?.label}
                    </CommandItem>
                  ) : null,
                )}
              </CommandGroup>
            ) : null,
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
