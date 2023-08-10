import { ReactNode } from "react";
import {
  NavLink,
  NavLinkProps,
  RouteObject,
  useNavigate,
} from "react-router-dom";

import { cn } from "~/lib/utils";
import { routes } from "~/main";

function MobileNavigation() {
  const navigate = useNavigate();

  const primaryNavigationItems: RouteObject[] = routes[0].children.filter(
    (r) => !r.index,
  );

  return (
    <div className="mb-4 md:hidden">
      <label htmlFor="selected-tab" className="sr-only">
        Select a tab
      </label>
      <select
        id="selected-tab"
        name="selected-tab"
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(e) => navigate(e.currentTarget.value)}
      >
        {primaryNavigationItems.map((item) => (
          <option key={item.path} value={item.path}>
            {item.handle?.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function NavigationRow({ children }: { children: ReactNode }) {
  return <nav className="hidden flex-wrap gap-x-8 md:flex">{children}</nav>;
}

function NavigationItem(props: NavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "group inline-flex items-center whitespace-nowrap py-3 text-sm text-muted-foreground ring-offset-background transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isActive &&
            "border-b-2 border-foreground font-medium text-foreground",
        )
      }
      {...props}
    />
  );
}

export function PrimaryNavigation() {
  const primaryNavigationItems: RouteObject[] = routes[0].children.filter(
    (r) => !r.index,
  );

  return (
    <>
      <div className="container mt-6">
        {/* Select for mobile only */}
        <MobileNavigation />

        {/* Standard nav for larger screens */}
        <NavigationRow>
          {primaryNavigationItems.map((item) => (
            <NavigationItem key={item.path} to={item.path!}>
              {item.handle?.label}
            </NavigationItem>
          ))}
        </NavigationRow>
      </div>
    </>
  );
}
