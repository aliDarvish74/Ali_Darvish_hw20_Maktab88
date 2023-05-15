"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_service_1 = __importDefault(require("../services/employee.service"));
const error_handler_1 = require("../dto/error.handler");
const employee_dto_1 = require("../dto/employee.dto");
const class_validator_1 = require("class-validator");
const types_1 = require("util/types");
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
        this.addEmployeeValidation = async (req, res, next) => {
            try {
                const employeeInfo = new employee_dto_1.AddEmployeeDTO(req.body);
                const validationErrors = await (0, class_validator_1.validate)(employeeInfo);
                console.log(validationErrors);
                if (!!validationErrors.length) {
                    return next(new error_handler_1.AppError(400, validationErrors.toString()));
                }
                const duplicateEmployee = await employee_service_1.default.findEmployeeByNationalCode(employeeInfo.nationalCode);
                if (!!duplicateEmployee) {
                    return next(new error_handler_1.AppError(409, "Another employee found with this national code."));
                }
                res.locals.employee = employeeInfo;
                next();
            }
            catch (error) {
                return next(new error_handler_1.AppError(500, "Internal server error."));
            }
        };
        this.UpdateEmployeeValidation = async (req, res, next) => {
            var _a, _b, _c, _d, _e, _f;
            try {
                const targetEmployee = new employee_dto_1.AddEmployeeDTO(res.locals.employee);
                const updatedInfo = new employee_dto_1.UpdateEmployeeDto(req.body);
                if (!!updatedInfo.nationalCode &&
                    updatedInfo.nationalCode !== targetEmployee.nationalCode) {
                    const duplicateEmployee = await employee_service_1.default.findEmployeeByNationalCode(updatedInfo.nationalCode);
                    if (!!duplicateEmployee) {
                        return next(new error_handler_1.AppError(409, "Cannot update. Entered national code belongs to another employee."));
                    }
                }
                targetEmployee.firstname =
                    (_a = updatedInfo.firstname) !== null && _a !== void 0 ? _a : targetEmployee.firstname;
                targetEmployee.lastname = (_b = updatedInfo.lastname) !== null && _b !== void 0 ? _b : targetEmployee.lastname;
                targetEmployee.birthDate = !!updatedInfo.birthDate
                    ? (0, types_1.isDate)(new Date(updatedInfo.birthDate))
                        ? new Date(updatedInfo.birthDate)
                        : targetEmployee.birthDate
                    : targetEmployee.birthDate;
                targetEmployee.companyName =
                    (_c = updatedInfo.companyName) !== null && _c !== void 0 ? _c : targetEmployee.companyName;
                targetEmployee.gender = (_d = updatedInfo.gender) !== null && _d !== void 0 ? _d : targetEmployee.gender;
                targetEmployee.nationalCode =
                    (_e = updatedInfo.nationalCode) !== null && _e !== void 0 ? _e : targetEmployee.nationalCode;
                targetEmployee.role = (_f = updatedInfo.role) !== null && _f !== void 0 ? _f : targetEmployee.role;
                const validationErrors = await (0, class_validator_1.validate)(targetEmployee);
                if (!!validationErrors.length) {
                    return next(new error_handler_1.AppError(400, validationErrors.toString()));
                }
                res.locals.employee = targetEmployee;
                next();
            }
            catch (error) {
                return next(new error_handler_1.AppError(500, "Internal server error."));
            }
        };
    }
}
exports.default = new EmployeeCrudMiddlewares();
