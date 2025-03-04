"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppErrorHandler;
function AppErrorHandler(err, req, res) {
    const e = err;
    const errorCode = e.statusCode;
    switch (errorCode) {
        case 400:
            console.log('loggerrrr');
            res.status(400).json({ success: false, msg: e.message });
            break;
        case 401:
            res.status(401).json({ success: false, msg: e.message });
            break;
        case 403:
            res.status(403).json({ success: false, msg: e.message });
            break;
        case 404:
            res.status(404).json({ success: false, msg: e.message });
            break;
        case 409:
            res.status(409).json({ success: false, msg: e.message });
            break;
        case 500:
            res.status(500).json({ success: false, msg: e.message });
            break;
        default:
            console.log("Untracked Error Type");
            res.status(500).json({ success: false, msg: "server error" });
    }
}
