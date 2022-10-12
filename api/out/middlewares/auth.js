"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const verify_token_1 = __importDefault(require("../services/verify-token"));
async function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token)
        return res.sendStatus(403);
    const decodedToken = await (0, verify_token_1.default)(token);
    const phone = decodedToken.phone_number;
    if (!phone)
        res.sendStatus(403);
    req.phone = phone;
    next();
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map