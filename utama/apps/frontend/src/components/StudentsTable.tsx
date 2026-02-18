
import { MarsIcon, Trash2Icon, UserPenIcon, VenusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

export enum GenderEnum {
  MALE = "Laki Laki",
  FEMALE = "Perempuan"
}

export interface Student {
  nis: number;
  nama: string;
  umur: number;
  kelas: string;
  jenis_kelamin: GenderEnum;
  no_telp: string;
}

export const StudentTable = ({ students }: { students: Student[] }) => {
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
          <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{student.nis}</TableCell>
            <TableCell>{student.nama}</TableCell>
            <TableCell>
              {student.umur}
            </TableCell>
            <TableCell>
              {student.kelas}
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className={student.jenis_kelamin === GenderEnum.MALE ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'}>
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
            <TableCell>
              {student.no_telp}
            </TableCell>
            <TableCell>
              <div className="flex gap-3">
                <Button variant="outline">
                  <UserPenIcon />
                  Edit
                </Button>
                <Button variant="destructive">
                  <Trash2Icon />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
