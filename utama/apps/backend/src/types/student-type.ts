import { z } from "zod";

export enum GenderEnum {
  MALE = "Laki Laki",
  FEMALE = "Perempuan",
}

export const studentSchema = z.object({
  nis: z.number().check((ctx) => {
    if (ctx.value.toString().length !== 6) {
      ctx.issues.push({
        code: "custom",
        maximum: 6,
        origin: "number",
        inclusive: true,
        message: "NIP harus 6 angka",
        input: ctx.value,
      });
    }
  }),
  nama: z.string({ error: "Nama tidak valid!" }),
  umur: z.coerce.number<number>({ error: "Umur tidak valid!" }),
  kelas: z.string({ error: "Kelas tidak valid!" }),
  jenis_kelamin: z.enum(GenderEnum),
  no_telp: z.coerce
    .string<string>({ error: "No Telp tidak valid!" })
    .max(18, { error: "Maximal Nomor telepon 18 digit!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;
