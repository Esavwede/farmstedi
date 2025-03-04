"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = plantRecommendationRoutes;
const express_1 = require("express");
const plant_recommendation_controller_1 = __importDefault(require("../controllers/plant-recommendation.controller"));
const plant_recommendation_schema_1 = require("../schemas/plant-recommendation.schema");
const validate_1 = __importDefault(require("../../middleware/validation/reqSchema/validate"));
const router = (0, express_1.Router)();
function plantRecommendationRoutes(app) {
    try {
        const plantRecommendationController = new plant_recommendation_controller_1.default();
        router.post("/recommend", (0, validate_1.default)(plant_recommendation_schema_1.farmDataSchema), plantRecommendationController.recommendCrops.bind(plantRecommendationController));
        app.use('/api/v1/plant', router);
    }
    catch (e) {
        console.log("Error Occured While Creating Plant Recommendation Routes");
        console.log(e);
    }
}
