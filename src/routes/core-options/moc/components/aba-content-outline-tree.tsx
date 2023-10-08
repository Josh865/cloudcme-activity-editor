import { ChevronDownCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import { NodeRendererProps, Tree } from "react-arborist";
import { toTitleCase } from "string-ts";

import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";

import { useAbaContentOutline } from "../api/get-aba-content-outline";

export function AbaContentOutlineTree() {
  const { data, isLoading, isError } = useAbaContentOutline();

  if (isLoading || isError) return null;

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>ABA Content Areas</DialogHeader>
        <DialogDescription>
          Select up to two content areas to associated with this activity.
        </DialogDescription>
        <Tree
          initialData={data}
          // searchTerm={searchTearm}
          openByDefault={false}
          disableDrag={true}
          width="auto"
          height={400}
          rowHeight={28}
          onActivate={(node) => {
            console.log(node);
          }}
        >
          {Node}
        </Tree>
      </DialogContent>
    </Dialog>
  );
}

function Node({ node, style, dragHandle }: NodeRendererProps<any>) {
  const Icon = node.isOpen ? ChevronDownCircleIcon : ChevronRightCircleIcon;

  return (
    <div
      style={style}
      ref={dragHandle}
      onClick={() => node.toggle()}
      className="flex h-full cursor-pointer items-center rounded-md hover:bg-muted"
    >
      {node.isLeaf ? (
        <span>{node.data.name}</span>
      ) : (
        <>
          <Icon
            className={cn(
              "mr-1.5 h-4 w-4 flex-shrink-0 text-muted-foreground",
              node.isOpen && "text-foreground",
            )}
            aria-hidden="true"
          />
          <span className={cn("truncate", node.isOpen && "font-medium")}>
            {toTitleCase(node.data.name)}
          </span>
        </>
      )}
    </div>
  );
}
