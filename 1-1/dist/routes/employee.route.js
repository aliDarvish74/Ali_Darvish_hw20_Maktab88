"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const employee_validation_1 = __importDefault(require("../middlewares/employee.validation"));
const router = express_1.default.Router();
router.get("/", employee_controller_1.default.getAllEmployees);
router.get("/:employeeNationalCode", employee_validation_1.default.findEmployee, employee_controller_1.default.getEmployee);
router.post("/", employee_validation_1.default.addEmployeeValidation, employee_controller_1.default.addEmployee);
router.patch("/:employeeNationalCode", employee_validation_1.default.findEmployee, employee_validation_1.default.UpdateEmployeeValidation, employee_controller_1.default.updateEmployee);
router.delete("/:employeeNationalCode", employee_validation_1.default.findEmployee, employee_controller_1.default.deleteEmployee);
exports.default = router;
