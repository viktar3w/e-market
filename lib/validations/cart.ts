import * as z from "zod";
export const CartRequestSchema = z.object({
  amount: z.number().min(1, { message: "Amount is require field" }),
  variantId: z
    .string()
    .min(25, { message: "VariantId is require field" })
    .max(50),
  componentIds: z.array(z.string().max(50)).optional(),
  qty: z.number().min(1, { message: "Qty is require field" }),
});
export type CartRequest = z.infer<typeof CartRequestSchema>;
