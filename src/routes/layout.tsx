import { Outlet } from "react-router-dom";

import { Toaster } from "~/components/ui/toaster";
import { Header } from "~/components/header";
import { PrimaryNavigation } from "~/components/primary-navigation";
import { Sidebar } from "~/components/sidebar";

export default function Layout() {
  return (
    <div className="flex h-full min-h-screen w-full">
      <div className="min-h-full flex-1">
        <div className="grid h-full min-h-screen grid-rows-[auto,auto,1fr]">
          <Header
            title="Pediatric Grand Rounds"
            facility="Memorial Hospital"
            location="Asheville, NC"
            startDate="08/01/2023"
            endDate="12/31/2024"
          />
          <PrimaryNavigation />
          <Outlet />
        </div>
      </div>
      <Sidebar />
      <Toaster />
    </div>
  );
}
