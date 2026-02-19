import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useBeingDeleted } from "@/store/delete-dialog-store";
import { toast } from "sonner";
import { useDeleteStudent } from "@/api/delete-student";

export const DeleteDialog = () => {
  const beingDeleted = useBeingDeleted((state) => state.beingDeleted);
  const setBeingDeleted = useBeingDeleted((state) => state.setBeingDeleted);

  const { mutateAsync: deleteMutateAsync } = useDeleteStudent({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Guru berhasil dihapus");
      },
    },
  });

  const handleDeleteTeacher = async () => {
    if (!beingDeleted?.nis) return;
    try {
      await deleteMutateAsync(beingDeleted.nis);
    } catch {
      toast.error("Terjadi kesalahan saat menghapus guru");
    } finally {
      setBeingDeleted(null);
    }
  };

  return (
    <>
      <AlertDialog
        open={!!beingDeleted}
        onOpenChange={() => setBeingDeleted(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="text-destructive bg-destructive/10">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda ingin menghapus siswa "
              <strong>{beingDeleted?.name}</strong>" ini ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Batal</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDeleteTeacher}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
