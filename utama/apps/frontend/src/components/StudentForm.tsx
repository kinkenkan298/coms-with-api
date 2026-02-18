import { withForm } from "@/hooks/form";
import { GenderEnum, StudentSchema } from "@/types/student-type";

export const StudentForm = withForm({
  defaultValues: {} as StudentSchema,
  render: ({ form }) => (
    <div className="grid gap-2 grid-cols-2">
      <form.AppField
        name="nis"
        children={(field) => (
          <field.TextField
            label="NIS"
            placeholder="Masukan NIS ..."
            maxLength={6}
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
          <field.TextField
            label="Umur"
            placeholder="Masukan Umur ..."
            maxLength={2}
          />
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
            maxLength={18}
          />
        )}
      />
    </div>
  ),
});
