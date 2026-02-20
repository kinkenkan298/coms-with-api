import { withForm } from "@/hooks/form";
import { GenderEnum, StudentSchema } from "@/types/student-type";

const defaultValues: StudentSchema = {
  nis: 0,
  nama: "",
  umur: 0,
  kelas: "",
  jenis_kelamin: GenderEnum.MALE,
  no_telp: "",
};

type FormType = "create" | "edit";

export const StudentForm = withForm({
  defaultValues,
  props: {
    mode: "edit",
  },
  render: ({ form, mode }) => (
    <div className="grid gap-2 grid-cols-2">
      <form.AppField
        name="nis"
        children={(field) => (
          <field.TextField
            label="NIS"
            placeholder="Masukan NIS ..."
            disabled={mode === "edit"}
          />
        )}
      />
      <form.AppField
        name="nama"
        children={(field) => (
          <field.TextField label="Nama" placeholder="Masukan Nama ..." />
        )}
      />
      <form.AppField
        name="umur"
        children={(field) => (
          <field.TextField label="Umur" placeholder="Masukan Umur ..." />
        )}
      />
      <form.AppField
        name="kelas"
        children={(field) => (
          <field.TextField label="Kelas" placeholder="Masukan Kelas ..." />
        )}
      />
      <form.AppField
        name="jenis_kelamin"
        children={(field) => (
          <field.SelectField
            label="Jenis Kelamin"
            data={[
              {
                label: "Laki Laki",
                value: GenderEnum.MALE,
              },
              {
                label: "Perempuan",
                value: GenderEnum.FEMALE,
              },
            ]}
          />
        )}
      />
      <form.AppField
        name="no_telp"
        children={(field) => (
          <field.TextField
            label="No Telp"
            placeholder="Masukan Nomor Telepon ..."
          />
        )}
      />
    </div>
  ),
});
