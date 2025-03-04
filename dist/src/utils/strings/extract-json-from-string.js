"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJsonFromString = extractJsonFromString;
function extractJsonFromString(text) {
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    return match ? match[1] : "";
}
