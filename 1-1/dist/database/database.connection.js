"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(`mongodb://127.0.0.1:27017/hw20`);
        console.log("[+] Connected to MongoDB...");
    }
    catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
};
exports.connectToDatabase = connectToDatabase;
