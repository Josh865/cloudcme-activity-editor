import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ActivityIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ClipboardListIcon,
  Settings2Icon,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Switch } from "~/components/ui/switch";

function QuickActions({ showIcon = true }) {
  return (
    <div>
      <h3 className="flex items-center text-sm font-medium text-muted-foreground">
        {showIcon && (
          <div>
            <Settings2Icon className="mr-2 h-4 w-4" />
          </div>
        )}
        <span className="whitespace-nowrap">Quick Actions</span>
      </h3>
      <ul className="mt-4 space-y-2">
        <li className="flex items-center gap-x-2">
          <Switch id="active" />
          <Label htmlFor="active" className="font-normal">
            Active
          </Label>
        </li>
        <li className="flex items-center gap-x-2">
          <Switch id="approved" />
          <Label htmlFor="approved" className="font-normal">
            Approved
          </Label>
        </li>
        <li className="flex items-center gap-x-2">
          <Switch id="published" />
          <Label htmlFor="published" className="font-normal">
            Published
          </Label>
        </li>
      </ul>
    </div>
  );
}

function Status({ showIcon = true }) {
  return (
    <div>
      <h3 className="flex items-center text-sm font-medium text-muted-foreground">
        {showIcon && (
          <div>
            <ActivityIcon className="mr-2 h-4 w-4" />
          </div>
        )}
        Status
      </h3>
      <ul className="mt-4 w-full space-y-3">
        <li className="flex items-center justify-between text-sm">
          <span className="truncate">Agenda</span>
          <Badge variant="positive" className="shrink-0">
            Complete
          </Badge>
        </li>
        <li className="flex items-center justify-between text-sm">
          <span className="truncate">Commendation Criteria</span>
          <Badge variant="destructive" className="shrink-0">
            Missing
          </Badge>
        </li>
        <li className="flex items-center justify-between text-sm">
          <span className="truncate">Competencies</span>
          <Badge className="shrink-0">Incomplete</Badge>
        </li>
      </ul>
    </div>
  );
}

function Overview({ showIcon = true }) {
  return (
    <div>
      <h3 className="flex items-center text-sm font-medium text-muted-foreground">
        {showIcon && (
          <div>
            <ClipboardListIcon className="mr-2 h-4 w-4" />
          </div>
        )}
        Overview
      </h3>
      <ul className="mt-4 space-y-3">
        <li className="flex items-center justify-between whitespace-nowrap text-sm">
          <span className="truncate">Registrants</span>
          <span>15 ($995.00)</span>
        </li>
        <li className="flex items-center justify-between text-sm">
          <span className="truncate">Evaluations</span>
          <span>8</span>
        </li>
        <li className="flex items-center justify-between text-sm">
          <span className="truncate">Faculty</span>
          <span>4</span>
        </li>
      </ul>
    </div>
  );
}

function CollapsedSidebar() {
  return (
    <div className={cn("flex flex-col gap-y-6")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-11 hover:bg-background"
          >
            <Settings2Icon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <QuickActions />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="relative w-11 hover:bg-background"
          >
            <ActivityIcon className="h-4 w-4" />
            <div className="absolute right-0 top-0 -mr-1 -mt-1">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <Status />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-11 hover:bg-background"
          >
            <ClipboardListIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <Overview />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ExpandedSidebar() {
  return (
    <div
      className={cn(
        "flex w-[calc(325px-calc(theme(spacing.4)*2))] flex-col gap-y-8",
      )}
    >
      <QuickActions />
      <Status />
      <Overview />
    </div>
  );
}

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      layout
      layoutRoot
      className={cn(
        "relative hidden min-h-full w-auto overflow-hidden border-l bg-muted py-6 md:block",
      )}
      animate={{ width: isExpanded ? "325px" : "75px" }}
      initial={false}
    >
      <div className="px-4">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <span className="sr-only">Collapse</span>
                <ChevronsRightIcon className="h-4 w-4" />
              </>
            ) : (
              <>
                <span className="sr-only">Expand</span>
                <ChevronsLeftIcon className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <div className="mt-4">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <ExpandedSidebar />
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <CollapsedSidebar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
