"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_service_1 = __importDefault(require("../services/employee.service"));
const error_handler_1 = require("../dto/error.handler");
class EmployeeCrudMiddlewares {
    constructor() {
        this.findEmployee = async (req, res, next) => {
            const targetEmployee = await employee_service_1.default.findEmployeeByNationalCode(req.params.employeeNationalCode);
            if (!targetEmployee) {
                return next(new error_handler_1.AppError(404, "Target employee not found"));
            }
            res.locals.employee = targetEmployee;
            next();
        };
    }
}
exports.default = new EmployeeCrudMiddlewares();
