"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linearRegression = linearRegression;
exports.safeLinearRegression = safeLinearRegression;
function linearRegression(x, y) {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
    const sumX2 = x.map((xi) => xi * xi).reduce((a, b) => a + b, 0);
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
}
function safeLinearRegression(x, y) {
    if (x.length !== y.length)
        throw new Error('Data length mismatch');
    if (x.length < 2)
        throw new Error('Insufficient data points for regression');
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, xi, i) => a + xi * y[i], 0);
    const sumX2 = x.reduce((a, xi) => a + xi * xi, 0);
    const denominator = n * sumX2 - sumX * sumX;
    if (denominator === 0)
        throw new Error('Undefined regression slope');
    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
}
