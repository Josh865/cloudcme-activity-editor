import { Outlet } from "react-router-dom";

import {
  SectionNavigation,
  SectionNavigationLink,
} from "~/components/section-navigation";

export default function FacultyAndRoles() {
  return (
    <div>
      <SectionNavigation>
        <SectionNavigationLink to="types">Types</SectionNavigationLink>
        <SectionNavigationLink to="amounts">Amounts</SectionNavigationLink>
      </SectionNavigation>

      <div className="container py-10">
        <Outlet />
      </div>
    </div>
  );
}
