



export function linearRegression(x: number[], y: number[]): { slope: number; intercept: number } {
    const n: number = x.length;
    const sumX: number = x.reduce((a: number, b: number) => a + b, 0);
    const sumY: number = y.reduce((a: number, b: number) => a + b, 0);
    const sumXY: number = x.map((xi: number, i: number) => xi * y[i]).reduce((a: number, b: number) => a + b, 0);
    const sumX2: number = x.map((xi: number) => xi * xi).reduce((a: number, b: number) => a + b, 0);

    const slope: number = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept: number = (sumY - slope * sumX) / n;

    return { slope, intercept };
}


export function safeLinearRegression(x: number[], y: number[]): { slope: number; intercept: number } {
    if (x.length !== y.length) throw new Error('Data length mismatch');
    if (x.length < 2) throw new Error('Insufficient data points for regression');

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, xi, i) => a + xi * y[i], 0);
    const sumX2 = x.reduce((a, xi) => a + xi * xi, 0);

    const denominator = n * sumX2 - sumX * sumX;
    if (denominator === 0) throw new Error('Undefined regression slope');

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
}