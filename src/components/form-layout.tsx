import * as React from "react";
import * as Portal from "@radix-ui/react-portal";

import { cn } from "~/lib/utils";

export function FormLayout({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("group", className)} {...props} />;
}

export function FormBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // The group- selector applies additional padding to the body of the
        // body if a footer is present. It does this by determining whether the
        // FormLayout parent contains an element with the ID 'formFooter'. If
        // so, the bottom padding is increased. The amount of padding is the sum
        // of the default padding (10) + the height of the footer content (16).
        // "container py-10 group-[&:has(body#formLayoutFooter)]:pb-[calc(theme(spacing.10)+theme(spacing.16))] ",
        "container py-10",
        className,
      )}
      {...props}
    />
  );
}

export function FormSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid grid-cols-12 gap-6 md:gap-8", className)}
      {...props}
    />
  );
}

export function FormSectionSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("col-span-12 md:col-span-4", className)} {...props} />
  );
}

export function FormSectionHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h3 className={cn("peer text-lg font-medium", className)} {...props} />
  );
}

export function FormSectionDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <p
      className={cn("mt-1 text-sm leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}

export function FormSectionContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "col-span-12 md:col-span-8 first:md:col-span-12",
        className,
      )}
      {...props}
    />
  );
}

export function FormFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Portal.Root container={document.getElementById("formLayoutFooter")}>
      <div className={cn("container py-6", className)} {...props} />
    </Portal.Root>
  );
}

// --- Example Usage

function FormLayoutExample() {
  return (
    <FormLayout>
      {/* <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}> */}
      <FormBody className="space-y-8">
        <FormSection>
          <FormSectionSidebar>
            <FormSectionHeading>Account Info</FormSectionHeading>
            <FormSectionDescription>
              Enter the information for your account.
            </FormSectionDescription>
          </FormSectionSidebar>
          <FormSectionContent className="max-w-md space-y-8">
            {/* Form fields go here */}
          </FormSectionContent>
        </FormSection>

        <hr />

        <FormSection>
          <FormSectionSidebar>
            <FormSectionHeading>Account Info</FormSectionHeading>
            <FormSectionDescription>
              Enter the information for your account.
            </FormSectionDescription>
          </FormSectionSidebar>
          <FormSectionContent className="max-w-md space-y-8">
            {/* Form fields go here */}
          </FormSectionContent>
        </FormSection>
      </FormBody>

      <FormFooter>
        <button type="submit">Submit</button>
      </FormFooter>
      {/* </form>
      </FormProvider> */}
    </FormLayout>
  );
}
