import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BaseProps = {
  id: string;
  label: string;
  help?: string;
};

export function Field({ id, label, help, ...props }: BaseProps & ComponentProps<"input">) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </label>
      <Input id={id} className="h-12 rounded-lg border-border bg-background/70 px-4" {...props} />
      {help ? <p className="mt-1.5 text-xs text-muted-foreground">{help}</p> : null}
    </div>
  );
}

export function TextField({
  id,
  label,
  help,
  ...props
}: BaseProps & ComponentProps<"textarea">) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </label>
      <Textarea id={id} className="min-h-32 rounded-lg border-border bg-background/70 px-4 py-3" {...props} />
      {help ? <p className="mt-1.5 text-xs text-muted-foreground">{help}</p> : null}
    </div>
  );
}