"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_dto_1 = __importDefault(require("../dto/response.dto"));
const error_handler_1 = require("../dto/error.handler");
const employee_service_1 = __importDefault(require("../services/employee.service"));
class EmployeeController {
    constructor() {
        this.getAllEmployees = async (req, res, next) => {
            try {
                const employees = await employee_service_1.default.findAllEmployees(req.query);
                if (!employees.length) {
                    return next(new error_handler_1.AppError(404, "No user found."));
                }
                res
                    .status(200)
                    .json(new response_dto_1.default("success", "Users read successfull", employees));
            }
            catch (error) {
                next(new error_handler_1.AppError(500, "Internal Server Error"));
            }
        };
        this.getEmployee = async (req, res, next) => {
            return res.json(new response_dto_1.default("success", "Target Employee found", res.locals.employee));
        };
        this.addEmployee = async (req, res, next) => {
            try {
                const savedEmployee = await employee_service_1.default.saveNewEmployee(res.locals.employee);
                res.json(new response_dto_1.default("success", "Employee Saved Successfully", savedEmployee));
            }
            catch (error) {
                next(new error_handler_1.AppError(500, "Internal server error" + error));
            }
        };
        this.updateEmployee = async (req, res, next) => {
            try {
                await employee_service_1.default.deleteEmployeeByNationalCode(req.params.employeeNationalCode);
                const updatedEmployeee = await employee_service_1.default.saveNewEmployee(res.locals.employee);
                res
                    .status(200)
                    .json(new response_dto_1.default("success", "Employee updated successfully", updatedEmployeee));
            }
            catch (error) {
                next(new error_handler_1.AppError(500, "Internal server Error"));
            }
        };
        this.deleteEmployee = async (req, res, next) => {
            await employee_service_1.default.deleteEmployeeByNationalCode(req.params.employeeNationalCode);
            return res
                .status(204)
                .json(new response_dto_1.default("success", "Employee deleted successfully."));
        };
    }
}
exports.default = new EmployeeController();
