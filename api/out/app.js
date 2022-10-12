"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = require("./routes/auth");
const app = (0, express_1.default)();
const API_ROUTE = process.env.API_ROUTE || '/';
const ORIGIN = process.env.ORIGIN || '';
app.use((0, cors_1.default)({ origin: [ORIGIN] }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(API_ROUTE, auth_1.authRouter);
exports.default = app;
//# sourceMappingURL=app.js.map