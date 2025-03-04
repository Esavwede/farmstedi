"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractZodErrors;
function extractZodErrors(e) {
    // Extract Errors From Error Object 
    var errs = [];
    e.errors.forEach((e) => { errs.push(e.message); });
    return errs;
}
