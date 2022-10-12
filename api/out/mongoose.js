"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = __importDefault(require("./constants"));
async function connectMongo() {
    const password = process.env.MONGO_PASSWORD;
    const user = process.env.MONGO_USER;
    if (!user || !password)
        throw new Error(constants_1.default.MONGO_USER_OR_PASSWORD_ERROR);
    await mongoose_1.default.connect(`mongodb+srv://${user}:${password}@cluster0.tlajp.mongodb.net/?retryWrites=true&w=majority`);
}
exports.default = connectMongo;
//# sourceMappingURL=mongoose.js.map