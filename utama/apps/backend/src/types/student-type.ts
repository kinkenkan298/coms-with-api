import { z } from "zod";

export enum GenderEnum {
  MALE = "Laki Laki",
  FEMALE = "Perempuan",
}

export const studentSchema = z.object({
  nis: z.coerce
    .number({ error: "NIS tidak valid!" })
    .min(100000, { error: "NIS hanya dapat 6 digit!" })
    .max(999999, { error: "NIS hanya dapat 6 digit!" }),
  nama: z.string({ error: "Nama tidak valid!" }),
  umur: z.coerce.number<number>({ error: "Umur tidak valid!" }),
  kelas: z.string({ error: "Kelas tidak valid!" }),
  jenis_kelamin: z.enum(GenderEnum),
  no_telp: z.coerce
    .string<string>({ error: "No Telp tidak valid!" })
    .max(18, { error: "Maximal Nomor telepon 18 digit!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;
