"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const auth_1 = require("firebase-admin/auth");
const serviceAccount = require('../serviceAccountKey.json');
const app = firebase_admin_1.default.initializeApp({ credential: firebase_admin_1.default.credential.cert(serviceAccount) });
let auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
console.log("Firebase initialization done");
//# sourceMappingURL=firebase.js.map