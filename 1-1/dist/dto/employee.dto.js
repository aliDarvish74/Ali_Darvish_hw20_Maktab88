"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeDto = exports.AddEmployeeDTO = void 0;
const class_validator_1 = require("class-validator");
var employeeGender;
(function (employeeGender) {
    employeeGender["male"] = "male";
    employeeGender["female"] = "female";
    employeeGender["not_Set"] = "not_set";
})(employeeGender || (employeeGender = {}));
var employeeRole;
(function (employeeRole) {
    employeeRole["employee"] = "employee";
    employeeRole["manager"] = "manager";
})(employeeRole || (employeeRole = {}));
class AddEmployeeDTO {
    constructor(employeeInfo) {
        var _a, _b, _c, _d, _e, _f;
        this.firstname = (_a = employeeInfo.firstname) === null || _a === void 0 ? void 0 : _a.trim();
        this.lastname = (_b = employeeInfo.lastname) === null || _b === void 0 ? void 0 : _b.trim();
        this.birthDate = new Date(employeeInfo.birthDate) || null;
        this.nationalCode = (_c = employeeInfo.nationalCode) === null || _c === void 0 ? void 0 : _c.trim();
        this.companyName = (_d = employeeInfo.companyName) === null || _d === void 0 ? void 0 : _d.trim();
        this.gender = (_e = employeeInfo.gender) !== null && _e !== void 0 ? _e : "not_set";
        this.role = (_f = employeeInfo.role) !== null && _f !== void 0 ? _f : "employee";
    }
}
__decorate([
    (0, class_validator_1.Length)(3, 30, { message: "Firstname length must be between 3 and 30" }),
    (0, class_validator_1.IsString)({ message: `Firstname must be a string` }),
    (0, class_validator_1.IsNotEmpty)({ message: "Firstname cannot be empty" }),
    __metadata("design:type", String)
], AddEmployeeDTO.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 30, { message: "Lastname length must be between 3 and 30" }),
    (0, class_validator_1.IsString)({ message: `Lastname must be a string` }),
    (0, class_validator_1.IsNotEmpty)({ message: "Lastname cannot be empty" }),
    __metadata("design:type", String)
], AddEmployeeDTO.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Birth date cannot be empty" }),
    __metadata("design:type", Date)
], AddEmployeeDTO.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.Length)(10, 10, { message: "National Code length must be 10" }),
    (0, class_validator_1.IsNotEmpty)({ message: "National Code cannot be empty" }),
    __metadata("design:type", String)
], AddEmployeeDTO.prototype, "nationalCode", void 0);
__decorate([
    (0, class_validator_1.Length)(2, 40, { message: "Company Name length must be between 2 and 40" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Company Name cannot be empty" }),
    __metadata("design:type", String)
], AddEmployeeDTO.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(employeeGender, { message: "Gender must be male, female or not set" }),
    (0, class_validator_1.IsString)({ message: `Gender must be a string` }),
    __metadata("design:type", String)
], AddEmployeeDTO.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(employeeRole, { message: "Role must be employee or manager" }),
    (0, class_validator_1.IsString)({ message: `Role must be a string` }),
    __metadata("design:type", String)
], AddEmployeeDTO.prototype, "role", void 0);
exports.AddEmployeeDTO = AddEmployeeDTO;
class UpdateEmployeeDto {
    constructor(employeeInfo) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.firstname = (_a = employeeInfo.firstname) === null || _a === void 0 ? void 0 : _a.trim();
        this.lastname = (_b = employeeInfo.lastname) === null || _b === void 0 ? void 0 : _b.trim();
        this.birthDate = (_c = employeeInfo.birthDate) === null || _c === void 0 ? void 0 : _c.trim();
        this.nationalCode = (_d = employeeInfo.nationalCode) === null || _d === void 0 ? void 0 : _d.trim();
        this.companyName = (_e = employeeInfo.companyName) === null || _e === void 0 ? void 0 : _e.trim();
        this.gender = (_f = employeeInfo.gender) === null || _f === void 0 ? void 0 : _f.trim();
        this.role = (_g = employeeInfo.role) === null || _g === void 0 ? void 0 : _g.trim();
    }
}
exports.UpdateEmployeeDto = UpdateEmployeeDto;
