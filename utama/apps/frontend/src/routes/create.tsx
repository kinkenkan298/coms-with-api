import { useCreateStudent } from "@/api/create-student";
import { StudentForm } from "@/components/StudentForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/hooks/form";
import { studentSchema, StudentSchema } from "@/types/student-type";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftCircleIcon, UserPlus2Icon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutateAsync: createStudentMutate } = useCreateStudent({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Berhasil membuat siswa!");
        navigate({ to: "/" });
      },
    },
  });
  const form = useAppForm({
    defaultValues: {} as StudentSchema,
    validators: {
      onChange: studentSchema,
    },
    onSubmit: async ({ value }) => {
      await createStudentMutate(value);
    },
  });
  return (
    <div className="min-h-screen max-w-full flex items-center justify-center">
      <Card className="w-200">
        <CardHeader>
          <CardTitle>Tambah Siswa Baru</CardTitle>
          <CardAction>
            <Button variant="outline" className="mr-2" size="sm" asChild>
              <Link to="/">
                <ArrowLeftCircleIcon />
                Kembali
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            id="student-form"
            onClick={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <FieldSet>
                <StudentForm form={form} />
              </FieldSet>
            </FieldGroup>
            <div className="flex justify-end mt-5">
              <form.AppForm>
                <form.SubmitButton
                  label="Tambah siswa"
                  Icon={UserPlus2Icon}
                  variant="blue"
                />
              </form.AppForm>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
