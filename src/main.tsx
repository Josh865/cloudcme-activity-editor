import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { ObjectivesForm } from "~/components/forms/objectives-form/objectives-form";
import { CreateCreditsAndSession } from "~/routes/core-options/credits-and-sessions/components/create-credits-and-session";

import BasicInformation from "./routes/core-options/basic-information/route";
import UpdateCreditsAndSession from "./routes/core-options/credits-and-sessions/components/update-credits-and-session";
import CreditsAndSessionsLayout from "./routes/core-options/credits-and-sessions/route";
import CoreOptionsLayout from "./routes/core-options/layout";
import FacultyAndRolesLayout from "./routes/faculty-and-roles/layout";
import Layout from "./routes/layout";

import "./index.css";

export const routes = [
  {
    path: "/:activityId?",
    element: <Layout />,
    loader: ({ params }: { params: { activityId?: string } }) => {
      // activityId is present on request, but is not a valid numeric value
      if (params.activityId && !params.activityId.match(/^\d+$/)) {
        throw new Response("", { status: 400 });
      }
      return null;
    },
    children: [
      {
        index: true,
        loader: () => redirect("core-options/basic-information"),
      },
      {
        path: "core-options",
        element: <CoreOptionsLayout />,
        handle: { label: "Core Options" },
        children: [
          // Redirecting on the index route ensures the first child is active
          // when navigating directly to the parent route
          {
            index: true,
            loader: () => redirect("basic-information"),
          },
          {
            path: "basic-information",
            element: <BasicInformation />,
            handle: {
              label: "Basic Information",
              keywords: ["date", "time", "location", "room"],
            },
          },
          {
            path: "types-and-formats",
            element: <div>Types and Formats</div>,
            handle: { label: "Types and Formats" },
          },
          {
            path: "credits-sessions-moc",
            element: <CreditsAndSessionsLayout />,
            handle: {
              label: "Credits, Sessions, & MOC",
              keywords: ["room", "seating capacity"],
            },
            children: [
              {
                path: "create",
                element: <CreateCreditsAndSession />,
              },
              {
                path: ":sessionId",
                element: <UpdateCreditsAndSession />,
              },
            ],
          },
          {
            path: "objectives",
            element: <ObjectivesForm />,
            handle: { label: "Objectives" },
          },
          {
            path: "marketing",
            element: <div>Marketing</div>,
            handle: { label: "Marketiing" },
          },
          {
            path: "evaluations",
            element: <div>Evaluations</div>,
            handle: { label: "Evaluations" },
          },
          {
            path: "portal-overview",
            element: <div>Portal Overview</div>,
            handle: { label: "Portal Overview" },
          },
        ],
      },
      {
        path: "faculty-and-roles",
        element: <FacultyAndRolesLayout />,
        handle: { label: "Faculty and Roles" },
        children: [
          {
            path: "types",
            element: <div>Types</div>,
            handle: { label: "Types" },
          },
          {
            path: "amounts",
            element: <div>Amounts</div>,
            handle: { label: "Amounts" },
          },
        ],
      },
      {
        path: "recurrence",
        element: <FacultyAndRolesLayout />,
        handle: { label: "Recurrence" },
        children: [
          {
            path: "types",
            element: <div>Types</div>,
          },
          {
            path: "amounts",
            element: <div>Amounts</div>,
          },
        ],
      },
      {
        path: "search-tags",
        element: <FacultyAndRolesLayout />,
        handle: { label: "Search Tags" },
        children: [
          {
            path: "types",
            element: <div>Types</div>,
          },
          {
            path: "amounts",
            element: <div>Amounts</div>,
          },
        ],
      },
      {
        path: "documentation",
        element: <FacultyAndRolesLayout />,
        handle: { label: "Documentation" },
        children: [
          {
            path: "types",
            element: <div>Types</div>,
          },
          {
            path: "amounts",
            element: <div>Amounts</div>,
          },
        ],
      },
      {
        path: "reports",
        element: <FacultyAndRolesLayout />,
        handle: { label: "Reports" },
        children: [
          {
            path: "types",
            element: <div>Types</div>,
          },
          {
            path: "amounts",
            element: <div>Amounts</div>,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
