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

export const SupportEventsRequestSchema = z
  .object({
    category: CATEGORY_NAME_VALIDATOR,
    fields: z.record(z.string().or(z.number()).or(z.boolean())).optional(),
    description: z.string().max(500),
  })
  .strict();

export type SupportCategoryDeleteByNameRequest = z.infer<
  typeof SupportCategoryDeleteByNameSchema
>;

export type SupportCreateEventCategoryRequest = z.infer<
  typeof SupportCreateEventCategorySchema
>;

export type SupportEventsRequestRequest = z.infer<
  typeof SupportEventsRequestSchema
>;
