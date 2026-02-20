import { z } from "zod";

export enum GenderEnum {
  MALE = "Laki Laki",
  FEMALE = "Perempuan",
}

export const studentSchema = z.object({
  nis: z.coerce
    .number<number>({ error: "NIS wajib menggunakan angka!" })
    .min(100000, { error: "NIS wajib 6 digit!" })
    .max(999999, { error: "NIS wajib 6 digit!" }),
  nama: z.string({ error: "Nama tidak valid!" }),
  umur: z.coerce
    .number<number>({ error: "Umur tidak valid!" })
    .min(1, { error: "Umur minimal 1 tahun!" })
    .max(99, { error: "Umur maximal 100 tahun" }),
  kelas: z.string({ error: "Kelas tidak valid!" }),
  jenis_kelamin: z.enum(GenderEnum, { error: "Masukan jenis kelamin!" }),
  no_telp: z
    .string({ error: "No Telp tidak valid!" })
    .regex(/^08\d+$/, {
      error: "No Telp wajib diawali dengan 08 dan hanya angka!",
    })
    .min(10, { error: "Minimal 10 angka!" })
    .max(18, { error: "Maximal 18 angka" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;
