"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantRecommendationModel = void 0;
const gemini_1 = require("./models/gemini/gemini");
const plantRecommendationModel = new gemini_1.GoogleGeminiClient();
exports.plantRecommendationModel = plantRecommendationModel;
