"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateRequestSchema;
const zod_1 = require("zod");
const extractSchemaErrors_1 = __importDefault(require("../../../utils/errors/zod/extractSchemaErrors"));
function validateRequestSchema(schema) {
    return (req, res, next) => {
        try {
            const { body, params, query } = req;
            // Validate Request Schema 
            schema.parse({
                body,
                params,
                query
            });
            // No Schema Error, Call next middleware 
            next();
            return;
        }
        catch (e) {
            if (e instanceof zod_1.ZodError) {
                console.log("Schema Error ");
                const errors = (0, extractSchemaErrors_1.default)(e);
                res.status(400).json({ success: false, errors });
                return;
            }
            res.status(500).json({ success: false, msg: "server error" });
            return;
        }
    };
}
