"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const user_route_1 = __importDefault(require("../user/user.route"));
const plant_recommendation_routes_1 = __importDefault(require("../plant-recommendations/routes/plant-recommendation.routes"));
function routes(app) {
    (0, user_route_1.default)(app);
    (0, plant_recommendation_routes_1.default)(app);
}
