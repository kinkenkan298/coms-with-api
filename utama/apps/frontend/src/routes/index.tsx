import { useGetStudent } from "@/api/get-student";
import { StudentTable } from "@/components/StudentsTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus2Icon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data: students, isLoading } = useGetStudent();
  if (isLoading) {
    return (
      <div className="min-h-screen max-w-full flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen max-w-full flex items-center justify-center">
        <Card className="w-300">
          <CardHeader>
            <CardTitle>CRUD Siswa | Server Utama</CardTitle>
            <CardAction>
              <Button asChild>
                <Link to="/create">
                  <UserPlus2Icon />
                  Create siswa
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {students && <StudentTable students={students.data} />}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
