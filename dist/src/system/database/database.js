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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
function startDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const DB_URI = process.env.DB_URI || "";
            // Get Database connection Object 
            const connection = mongoose_1.default.connection;
            // Attach Event Listeners To Database Connection 
            connection.on("connecting", () => {
                console.log("Database connecting");
            });
            connection.on("connected", () => {
                console.log("Database connected");
            });
            connection.on("disconnecting", () => {
                console.log("Database disconnecting");
            });
            connection.on("disconnected", () => {
                console.log("Database disconnected");
            });
            connection.on("error", (e) => {
                console.log("Database Error");
                console.log(e);
            });
            // Connect to database 
            yield mongoose_1.default.connect(DB_URI);
        }
        catch (e) {
            console.log("Database Error");
            console.log(e);
        }
    });
}
exports.default = startDatabase;
