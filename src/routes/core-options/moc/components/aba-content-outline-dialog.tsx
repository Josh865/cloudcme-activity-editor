import { useState } from "react";
import { ChevronDownCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import { NodeApi, NodeRendererProps, Tree } from "react-arborist";
import { useFieldArray } from "react-hook-form";
import { toTitleCase } from "string-ts";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";

import { useAbaContentOutline } from "../api/get-aba-content-outline";
import { AbaContentOutline, ActivityMocInformation } from "../types";

export function AbaContentOutlineDialog({
  fieldIndex,
}: {
  fieldIndex: number;
}) {
  const { data, isLoading, isError } = useAbaContentOutline();

  const {
    fields: selectedItems,
    append,
    remove,
  } = useFieldArray<
    ActivityMocInformation,
    "boards.0.abaContentOutline",
    "key"
  >({
    name: `boards.${fieldIndex}.abaContentOutline` as "boards.0.abaContentOutline",
    keyName: "key",
  });

  const [error, setError] = useState("");

  if (isLoading || isError) return null;

  function handleActivate(node: NodeApi<AbaContentOutline>) {
    if (!node.isLeaf) return;

    // Remove the field if it's already been selected
    const existingIndex = selectedItems.findIndex(
      (field) => field.id === node.data.id,
    );
    if (existingIndex > -1) {
      remove(existingIndex);
      setError("");
      return;
    }

    // Don't allow more than two selections
    if (selectedItems.length === 2) {
      setError("You may not select more than two content outlines.");
      return;
    }

    append({
      id: node.data.id,
      name: node.data.name,
    });
  }

  function handleDelete(itemId: string) {
    const existingIndex = selectedItems.findIndex(
      (field) => field.id === itemId,
    );
    remove(existingIndex);
    setError("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex h-auto w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-left text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="truncate">
            {`${selectedItems.length} Selected` ?? "Select"}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>ABA Content Areas</DialogHeader>
        <DialogDescription>
          Select up to two content areas to associated with this activity.
        </DialogDescription>
        <div>
          {selectedItems.length > 0 && (
            <>
              <p
                className={cn(
                  "text-sm font-medium",
                  error && "text-destructive",
                )}
              >
                Current Selections
              </p>
              <div className="mt-2 rounded-md bg-muted p-3">
                <ul className="-my-1">
                  {selectedItems.map((field) => (
                    <li
                      key={field.id}
                      className="flex items-center justify-between gap-x-2 border-b py-2 text-sm last:border-b-0"
                    >
                      <span>{field.name}</span>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        className="h-auto py-1 text-xs hover:bg-background"
                        onClick={() => handleDelete(field.id)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              {error && (
                <p className="mt-2 text-sm text-destructive">{error}</p>
              )}
            </>
          )}

          <Tree
            initialData={data}
            // searchTerm={searchTearm}
            openByDefault={false}
            disableDrag={true}
            width="auto"
            height={300}
            rowHeight={28}
            className="mt-4 rounded-md border"
            padding={8}
            rowClassName="px-2"
            onActivate={handleActivate}
          >
            {Node}
          </Tree>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Node({
  node,
  style,
  dragHandle,
}: NodeRendererProps<AbaContentOutline>) {
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
