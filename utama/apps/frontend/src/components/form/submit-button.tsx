import { useFormContext } from "@/hooks/form";
import { Button, buttonVariants } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { LucideIcon } from "lucide-react";
import { VariantProps } from "class-variance-authority";

export default function SubmitButton({
  label,
  Icon,
  variant = "default",
}: {
  label: string;
  Icon: LucideIcon;
  variant?: VariantProps<typeof buttonVariants>["variant"];
}) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <>
          <Button type="submit" variant={variant}>
            {isSubmitting ? <Spinner data-icon="inline-start" /> : <Icon />}
            {label}
          </Button>
        </>
      )}
    </form.Subscribe>
  );
}
