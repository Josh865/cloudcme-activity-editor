import { ChevronDownCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import { NodeRendererProps, Tree } from "react-arborist";
import { useFieldArray } from "react-hook-form";
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

export function AbaContentOutlineTree({ fieldIndex }: { fieldIndex: number }) {
  const { data, isLoading, isError } = useAbaContentOutline();

  const { fields, append, remove } = useFieldArray({
    name: `boards.${fieldIndex}.abaContentOutline` as "boards.0.abaContentOutline",
    keyName: "key",
  });

  const selectedItems = fields.map((field) => field.name);

  if (isLoading || isError) return null;

  function handleActivate(node) {
    if (!node.isLeaf) return;

    const existingIndex = fields.findIndex(
      (field) => field.id === node.data.id,
    );
    if (existingIndex > -1) {
      remove(existingIndex);
      return;
    }

    append({
      id: node.data.id,
      name: node.data.name,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex h-auto w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-left text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="truncate">
            {selectedItems.length > 0 ? selectedItems.join(", ") : "Select..."}
          </div>
        </button>
      </DialogTrigger>
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
          className="rounded-md border"
          padding={8}
          rowClassName="px-2"
          onActivate={handleActivate}
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
      className={cn(
        "flex h-full cursor-pointer items-center rounded-md hover:bg-muted",
        node.isSelectedEnd && "bg-muted",
      )}
    >
      {node.isLeaf ? (
        <span
          className={cn("truncate", node.isSelected && "font-medium")}
          title={node.data.name}
        >
          {node.data.name}
        </span>
      ) : (
        <>
          <Icon
            className={cn(
              "mr-1.5 h-4 w-4 flex-shrink-0 text-muted-foreground",
              node.isSelectedEnd && "text-foreground",
            )}
            aria-hidden="true"
          />
          <span className={cn("truncate", node.isSelectedEnd && "font-medium")}>
            {toTitleCase(node.data.name)}
          </span>
        </>
      )}
    </div>
  );
}
