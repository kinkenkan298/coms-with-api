import { GenderEnum, Student, StudentTable } from "@/components/StudentsTable";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus2Icon } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const mockupSiswa: Student[] = [
    {
      nis: 10001,
      nama: "Ukasyah",
      kelas: "XII RPL 1",
      umur: 20,
      jenis_kelamin: GenderEnum.MALE,
      no_telp: "081235123"
    }
  ];
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
            <StudentTable students={mockupSiswa} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
