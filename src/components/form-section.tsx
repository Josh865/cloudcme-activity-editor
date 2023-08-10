type FormSectionProps = {
  heading: string;
  description?: string;
  children: React.ReactNode;
};

export function FormSection({
  heading,
  description,
  children,
}: FormSectionProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="w-full md:w-1/4">
        <h3 className="text-lg font-medium">{heading}</h3>
        {description ? (
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
