"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
exports.authRouter = router;
router.post('/login', auth_1.auth, async (req, res) => {
    const phone = req.phone;
    const user = await user_1.default.findOne({ phone }).lean();
    if (user)
        return res.send(user);
    let newUser = new user_1.default({ phone });
    await newUser.save();
    return res.send(newUser.toObject());
});
router.get('/profile', auth_1.auth, async (req, res) => {
    const phone = req.phone;
    const user = await user_1.default.findOne({ phone }).lean();
    return res.send(user);
});
router.post('/update', auth_1.auth, async (req, res) => {
    const phone = req.phone;
    const user = await user_1.default.findOne({ phone });
    if (!user)
        return res.sendStatus(400);
    if (req.body.name)
        user.name = req.body.name;
    if (req.body.email)
        user.email = req.body.email;
    await user.save();
    return res.send(user.toObject());
});
//# sourceMappingURL=auth.js.map