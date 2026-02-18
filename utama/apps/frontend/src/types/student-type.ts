import { z } from "zod";

export enum GenderEnum {
  MALE = "Laki Laki",
  FEMALE = "Perempuan",
}

export const studentSchema = z.object({
  nis: z.coerce.number<number>({ error: "NIS wajib menggunakan angka!" }),
  nama: z.string({ error: "Nama tidak valid!" }),
  umur: z.coerce.number<number>({ error: "Umur tidak valid!" }),
  kelas: z.string({ error: "Kelas tidak valid!" }),
  jenis_kelamin: z.enum(GenderEnum),
  no_telp: z.coerce
    .number<number>({ error: "No Telp tidak valid!" })
    .max(18, { error: "Maximal Nomor telepon 18 digit!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;
