import * as z from "zod";

export const uploadPdfSchema = z.object({
  file: z.any()
    .refine((files) => files?.length === 1, "File is required.")
    .refine((files) => files?.[0]?.size <= 10 * 1024 * 1024, "Max file size is 10MB.") // 10MB Limit
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "Only .pdf format is supported."
    ),
});

export const authLoginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});
