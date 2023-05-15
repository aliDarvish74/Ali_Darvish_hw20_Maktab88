"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, `firstname is required.`],
        minlength: [3, "Minimum firstname length is 3"],
        maxlength: [30, `Maximum firstname length is 30`],
    },
    lastname: {
        type: String,
        equired: [true, `lastname is required.`],
        minlength: [3, "Minimum lastname length is 3"],
        maxlength: [30, `Maximum lastname length is 30`],
    },
    gender: {
        type: String,
        enum: ["male", "female", "not_set"],
        default: "not_set",
    },
    birthDate: {
        type: Date,
        required: [true, "Birth date is required"],
    },
    nationalCode: {
        type: String,
        required: [true, `National code is required`],
        unique: true,
        minlength: [10, "National code length must be 10"],
        maxlength: [10, "National code length must be 10"],
    },
    companyName: {
        type: String,
        required: true,
        minlength: [2, "Minimum national code length must be 2"],
        maxlength: [40, "Maximum national code length must be 40"],
    },
    role: {
        type: String,
        enum: ["employee", "manager"],
        default: "employee",
    },
}, {
    timestamps: true,
});
exports.Employee = (0, mongoose_1.model)("Employee", employeeSchema);
