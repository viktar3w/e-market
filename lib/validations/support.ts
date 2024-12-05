import * as z from "zod";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validations/category";

export const SupportCategoryDeleteByNameSchema = z.object({
  name: CATEGORY_NAME_VALIDATOR,
});

export const SupportCreateEventCategorySchema = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: z
    .string()
    .min(1, "color is required")
    .max(10)
    .regex(/^#[0-9a-z]{6}$/gi, "Invalid color format"),
  emoji: z.string().emoji("Invalid emoji").optional(),
});

export type SupportCategoryDeleteByNameRequest = z.infer<
  typeof SupportCategoryDeleteByNameSchema
>;

export type SupportCreateEventCategoryRequest = z.infer<
  typeof SupportCreateEventCategorySchema
>;
