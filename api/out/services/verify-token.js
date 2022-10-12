"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
async function verifyToken(token) {
    const decodedToken = await firebase_1.auth.verifyIdToken(token);
    return decodedToken;
}
exports.default = verifyToken;
//# sourceMappingURL=verify-token.js.map