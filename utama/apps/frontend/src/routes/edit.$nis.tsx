import { useEditStudent } from "@/api/edit-student";
import {
  getStudentByNisQueryKey,
  getStudentByNisQueryOptions,
} from "@/api/get-student-by-nip";
import { StudentForm } from "@/components/StudentForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/hooks/form";
import { studentSchema } from "@/types/student-type";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftCircleIcon, UserPenIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/edit/$nis")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      getStudentByNisQueryOptions(Number(params.nis)),
    );
  },
});

function RouteComponent() {
  const { nis } = Route.useParams();
  const { data: student } = useSuspenseQuery(
    getStudentByNisQueryOptions(Number(nis)),
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: editStudentMutate } = useEditStudent({
    mutationConfig: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getStudentByNisQueryKey(Number(nis)),
        });
        toast.success("Berhasil mengubah siswa!");
        navigate({ to: "/" });
      },
    },
  });
  const form = useAppForm({
    defaultValues: student.data,
    validators: {
      onChange: studentSchema,
    },
    onSubmit: async ({ value }) => {
      await editStudentMutate({ nis: Number(nis), student: value });
    },
  });
  return (
    <div className="min-h-screen max-w-full flex items-center justify-center">
      <Card className="w-200">
        <CardHeader>
          <CardTitle>Edit Siswa</CardTitle>
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
            id="student-form-edit"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <FieldSet>
                <StudentForm form={form} mode="edit" />
              </FieldSet>
            </FieldGroup>
            <div className="flex justify-end mt-5">
              <form.AppForm>
                <form.SubmitButton
                  label="Edit siswa"
                  Icon={UserPenIcon}
                  variant="warning"
                />
              </form.AppForm>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end"></CardFooter>
      </Card>
    </div>
  );
}
