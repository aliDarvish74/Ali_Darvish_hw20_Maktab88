"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const Employee_model_1 = require("../database/models/Employee.model");
class EmployeeService {
    constructor() {
        this.findEmployeeByNationalCode = async (nationalCode) => {
            return Employee_model_1.Employee.findOne({ nationalCode });
        };
        this.saveNewEmployee = (employeeInfo) => {
            const newEmployee = new Employee_model_1.Employee(employeeInfo);
            return newEmployee.save();
        };
        this.deleteEmployeeByNationalCode = async (nationalCode) => {
            return Employee_model_1.Employee.deleteOne({ nationalCode });
        };
    }
    async findAllEmployees(queries) {
        const { sort: sortKey = "" } = queries, fields = __rest(queries, ["sort"]);
        return Employee_model_1.Employee.find(fields !== null && fields !== void 0 ? fields : {}).sort(sortKey);
    }
}
exports.EmployeeService = EmployeeService;
exports.default = new EmployeeService();
