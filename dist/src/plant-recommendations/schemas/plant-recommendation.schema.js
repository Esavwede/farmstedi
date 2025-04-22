"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.farmDataSchema = void 0;
const zod_1 = require("zod");
exports.farmDataSchema = zod_1.z.object({
    body: zod_1.z.object({
        longitude: zod_1.z
            .number({
            required_error: "longitude not provided",
            invalid_type_error: "longitude must be a float",
        })
            .describe("longitude"),
        latitude: zod_1.z.number({
            required_error: "latitude not provided",
            invalid_type_error: "latitude must be a float",
        }),
        plants: zod_1.z.array(zod_1.z.string(), {
            required_error: "plants must be an array of strings",
            invalid_type_error: "plants must be an array of strings",
        }),
        area: zod_1.z
            .number({
            invalid_type_error: "area must be a number",
        })
            .optional(),
        soilType: zod_1.z.string({
            required_error: "soilType Must be provided",
            invalid_type_error: "soilType must be of type String",
        }),
        numberOfMonths: zod_1.z
            .number({
            invalid_type_error: "numberOfMonths must be a number",
        })
            .optional(),
        averageTemperature: zod_1.z
            .number({
            invalid_type_error: "averageTemperature must be a number",
        })
            .optional(),
        totalPrecipitation: zod_1.z.number({}).optional(),
        plantingDate: zod_1.z.string(),
    }),
});
