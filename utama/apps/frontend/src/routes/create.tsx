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
import { studentSchema, StudentSchema } from "@/types/student-type";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftCircleIcon, UserPlus2Icon } from "lucide-react";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {} as StudentSchema,
    validators: {
      onChange: studentSchema,
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
          <FieldGroup>
            <FieldSet>
              <StudentForm form={form} />
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="blue">
            <UserPlus2Icon />
            Tambah Siswa
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
