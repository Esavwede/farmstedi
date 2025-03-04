"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeNasaResponseToFile = writeNasaResponseToFile;
const util_1 = require("util");
const fs_1 = require("fs");
const writeFileAsync = (0, util_1.promisify)(fs_1.writeFile);
function writeNasaResponseToFile(data_1) {
    return __awaiter(this, arguments, void 0, function* (data, filename = 'nasa_data.json') {
        try {
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid NASA API response data');
            }
            const jsonString = JSON.stringify(data, null, 2);
            yield writeFileAsync(filename, jsonString, 'utf8');
            console.log(`Successfully wrote NASA data to ${filename}`);
        }
        catch (error) {
            console.error('Error writing NASA response to file:', error);
            throw error; // Re-throw for error handling upstream
        }
    });
}
