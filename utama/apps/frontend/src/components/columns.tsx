import { GenderEnum, StudentSchema } from "@/types/student-type";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "./ui/badge";
import { MarsIcon, Trash2Icon, UserPenIcon, VenusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { useBeingDeleted } from "@/store/delete-dialog-store";

export const columns: ColumnDef<StudentSchema>[] = [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "nis",
    header: "NIS",
    accessorKey: "nis",
  },
  {
    id: "name",
    header: "Nama",
    accessorKey: "nama",
  },
  {
    id: "umur",
    header: "Umur",
    accessorKey: "umur",
  },
  {
    id: "kelas",
    header: "Kelas",
    accessorKey: "kelas",
  },
  {
    id: "jenis_kelamin",
    header: "Jenis Kelamin",
    accessorKey: "jenis_kelamin",
    cell: ({ row }) => {
      const jenis_kelamin = row.original.jenis_kelamin;
      return (
        <>
          <Badge
            variant="secondary"
            className={
              jenis_kelamin === GenderEnum.MALE
                ? "bg-blue-50 text-blue-500"
                : "bg-pink-50 text-pink-500"
            }
          >
            {jenis_kelamin === GenderEnum.MALE ? (
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
        </>
      );
    },
  },
  {
    id: "no_telepon",
    accessorKey: "no_telp",
    header: "Nomor Telepon",
  },
  {
    header: "Aksi",
    id: "aksi",

    cell: ({ row }) => {
      const student = row.original;
      const setBeingDeleted = useBeingDeleted((state) => state.setBeingDeleted);
      return (
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
      );
    },
  },
];
