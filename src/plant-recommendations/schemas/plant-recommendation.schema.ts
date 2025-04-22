import { number, z } from "zod";

export const farmDataSchema = z.object({
  body: z.object({
    longitude: z
      .number({
        required_error: "longitude not provided",
        invalid_type_error: "longitude must be a float",
      })
      .describe("longitude"),
    latitude: z.number({
      required_error: "latitude not provided",
      invalid_type_error: "latitude must be a float",
    }),
    plants: z.array(z.string(), {
      required_error: "plants must be an array of strings",
      invalid_type_error: "plants must be an array of strings",
    }),
    area: z
      .number({
        invalid_type_error: "area must be a number",
      })
      .optional(),
    soilType: z.string({
      required_error: "soilType Must be provided",
      invalid_type_error: "soilType must be of type String",
    }),
    numberOfMonths: z
      .number({
        invalid_type_error: "numberOfMonths must be a number",
      })
      .optional(),
    averageTemperature: z
      .number({
        invalid_type_error: "averageTemperature must be a number",
      })
      .optional(),
    totalPrecipitation: z.number({}).optional(),
    plantingDate: z.string(),
  }),
});

export type FarmDataInput = z.infer<typeof farmDataSchema>;
