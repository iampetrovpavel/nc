"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const env_path = path_1.default.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
const env = require('dotenv').config({ path: env_path });
console.log("Loaded env variables: ", env.parsed);
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("./mongoose"));
require("./firebase");
async function bootstrap() {
    try {
        await (0, mongoose_1.default)();
        console.log("Connected to Mongo Atlas");
        const PORT = process.env.PORT || 8000;
        await new Promise((done) => { app_1.default.listen(PORT, () => done()); });
        console.log(`Server listening on port ${PORT}...`);
    }
    catch (error) {
        console.error("Server starting error: ", error.message);
    }
}
exports.default = bootstrap;
//# sourceMappingURL=bootstrap.js.map