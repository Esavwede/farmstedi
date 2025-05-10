import { z } from "zod";

export const farmDataSchema = z.object({
  body: z.object({
    longitude: z
      .number({
        required_error: "Longitude is required",
        invalid_type_error: "Longitude must be a number",
      })
      .min(-180)
      .max(180),
    latitude: z
      .number({
        required_error: "Latitude is required",
        invalid_type_error: "Latitude must be a number",
      })
      .min(-90)
      .max(90),
    area: z
      .number({
        required_error: "Area is required",
        invalid_type_error: "Area must be a number",
      })
      .min(0)
      .optional(),
    plants: z.array(z.string()).default(["plantain"]),
    soilType: z.enum([
      "sandy",
      "clay",
      "loamy",
      "silty",
      "peaty",
      "saline",
      "chalky",
    ]),
    plantingDate: z.string().optional(),
  }),
});
export type FarmDataInput = z.infer<typeof farmDataSchema>;
