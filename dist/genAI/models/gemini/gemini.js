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
exports.GoogleGeminiClient = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const google_genai_1 = require("@langchain/google-genai");
class GoogleGeminiClient {
    constructor() {
        this.llm = new google_genai_1.ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash",
            temperature: 0.5,
            maxRetries: 2,
            maxOutputTokens: 2048,
            apiKey: process.env.GOOGLE_GEN_AI_KEY
        });
    }
    generateRecommendations(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recommendations = yield this.llm.invoke(prompt);
                return recommendations.content;
            }
            catch (e) {
                console.log("Google Gemini Error ");
                console.error(e);
                throw e;
            }
        });
    }
}
exports.GoogleGeminiClient = GoogleGeminiClient;
