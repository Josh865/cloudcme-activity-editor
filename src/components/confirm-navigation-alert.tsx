import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  useBeforeUnload,
  unstable_useBlocker as useBlocker,
  type unstable_BlockerFunction as BlockerFunction,
} from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { buttonVariants } from "~/components/ui/button";

export function ConfirmNavigationAlert() {
  const form = useFormContext();

  // Determine whether the form is dirty based on the value of the dirtyFields
  // object provided by the form. We cannot rely on the isDirty value provided
  // by the form because it is permanently set to true after the user changes
  // a value, even if that change is later reverted to match the original state
  // of the form.
  const { dirtyFields } = form.formState;
  const isDirty = Object.keys(dirtyFields).length > 0;

  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
    [isDirty],
  );

  // useBlocker allows us to capture React Router navigation events
  const blocker = useBlocker(shouldBlock);

  // useBeforeUnload allows us to capture native navigation events. We have no
  // control over what gets displayed to the user in this case and it may not
  // catch back/forward navigations.
  useBeforeUnload(
    useCallback(
      (event) => {
        if (isDirty) {
          event.preventDefault();
          event.returnValue = ""; // Yes, this is required
        }
      },
      [isDirty],
    ),
  );

  // Reset the blocker if the form is retored to a clean state.
  useEffect(() => {
    if (blocker.state === "blocked" && !isDirty) {
      blocker.reset();
    }
  }, [blocker, isDirty]);

  return (
    <AlertDialog
      open={blocker.state === "blocked"}
      onOpenChange={(open) => !open && blocker.reset?.()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>
          <AlertDialogDescription>
            If you continue, you&apos;ll lose the information you&apos;ve
            entered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Stay on Page
          </AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive", size: "sm" })}
            onClick={blocker.proceed}
          >
            Continue without Saving
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
