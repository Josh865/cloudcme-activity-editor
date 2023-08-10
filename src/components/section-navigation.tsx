import { NavLink, NavLinkProps } from "react-router-dom";

import { cn } from "~/lib/utils";

export function SectionNavigation({ children }: { children: React.ReactNode }) {
  return (
    <nav className="relative z-10 -mr-px border-b border-t bg-muted py-2">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center gap-4">
          {children}
        </div>
      </div>
    </nav>
  );
}

export function SectionNavigationLink(props: NavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "group inline-flex items-center whitespace-nowrap px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground",
          isActive &&
            "rounded bg-background font-medium text-foreground shadow-md hover:no-underline",
        )
      }
      {...props}
    />
  );
}
