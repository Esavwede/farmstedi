"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstname: zod_1.z.string({
            required_error: "firstname required",
            invalid_type_error: "firstname must be of type string",
        })
            .min(2, "letters in firstname cannot be less than 2")
            .max(70, "letters in firstname cannot be more that 70"),
        lastname: zod_1.z.string({
            required_error: "lastname required",
            invalid_type_error: "lastname must be of type string",
        })
            .min(2, "letters in lastname cannot be less than 2")
            .max(70, "letters in lastname cannot be more that 70"),
        email: zod_1.z.string({
            required_error: "email required",
            invalid_type_error: "email must be of type string",
        })
            .email("invalide email")
            .min(5, "letters in firstname cannot be less than 2")
            .max(50, "letters in firstname cannot be more that 50"),
        password: zod_1.z.string({
            required_error: "password required",
            invalid_type_error: "password must be of type string",
        })
            .min(5, "password characters cannot be less than 2")
            .max(70, "password characters cannot be more that 70"),
        confirmPassword: zod_1.z.string({
            required_error: "confirm password required",
            invalid_type_error: "confirm password must be of type string",
        })
            .min(5, "confirmPassword characters cannot be less than 5")
            .max(70, "confirmPassword characters cannot be greater than 70")
    })
        .refine(data => data.password === data.confirmPassword, { message: "passwords don't match", path: ["confirmPassword"] })
});
exports.SigninSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email required",
            invalid_type_error: "email must be of type string"
        })
            .email("must be a valid email"),
        password: zod_1.z.string({
            required_error: "password required",
            invalid_type_error: "password must be of type string"
        })
            .min(2)
    })
});
