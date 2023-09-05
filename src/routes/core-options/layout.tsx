import { Outlet } from "react-router-dom";

import {
  SectionNavigation,
  SectionNavigationLink,
} from "~/components/section-navigation";

export default function CoreOptionsLayout() {
  return (
    <div>
      <SectionNavigation>
        <SectionNavigationLink to="basic-information">
          Basic Information
        </SectionNavigationLink>
        <SectionNavigationLink to="types-and-formats">
          Types & Formats
        </SectionNavigationLink>
        <SectionNavigationLink to="credits-sessions-moc">
          Credits, Sessions, & MOC
        </SectionNavigationLink>
        <SectionNavigationLink to="objectives">
          Objectives
        </SectionNavigationLink>
        <SectionNavigationLink to="marketing">Marketing</SectionNavigationLink>
        <SectionNavigationLink to="evaluations">
          Evaluations
        </SectionNavigationLink>
        <SectionNavigationLink to="portal-overview">
          Portal Overview
        </SectionNavigationLink>
      </SectionNavigation>

      <div className="container relative py-10">
        <Outlet />
      </div>
    </div>
  );
}
