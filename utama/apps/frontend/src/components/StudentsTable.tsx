import { MarsIcon, Trash2Icon, UserPenIcon, VenusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { GenderEnum, StudentSchema } from "@/types/student-type";
import { Link } from "@tanstack/react-router";
import { useBeingDeleted } from "@/store/delete-dialog-store";

export const StudentTable = ({ students }: { students: StudentSchema[] }) => {
  const setBeingDeleted = useBeingDeleted((state) => state.setBeingDeleted);
  return (
    <Table>
      <TableCaption>list all data siswa</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>NIS</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Umur</TableHead>
          <TableHead>Kelas</TableHead>
          <TableHead>Jenis Kelamin</TableHead>
          <TableHead>No Telp</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student, index) => (
          <TableRow key={student.nis}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{student.nis}</TableCell>
            <TableCell>{student.nama}</TableCell>
            <TableCell>{student.umur}</TableCell>
            <TableCell>{student.kelas}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={
                  student.jenis_kelamin === GenderEnum.MALE
                    ? "bg-blue-50 text-blue-500"
                    : "bg-pink-50 text-pink-500"
                }
              >
                {student.jenis_kelamin === GenderEnum.MALE ? (
                  <>
                    <MarsIcon />
                    Laki - Laki
                  </>
                ) : (
                  <>
                    <VenusIcon />
                    Perempuan
                  </>
                )}
              </Badge>
            </TableCell>
            <TableCell>{student.no_telp}</TableCell>
            <TableCell>
              <div className="flex gap-3">
                <Button variant="warning" asChild>
                  <Link to="/edit/$nis" params={{ nis: String(student.nis) }}>
                    <UserPenIcon />
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    setBeingDeleted({
                      nis: student.nis,
                      name: student.nama,
                    })
                  }
                >
                  <Trash2Icon />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
